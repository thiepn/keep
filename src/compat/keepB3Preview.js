/** Read-only, explicitly user-triggered historical KEEP inspection.
 * Authentic B3 storage/encryption definitions are NOT present in this repo.
 * Refuse unknown formats: never reinterpret canonical IDs or migrate records.
 */
const LIMIT=2_000_000;
export function previewKeepB3(raw){
  if(typeof raw!=='string'||!raw.trim()||raw.length>LIMIT)
    return {status:'rejected',reason:'Empty or oversized file'};
  let value;
  try{value=JSON.parse(raw)}catch{return {status:'unsupported',reason:'This is not a recognized plain JSON manifest. ZIP and encrypted source require the original KEEP engine.'}}
  if(!value||typeof value!=='object'||Array.isArray(value))
    return {status:'unsupported',reason:'Unverified KEEP format.'};
  if(value.encrypted===true||value.ciphertext||value.iv||value.kdf)
    return {status:'encrypted',reason:'Only the original KEEP B3 engine may decrypt this archive.'};
  return {status:'unsupported',reason:'The original B3 source schema is required before any read or migration. No records were imported.'};
}
