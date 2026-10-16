export const STORAGE_KEY='keep.fd1.preferences.v1';
export const FOCUS_CHOICES=Object.freeze([15,25,45]);
export const DEFAULT_PREFERENCES=Object.freeze({version:1,focusMinutes:25,entertainmentMinutes:45,morningBoundary:true});
export const DISTRACTION_REASONS=Object.freeze(['boredom','fatigue','avoidance','habit']);

export function parsePreferences(value) {
  if(!value || typeof value!=='object' || value.version!==1) return {...DEFAULT_PREFERENCES};
  return {
    version:1,
    focusMinutes:FOCUS_CHOICES.includes(value.focusMinutes)?value.focusMinutes:25,
    entertainmentMinutes:Number.isInteger(value.entertainmentMinutes)&&value.entertainmentMinutes>=0&&value.entertainmentMinutes<=180?value.entertainmentMinutes:45,
    morningBoundary:typeof value.morningBoundary==='boolean'?value.morningBoundary:true,
  };
}
export function loadPreferences(storage) {
  try {return parsePreferences(JSON.parse(storage.getItem(STORAGE_KEY)||'null'))}
  catch {return {...DEFAULT_PREFERENCES}}
}
export function savePreferences(storage,prefs) {
  const safe=parsePreferences(prefs);
  try {storage.setItem(STORAGE_KEY,JSON.stringify(safe));return true}
  catch {return false}
}
export function newFocusState(minutes) {
  const safe=FOCUS_CHOICES.includes(minutes)?minutes:25;
  return {targetSeconds:safe*60,remainingSeconds:safe*60,running:false,finished:false,lastTick:null,interruptions:{boredom:0,fatigue:0,avoidance:0,habit:0}};
}
export function tickFocus(state,now) {
  if(!state.running || state.lastTick===null) return state;
  const delta=Math.max(0,(now-state.lastTick)/1000);
  const remaining=Math.max(0,state.remainingSeconds-delta);
  return {...state,remainingSeconds:remaining,lastTick:remaining?now:null,running:remaining>0,finished:remaining===0};
}
export function pauseFocus(state,now) {
  const settled=tickFocus(state,now);
  return {...settled,running:false,lastTick:null};
}
export function recordInterruption(state,reason,now) {
  if(!DISTRACTION_REASONS.includes(reason)) return state;
  const settled=pauseFocus(state,now);
  return {...settled,interruptions:{...settled.interruptions,[reason]:settled.interruptions[reason]+1}};
}
export function formatClock(seconds) {
  const t=Math.max(0,Math.ceil(seconds));
  return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
}
