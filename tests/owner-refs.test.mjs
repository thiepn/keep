import test from 'node:test';
import assert from 'node:assert/strict';
import {makeOwnerRef,parseOwnerRef,sourceLanding} from '../src/compat/ownerResourceRefs.js';
test('genuine B3 canonical URI IDs and authorization separation',()=>{
 const uri=makeOwnerRef('keep','note','immutable Original ^ block').uri;
 const parsed=parseOwnerRef(uri);
 assert.equal(parsed?.id,'immutable Original ^ block');
 assert.equal(parsed?.source,'keep');
 assert.equal(sourceLanding(parsed),null);
 assert.equal(sourceLanding(makeOwnerRef('folio','habit','original-id')),'https://thiepn.dev/folio/');
 assert.equal(parseOwnerRef(uri.replace('?v=1','?v=2')),null);
 assert.equal(parseOwnerRef(uri.replace('note/','habit/')),null);
 assert.equal(parseOwnerRef(uri+'%2520'),null);
 assert.throws(()=>makeOwnerRef('keep','note','\nmalicious'));
});
