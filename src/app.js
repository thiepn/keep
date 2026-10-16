import {
  DEFAULT_PREFERENCES,DISTRACTION_REASONS,loadPreferences,savePreferences,
  newFocusState,tickFocus,pauseFocus,recordInterruption,formatClock,STORAGE_KEY
} from './discipline.js';
import {previewKeepB3} from './compat/keepB3Preview.js';
import {parseOwnerRef,sourceLanding} from './compat/ownerResourceRefs.js';

const root=document.getElementById('main');
const buttons=[...document.querySelectorAll('[data-page]')];
let prefs=loadPreferences(localStorage);
let page='today',focus=newFocusState(prefs.focusMinutes),intention='';
const escape=(value)=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ownerLink=(url,label)=>`<a class="owner-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const folio=ownerLink('https://thiepn.dev/folio/','Open Folio');
const tms=ownerLink('https://tms60.thiepn.dev/','Open TMS60');
const hub=ownerLink('https://thiepn.dev/apps/','Find original devotional app in Hub');

function render() {
  buttons.forEach(b=>{const selected=b.dataset.page===page;b.setAttribute('aria-current',selected?'page':'false')});
  if(page==='today')root.innerHTML=`
    <div class="eyebrow">TODAY · INTENTIONAL LIVING</div>
    <h1>Faith &amp; discipline</h1>
    <p class="intro">Make your next faithful choice easier. Practices are not a spiritual score.</p>
    <section class="lead">
      <span>YOUR PERSONAL BOUNDARY</span>
      <h2>${prefs.morningBoundary?'God before entertainment':'Choose your first priority deliberately'}</h2>
      <p>Scripture and prayer before optional scrolling, adjusted to real responsibilities. This is a chosen practice, not a requirement to earn grace.</p>
      <button data-go="focus" class="primary">Begin intentional focus</button>
    </section>
    <div class="columns">
      <section class="panel"><h2>Scripture &amp; prayer</h2><p>My Daily Devotion owns reading, reflection and prayer records. KEEP cannot view them without an approved source adapter.</p>${hub}</section>
      <section class="panel"><h2>Folio rhythms</h2><p>Start or log voluntary faith routines in the existing Folio habit engine; source progress stays there.</p>${folio}</section>
      <section class="panel"><h2>Verse review</h2><p>Only TMS60 can confirm memorization review results. KEEP does not guess due counts.</p>${tms}</section>
      <section class="panel"><h2>Entertainment boundary</h2><p>Personal target: <strong>${prefs.entertainmentMinutes} min/day</strong>. A planning intention, not an Android enforcement mechanism or measured screen time.</p><button data-go="settings">Adjust boundary</button></section>
    </div>`;
  else if(page==='focus')root.innerHTML=`
    <div class="eyebrow">FOCUS · FOREGROUND SESSION ONLY</div><h1>One next action</h1>
    <p class="intro">For authoritative logged focus, use Folio. This local clock does not record a completed task or alter any owner app.</p>
    <section class="lead focusbox"><label for="intention">What will you work on?</label>
      <input id="intention" maxlength="160" autocomplete="off" placeholder="A clear next action" value="${escape(intention)}">
      <output id="clock" aria-label="Focus time remaining">${formatClock(focus.remainingSeconds)}</output>
      <div class="actions"><button class="primary" data-act="toggle">${focus.running?'Pause':focus.finished?'Begin again':focus.remainingSeconds===focus.targetSeconds?'Start':'Resume'}</button>
      <button data-act="reset">Reset</button></div>
      <p role="status" id="focus-state">${focus.finished?'Timer elapsed. Completion is your decision.':focus.running?'Running only in this visible tab.':'Paused; no progress has been saved.'}</p>
    </section>
    <section class="panel"><h2>When distraction appears</h2><p>Notice the trigger, pray briefly, then choose the next action. Logging an interruption pauses the timer; observations remain in this tab.</p>
    <div class="reasons">${DISTRACTION_REASONS.map(r=>`<button data-reason="${r}">${r[0].toUpperCase()+r.slice(1)} (${focus.interruptions[r]})</button>`).join('')}</div>
    </section>
    <p class="owner-note">${folio} · Original Folio focus-service sessions and time blocks stay authoritative.</p>`;
  else if(page==='review')root.innerHTML=`
    <div class="eyebrow">WEEKLY REVIEW · PRIVATE</div><h1>Review and adjust</h1><p class="intro">No weekly scores are available without an authorized owner-backed history. These prompts are not saved here.</p>
    <div class="columns">
      <section class="panel"><h2>1. Attention</h2><p>What repeatedly displaced Scripture, prayer or important responsibilities?</p></section>
      <section class="panel"><h2>2. Faithfulness</h2><p>Where did you practice obedience, love or humility even when it was inconvenient?</p></section>
      <section class="panel"><h2>3. Environment</h2><p>Which app, notification or time of day should you change next week?</p></section>
      <section class="panel"><h2>4. Next practice</h2><p>Choose one small commitment and schedule it in the original Folio calendar.</p>${folio}</section>
    </div>
    <section class="panel"><h2>Current tab observations only</h2><p>${Object.values(focus.interruptions).reduce((n,v)=>n+v,0)} self-reported interruption(s) in this tab. This is not a complete week, phone-usage measurement or proof of behavior.</p>${hub}</section>`;
  else if(page==='knowledge')root.innerHTML=`<div class="eyebrow">KNOWLEDGE · SOURCE AUTHORITY</div><h1>Knowledge workspace</h1>
    <p>KEEP's earlier B3 knowledge source has not been imported into this new repository. No vault records have been migrated or recreated.</p>
    <section class="panel"><h2>Continue in native Hub Knowledge</h2><p>Hub has its own original note IDs, WikiLinks and linked tasks. Those are not copies of KEEP B3.</p>
    ${ownerLink('https://thiepn.dev/home/knowledge/','Open Hub Knowledge')}</section>
    <section class="panel"><h2>Original B3 resource references</h2>
      <p>Resolve a canonical <code>thiepn://</code> owner pointer without fetching, migrating or granting access to the underlying record.</p>
      <form id="owner-ref-form">
        <label for="owner-ref-input">Owner URI</label><input id="owner-ref-input" name="uri" autocomplete="off" placeholder="thiepn://keep/knowledge/note/...?...">
        <button type="submit">Inspect owner</button>
      </form>
      <p id="owner-ref-result" role="status"></p>
      <div id="owner-ref-links"></div>
    </section>
    <section class="panel"><h2>Inspect a KEEP B3 archive safely</h2>
      <p>This is a read-only format check, not an importer. The original KEEP B3 schema and encryption engine are not available in this repository.</p>
      <label for="b3-preview-file">Choose local B3 archive or manifest</label>
      <input id="b3-preview-file" data-b3-preview type="file" accept=".json,.zip,.keep,.backup" aria-describedby="b3-result">
      <p id="b3-result" role="status">No file selected. Nothing has been imported.</p>
    </section>`;
  else root.innerHTML=`<div class="eyebrow">LOCAL PREFERENCES</div><h1>Your boundaries</h1>
    <p class="intro">Only these non-sensitive choices are saved in this browser; there is no account sync, journal or second habit history.</p>
    <form id="settings-form" class="panel">
      <label for="focus-minutes">Default focus duration</label><select id="focus-minutes" name="focusMinutes"><option value="15" ${prefs.focusMinutes===15?'selected':''}>15 minutes</option><option value="25" ${prefs.focusMinutes===25?'selected':''}>25 minutes</option><option value="45" ${prefs.focusMinutes===45?'selected':''}>45 minutes</option></select>
      <label for="entertainment-minutes">Planned recreational screen time (0–180 min)</label><input id="entertainment-minutes" name="entertainmentMinutes" type="number" min="0" max="180" value="${prefs.entertainmentMinutes}" required>
      <label class="toggle"><input type="checkbox" name="morningBoundary" ${prefs.morningBoundary?'checked':''}> Scripture and prayer before optional phone entertainment</label>
      <div class="actions"><button class="primary" type="submit">Save preferences</button><button type="button" data-act="clear">Clear local preferences</button></div><p id="save-result" role="status"></p>
    </form><p>No website can enforce Android app restrictions. Use your phone's actual Digital Wellbeing settings.</p>`;
}
function navigate(next) {if(!['today','focus','review','knowledge','settings'].includes(next))return;page=next;render();root.focus({preventScroll:true});}
function refreshClock(){
  if(!focus.running)return;
  focus=tickFocus(focus,Date.now());
  if(page==='focus'){
    const time=root.querySelector('#clock'),state=root.querySelector('#focus-state');
    if(time)time.textContent=formatClock(focus.remainingSeconds);
    if(!focus.running){if(state)state.textContent='Timer elapsed. Completion is your decision.';render();}
  }
}
window.setInterval(refreshClock,500);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&focus.running){focus=pauseFocus(focus,Date.now());if(page==='focus')render();}});
window.addEventListener('pagehide',()=>{focus=pauseFocus(focus,Date.now())});
document.addEventListener('click',event=>{
 const target=event.target.closest('button');if(!target)return;
 if(target.dataset.page||target.dataset.go){navigate(target.dataset.page||target.dataset.go);return;}
 if(target.dataset.reason){focus=recordInterruption(focus,target.dataset.reason,Date.now());render();return;}
 if(target.dataset.act==='toggle'){
  if(focus.finished)focus=newFocusState(prefs.focusMinutes);
  else if(focus.running){focus=pauseFocus(focus,Date.now());render();return;}
  focus={...focus,running:true,lastTick:Date.now()};render();return;
 }
 if(target.dataset.act==='reset'){focus=newFocusState(prefs.focusMinutes);render();return;}
 if(target.dataset.act==='clear'){
  try{localStorage.removeItem(STORAGE_KEY)}catch{}
  prefs={...DEFAULT_PREFERENCES};focus=newFocusState(prefs.focusMinutes);render();return;
 }
});
root.addEventListener('input',event=>{if(event.target.id==='intention')intention=event.target.value.slice(0,160)});
root.addEventListener('change',async event=>{
  const input=event.target;
  if(!(input instanceof HTMLInputElement)||!input.matches('[data-b3-preview]')||!input.files?.[0])return;
  const file=input.files[0],status=root.querySelector('#b3-result');
  if(!status)return;
  if(file.size>2_000_000){status.textContent='File too large for a safe inspection. No records were read or written.';return;}
  try{
    const result=previewKeepB3(await file.text());
    status.textContent=result.reason+' ('+result.status+').';
  }catch{status.textContent='Inspection failed. No original records were changed.'}
});
root.addEventListener('submit',event=>{
 if(event.target.id!=='owner-ref-form')return;
 event.preventDefault();
 const text=String(new FormData(event.target).get('uri')||'');
 const ref=parseOwnerRef(text),status=root.querySelector('#owner-ref-result'),links=root.querySelector('#owner-ref-links');
 if(!status||!links)return;
 links.replaceChildren();
 if(!ref){status.textContent='Unrecognized or noncanonical owner URI. No data was accessed.';return;}
 status.textContent=ref.source+' · '+ref.kind+' · original source ID: '+ref.id+'. This reference does not authorize access.';
 const home=sourceLanding(ref);
 if(home){
   const a=document.createElement('a');a.href=home;a.textContent='Open original '+ref.source+' home (no private identifier transmitted)';a.rel='noopener noreferrer';a.target='_blank';links.append(a);
 }
});
root.addEventListener('submit',event=>{
 if(event.target.id!=='settings-form')return;
 event.preventDefault();const form=event.target;const data=new FormData(form);
 prefs={version:1,focusMinutes:Number(data.get('focusMinutes')),entertainmentMinutes:Number(data.get('entertainmentMinutes')),morningBoundary:data.has('morningBoundary')};
 prefs=({...DEFAULT_PREFERENCES,...prefs});
 const stored=savePreferences(localStorage,prefs);
 prefs=loadPreferences(localStorage);
 if(!stored)prefs={...DEFAULT_PREFERENCES,...prefs};
 focus=newFocusState(prefs.focusMinutes);
 render();
 root.querySelector('#save-result').textContent=stored?'Saved on this browser.':'Local storage unavailable; changes may not persist.';
});
render();
