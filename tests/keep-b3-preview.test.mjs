import test from 'node:test';
import assert from 'node:assert/strict';
import {previewKeepB3} from '../src/compat/keepB3Preview.js';

test('unverified historical KEEP formats never create records',()=>{
  const unknown=previewKeepB3(JSON.stringify({schema:'keep-b3',version:3,notes:[{id:'original-1',body:'private'}]}));
  assert.equal(unknown.status,'unsupported');
  assert.equal(JSON.stringify(unknown).includes('private'),false);
  assert.equal(previewKeepB3(JSON.stringify({encrypted:true,ciphertext:'secret'})).status,'encrypted');
  assert.equal(previewKeepB3('not-a-manifest').status,'unsupported');
  assert.equal(previewKeepB3('a'.repeat(2_000_001)).status,'rejected');
});
