#!/usr/bin/env python3
"""Offline verified import of native KEEP B3+FD1 source; no data migration, push or deployment."""
import argparse
import hashlib
import json
import pathlib
import shutil
import stat
import subprocess
import sys
import zipfile

EXPECTED_SHA = '9e1db9ee06efa9d6e7bf92c1acd8e03317659071ef7b8046938f0b47e0986ca9'
EXPECTED_MEMBERS = 1348
BRANCH = 'feature/fd1-faith-discipline-shell'
REQUIRED = {
    'src/App.tsx', 'src/services/storage.ts',
    'src/pkm/workspace/NoteWorkspaceView.tsx',
    'src/pkm/encryption/vaultEncryptionService.ts',
    'src/pkm/encryption/encryptedVaultExport.ts',
    'src/pkm/tracking/trackingService.ts',
    'src/pkm/integration/ui/KeepFaithDisciplinePanel.tsx',
    'src/pkm/integration/keepFaithModel.ts',
    'bun.lock', 'index.html', 'package.json',
}
REPLACE = ('src', 'scripts', 'tests', 'index.html', 'package.json', 'README.md', 'bun.lock')

def git(root, *args):
    return subprocess.check_output(['git', '-C', str(root), *args], text=True).strip()

def inspect(archive):
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    if digest != EXPECTED_SHA:
        raise ValueError('Archive SHA-256 differs from reviewed native B3+FD1 source')
    with zipfile.ZipFile(archive) as z:
        members = z.infolist()
        names = [x.filename for x in members]
        if len(names) != EXPECTED_MEMBERS or len(set(names)) != len(names):
            raise ValueError('Incorrect or duplicate source archive members')
        if not REQUIRED.issubset(names):
            raise ValueError('Original storage, crypto, workspace or FD1 modules missing')
        for entry in members:
            name = pathlib.PurePosixPath(entry.filename)
            mode = (entry.external_attr >> 16) & 0o170000
            if (name.is_absolute() or '..' in name.parts or '\\' in entry.filename
                    or not entry.filename or entry.filename.startswith('.git/')
                    or entry.is_dir() or mode == stat.S_IFLNK or entry.file_size > 2_000_000):
                raise ValueError('Unsafe original source member: ' + entry.filename)
        if sum(x.file_size for x in members) > 30_000_000:
            raise ValueError('Archive unexpectedly large after decompression')
    return len(names), sum(x.file_size for x in members), digest

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source_zip', type=pathlib.Path)
    parser.add_argument('--apply', action='store_true',
                        help='Replace ONLY the provisional source shell; no git push')
    args = parser.parse_args()
    root = pathlib.Path(__file__).resolve().parents[1]
    if git(root, 'rev-parse', '--abbrev-ref', 'HEAD') != BRANCH:
        raise RuntimeError('Refusing import outside the existing KEEP FD1 PR branch')
    if git(root, 'status', '--porcelain', '--untracked-files=all'):
        raise RuntimeError('Working tree has uncommitted/untracked files; refusing overwrite')
    members, uncompressed, digest = inspect(args.source_zip.resolve())
    summary = {'sha256': digest, 'members': members, 'sourceBytes': uncompressed,
               'mode': 'apply' if args.apply else 'dry-run', 'target': str(root)}
    if not args.apply:
        print(json.dumps(summary, indent=2))
        return
    with zipfile.ZipFile(args.source_zip.resolve()) as z:
        for entry in REPLACE:
            target = root / entry
            if target.is_symlink():
                raise RuntimeError('Refusing to remove symlink: ' + str(target))
            if target.is_dir():
                shutil.rmtree(target)
            elif target.exists():
                target.unlink()
        for entry in z.infolist():
            target = root / entry.filename
            target.parent.mkdir(parents=True, exist_ok=True)
            with z.open(entry, 'r') as source, target.open('wb') as output:
                shutil.copyfileobj(source, output)
    report = root / 'docs' / 'FD1_B3_IMPORT_RECORD.json'
    report.parent.mkdir(exist_ok=True)
    report.write_text(json.dumps({**summary, 'dataMigration': False,
                                  'credentialChanges': False,
                                  'automaticDeployment': False}, indent=2)+'\n')
    print(json.dumps({**summary, 'verification': 'staged source only; full checks required'}, indent=2))
    print('Review git diff/status, run exact-source tests; do not deploy or migrate.')

if __name__ == '__main__':
    try:
        main()
    except (OSError, RuntimeError, ValueError, subprocess.CalledProcessError, zipfile.BadZipFile) as exc:
        print('KEEP B3 import refused:', exc, file=sys.stderr)
        sys.exit(1)
