import fs from 'node:fs'
import path from 'node:path'
const out=path.resolve('dist')
fs.rmSync(out,{recursive:true,force:true})
fs.mkdirSync(path.join(out,'src','compat'),{recursive:true})
for(const file of ['index.html','src/discipline.js','src/app.js','src/styles.css','src/compat/keepB3Preview.js','src/compat/ownerResourceRefs.js']){
  fs.copyFileSync(file,path.join(out,file))
}
console.log('KEEP FD1 static build:',out)
