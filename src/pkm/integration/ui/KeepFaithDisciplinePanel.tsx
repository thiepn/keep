import React, { useMemo, useState } from 'react';
import { BookOpen, Timer, Repeat2, CalendarDays, ExternalLink } from 'lucide-react';
import { trackingService } from '../../tracking/trackingService';
import { getTodayDateString, addDays } from '../../temporal/dateUtils';
import { readFaithSelection, saveFaithSelection, projectSelectedFaithPractices } from '../keepFaithModel';

interface Props { onOpenRoutines:()=>void;onOpenCalendar:()=>void;onOpenFocus:()=>void; }
/** KEEP's actual B3 Today workspace, backed by P50; not a Hub iframe or new store. */
export const KeepFaithDisciplinePanel:React.FC<Props>=({onOpenRoutines,onOpenCalendar,onOpenFocus})=>{
  const [revision,setRevision]=useState(0);
  const definitions=useMemo(()=>trackingService.getDefinitions(),[revision]);
  const [selected,setSelected]=useState(()=>readFaithSelection(trackingService.getDefinitions()));
  const [editing,setEditing]=useState(false);
  const [reviewThrough,setReviewThrough]=useState(getTodayDateString);
  const [reviewOpen,setReviewOpen]=useState(false);
  const [notice,setNotice]=useState('');
  const today=getTodayDateString();
  const practices=useMemo(()=>projectSelectedFaithPractices(definitions,trackingService.getEntries(),selected,today),[revision,definitions,selected,today]);
  const review=useMemo(()=>projectSelectedFaithPractices(definitions,trackingService.getEntries(),selected,reviewThrough),[revision,definitions,selected,reviewThrough]);
  const choose=(id:string,checked:boolean)=>{
    const next=checked?[...selected,id]:selected.filter(x=>x!==id);
    if(!saveFaithSelection(next,definitions)){setNotice('Storage unavailable: the selection was not saved.');return;}
    setSelected(readFaithSelection(definitions));setNotice('Selection saved locally. Existing P50 entries are unchanged.');
  };
  const mark=(id:string)=>{
    const owner=trackingService.getDefinitionById(id);
    if(owner?.status!=='active'||owner.trackingType!=='completion')return;
    try {trackingService.toggleCompletionHabit(id,today);setRevision(n=>n+1);setNotice('Updated the original KEEP habit entry.');}
    catch {setNotice('KEEP could not save that habit entry. No completion is claimed.');}
  };
  return <section aria-label="Faith and discipline" className="border border-stone-300 dark:border-stone-700 px-4 py-4 bg-white/70 dark:bg-stone-950/70 space-y-3">
    <header className="flex flex-wrap justify-between gap-2 items-start">
      <div><h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">Faith &amp; discipline</h3>
        <p className="text-xs text-stone-500 mt-1">Voluntary habits and one next action. Consistency is not spiritual worth.</p></div>
      <button className="text-xs underline px-2 py-2 focus-visible:outline-2" aria-expanded={editing} onClick={()=>setEditing(!editing)}>Select existing KEEP habits</button>
    </header>
    {editing&&<div className="border-t border-stone-200 dark:border-stone-800 pt-3 space-y-2" aria-label="Choose existing source habits">
      <p className="text-xs text-stone-500">Only original P50 habit identifiers are saved as an opt-in view preference. Your entries and recurrence rules stay where they are.</p>
      {definitions.filter(d=>d.type==='habit'&&d.status!=='archived').map(d=><label key={d.id} className="flex items-center gap-2 text-sm py-1"><input type="checkbox" checked={selected.includes(d.id)} onChange={e=>choose(d.id,e.target.checked)}/><span>{d.name}</span></label>)}
      <button className="text-xs underline" onClick={()=>setEditing(false)}>Done</button>
    </div>}
    {notice&&<p role="status" className="text-xs text-stone-600 dark:text-stone-300">{notice}</p>}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" aria-label="Original owner actions">
      <button onClick={onOpenRoutines} className="text-left border border-stone-300 dark:border-stone-700 p-3 flex flex-col items-start gap-1"><Repeat2 size={17} aria-hidden="true"/> KEEP routines <span className="text-xs opacity-70">Original P50 records</span></button>
      <button onClick={onOpenFocus} className="text-left border border-stone-300 dark:border-stone-700 p-3 flex flex-col items-start gap-1"><Timer size={17} aria-hidden="true"/> Intentional focus <span className="text-xs opacity-70">Existing KEEP Pomodoro</span></button>
      <button onClick={onOpenCalendar} className="text-left border border-stone-300 dark:border-stone-700 p-3 flex flex-col items-start gap-1"><CalendarDays size={17} aria-hidden="true"/> Time blocks <span className="text-xs opacity-70">KEEP calendar, no copied events</span></button>
    </div>
    {practices.length ? <div className="space-y-2" aria-label="Original P50 habits selected for faith review">
      {practices.map(p=><div key={p.id} className="border-t border-stone-200 dark:border-stone-800 pt-2 flex flex-wrap justify-between gap-2 items-center">
        <div><strong className="text-sm">{p.name}</strong><p className="text-xs text-stone-500">{p.paused?'Paused':p.completedToday?'Recorded today':p.due?'Planned today':'Not scheduled today'} · {p.recordedDays} recorded day(s) in last 7 · {p.completedDays} met chosen target</p></div>
        {p.trackingType==='completion'&&p.status==='active'&&!p.paused?<button type="button" onClick={()=>mark(p.id)} className="border border-stone-400 px-3 py-2 text-xs" aria-label={`${p.completedToday?'Reopen':'Record completion for'} ${p.name}`}>{p.completedToday?'Reopen':'Record practice'}</button>:<button type="button" onClick={onOpenRoutines} className="border border-stone-400 px-3 py-2 text-xs">Open original tracker</button>}
      </div>)}
    </div>:<p className="text-xs text-stone-500">No practices selected. Choose from your existing KEEP habits; nothing will be auto-created or scored.</p>}
    <section className="border-t border-stone-300 dark:border-stone-700 pt-3 space-y-3" aria-label="Original KEEP weekly practice review">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div><h4 className="text-sm font-semibold">Review the week</h4>
          <p className="text-xs text-stone-500">Original recorded P50 evidence, not a holiness score. Entries can be made later than their assigned date.</p></div>
        <button type="button" onClick={()=>setReviewOpen(v=>!v)} aria-expanded={reviewOpen}
          className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-xs">{reviewOpen?'Close review':'Explore 7-day records'}</button>
      </div>
      {reviewOpen&&<div className="space-y-3" data-fd1-native-weekly-review>
        <div className="flex items-center flex-wrap gap-3 text-xs">
          <button type="button" onClick={()=>setReviewThrough(end=>addDays(end,-7))}
            className="border border-stone-400 dark:border-stone-600 px-3 py-2">Previous week</button>
          <span role="status" aria-live="polite">{addDays(reviewThrough,-6)} – {reviewThrough}</span>
          <button type="button" disabled={addDays(reviewThrough,7)>today} onClick={()=>setReviewThrough(end=>addDays(end,7))}
            className="border border-stone-400 dark:border-stone-600 px-3 py-2 disabled:opacity-40">Next week</button>
          <button type="button" onClick={()=>setReviewThrough(today)} className="underline px-2 py-2">Current week</button>
        </div>
        {review.length===0&&<p className="text-xs">No practices selected. Original tracking history remains available in KEEP routines.</p>}
        {review.map(practice=><section key={practice.id} className="border border-stone-200 dark:border-stone-800 px-3 py-3 space-y-2"
          aria-label={`${practice.name} original dated observations`}>
          <div><strong className="text-sm">{practice.name}</strong>
            <p className="text-xs text-stone-500">{practice.recordedDays} recorded occurrence(s) · {practice.completedDays} source-target completions · {practice.scheduledDays} scheduled occurrence(s)</p></div>
          <ul className="grid grid-cols-2 sm:grid-cols-7 gap-1">
            {practice.weekValues.map(day=><li key={day.date} className="border border-stone-200 dark:border-stone-800 px-2 py-2 text-xs">
              <span className="block opacity-70">{day.date.slice(5)}</span>
              <span className="block font-semibold">{day.completed?'Completed':day.recorded?'Recorded':day.due?'Not recorded':'Not scheduled'}</span>
            </li>)}
          </ul>
        </section>)}
        <p className="text-xs text-stone-500">Reflect privately: What drew attention away? What helped the important work happen? What one change is practical next week? These questions do not save new notes or duplicate tracker history.</p>
      </div>}
    </section>
    <div className="border-t border-stone-200 dark:border-stone-800 pt-3 space-y-1 text-xs text-stone-600 dark:text-stone-300">
      <p><BookOpen size={14} className="inline mr-1" aria-hidden="true"/> Scripture and reflection remain in your original devotional app; TMS60 owns verse reviews. KEEP has no permission to infer their progress.</p>
      <a className="inline-flex items-center gap-1 underline py-2" target="_blank" rel="noopener noreferrer" href="https://tms60.thiepn.dev/">Continue TMS60 <ExternalLink size={13}/></a>
    </div>
  </section>;
};
