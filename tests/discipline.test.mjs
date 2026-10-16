import test from 'node:test'
import assert from 'node:assert/strict'
import { parsePreferences, newFocusState, tickFocus, pauseFocus, recordInterruption, formatClock } from '../src/discipline.js'

test('preferences reject unknown versions and unsafe values',()=>{
 assert.equal(parsePreferences({version:2,focusMinutes:999}).focusMinutes,25)
 assert.deepEqual(parsePreferences({version:1,focusMinutes:45,entertainmentMinutes:-1,morningBoundary:false}),
 {version:1,focusMinutes:45,entertainmentMinutes:45,morningBoundary:false})
})
test('visible-clock time is honest and resettable',()=>{
 let s={...newFocusState(15),running:true,lastTick:1000}
 s=tickFocus(s,61000)
 assert.equal(s.remainingSeconds,840)
 assert.equal(formatClock(s.remainingSeconds),'14:00')
 s=pauseFocus(s,61000)
 assert.equal(s.running,false)
 assert.equal(tickFocus(s,120000).remainingSeconds,840)
})
test('interruptions pause; only known self-reported reasons counted',()=>{
 let s={...newFocusState(25),running:true,lastTick:0}
 s=recordInterruption(s,'boredom',10000)
 assert.equal(s.interruptions.boredom,1)
 assert.equal(s.running,false)
 assert.equal(recordInterruption(s,'invalid',20000),s)
})
