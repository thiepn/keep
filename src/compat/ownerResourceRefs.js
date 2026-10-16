/** Ported from authentic KEEP B3 src/pkm/integration/ownerResourceRefs.ts.
 * A thiepn:// pointer is NEVER a permission, credential or database migration.
 * Preserve the original URI version, product/module identifiers, and kinds.
 */
export const OWNER_SOURCES=Object.freeze(['keep','folio','calendar','habits','vault','hub']);
export const RESOURCE_KINDS=Object.freeze({
 keep:['note','markdown-task','note-block','project','goal','area','saved-view'],
 folio:['task','project','event','habit','time-block','saved-view'],
 calendar:['event','ics-source'],
 habits:['habit','routine','check-in'],
 vault:['note','note-block','markdown-task','canvas'],
 hub:['pin','saved-view']
});
export const SOURCE_ADAPTERS=Object.freeze({
 keep:{product:'keep',module:'knowledge',label:'KEEP',sourceHome:null,localRecords:true},
 folio:{product:'folio',module:'home',label:'Folio',sourceHome:'https://thiepn.dev/folio/',localRecords:false},
 calendar:{product:'calendar',module:'calendar',label:'Calendar',sourceHome:null,localRecords:false},
 habits:{product:'habits',module:'habits',label:'Habits',sourceHome:null,localRecords:false},
 vault:{product:'vault',module:'knowledge',label:'Vault',sourceHome:null,localRecords:false},
 hub:{product:'hub',module:'home',label:'THIEPN Hub',sourceHome:'https://thiepn.dev/',localRecords:false}
});
export function makeOwnerRef(source,kind,id){
 if(!OWNER_SOURCES.includes(source)||!RESOURCE_KINDS[source].includes(kind))throw Error('Unsupported source resource kind');
 if(typeof id!=='string'||!id.trim()||id!==id.trim()||id.length>256||/[\x00-\x1f\x7f]/u.test(id))
   throw Error('Invalid owner resource identifier');
 const {product,module}=SOURCE_ADAPTERS[source];
 return {source,kind,id,uri:`thiepn://${product}/${module}/${kind}/${encodeURIComponent(id)}?v=1`};
}
export function parseOwnerRef(input){
 if(typeof input!=='string'||input.length>800)return null;
 const m=/^thiepn:\/\/([a-z-]+)\/([a-z-]+)\/([a-z-]+)\/([^/?#]+)\?v=1$/u.exec(input);
 if(!m)return null;
 const source=OWNER_SOURCES.find(key=>SOURCE_ADAPTERS[key].product===m[1]&&SOURCE_ADAPTERS[key].module===m[2]);
 if(!source||!RESOURCE_KINDS[source].includes(m[3]))return null;
 try {
   const id=decodeURIComponent(m[4]);
   const ref=makeOwnerRef(source,m[3],id);
   return ref.uri===input?ref:null;
 }catch{return null}
}
export function sourceLanding(ref){
 return OWNER_SOURCES.includes(ref?.source)?SOURCE_ADAPTERS[ref.source].sourceHome:null;
}
