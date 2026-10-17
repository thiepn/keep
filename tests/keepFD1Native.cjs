const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js');
const root=path.resolve(__dirname,'..');
require.extensions['.ts']=(module,file)=>{
 const src=fs.readFileSync(file,'utf8');
 const result=ts.transpileModule(src,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
 const errors=(result.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error);
 assert.equal(errors.length,0,file);
 module._compile(result.outputText,file);
};
const {projectSelectedFaithPractices,validateFaithSelection,readFaithSelection,saveFaithSelection}=require('../src/pkm/integration/keepFaithModel.ts');
let store={};const storage={getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=v}};
const t=Date.parse('2026-10-12T12:00:00Z'),today='2026-10-16';
const original=[
{id:'canonical-user-habit',name:'Prayer',type:'habit',trackingType:'completion',status:'active',createdAt:t,updatedAt:t,schedule:{type:'daily',interval:1,rawText:'daily'}},
{id:'private-metric',name:'Mood',type:'metric',trackingType:'rating',status:'active',createdAt:t,updatedAt:t},
{id:'paused-habit',name:'Rest',type:'habit',trackingType:'completion',status:'paused',createdAt:t,updatedAt:t,pausedIntervals:[{pausedFrom:'2026-10-15'}],schedule:{type:'daily',interval:1,rawText:'daily'}}
];
const entries=[
{id:'original-e1',definitionId:'canonical-user-habit',date:'2026-10-15',timestamp:t,value:true,createdAt:t,updatedAt:t},
{id:'original-e2',definitionId:'canonical-user-habit',date:today,timestamp:t+1,value:true,createdAt:t,updatedAt:t},
{id:'original-e3',definitionId:'paused-habit',date:today,timestamp:t+2,value:true,createdAt:t,updatedAt:t},
];
assert.deepEqual(validateFaithSelection(['private-metric','canonical-user-habit','canonical-user-habit','forged'],original),['canonical-user-habit']);
assert.equal(saveFaithSelection(['canonical-user-habit','private-metric'],original,storage),true);
assert.deepEqual(readFaithSelection(original,storage),['canonical-user-habit']);
let rows=projectSelectedFaithPractices(original,entries,['canonical-user-habit'],today);
assert.equal(rows.length,1);assert.equal(rows[0].id,'canonical-user-habit');
assert.equal(rows[0].completedToday,true);assert.equal(rows[0].recordedDays,2);
assert.equal(entries.length,3);assert.equal(original.length,3);
const past=projectSelectedFaithPractices(original,entries,['canonical-user-habit'],'2026-10-09');
assert.equal(past[0].recordedDays,0);
assert.equal(past[0].weekValues.length,7);
assert.deepEqual(entries.map(e=>e.id),['original-e1','original-e2','original-e3']);
let paused=projectSelectedFaithPractices(original,entries,['paused-habit'],today);
assert.equal(paused[0].paused,true);assert.equal(paused[0].completedToday,false);
const overview=fs.readFileSync(path.join(root,'src/components/home/KeepTodayOverview.tsx'),'utf8');
const app=fs.readFileSync(path.join(root,'src/App.tsx'),'utf8');
assert(overview.includes('<KeepFaithDisciplinePanel'));
const faithPanel=fs.readFileSync(path.join(root,'src/pkm/integration/ui/KeepFaithDisciplinePanel.tsx'),'utf8');
assert(faithPanel.includes('data-fd1-native-weekly-review'));
assert(faithPanel.includes('Previous week'));
assert(faithPanel.includes('practice.weekValues.map'));
assert(app.includes('onOpenFocus={() => setActiveModal(\'pomodoro_flow\')}'));
for(const f of ['src/pkm/integration/ui/KeepFaithDisciplinePanel.tsx','src/components/home/KeepTodayOverview.tsx']){
 const data=fs.readFileSync(path.join(root,f),'utf8');
 const output=ts.transpileModule(data,{fileName:f,compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX},reportDiagnostics:true});
 assert.equal((output.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0,f);
}
console.log('KEEP_FD1_NATIVE_PASS=15 (original P50 IDs, recurrence/pauses, seven-day history navigation, no extra records, Today/Pomodoro, TSX)');
