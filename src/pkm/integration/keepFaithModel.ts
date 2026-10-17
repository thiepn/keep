/** Native KEEP B3 FD1: user-selected P50 tracking IDs, no parallel habit history.
 * Privacy: selection is a local UI preference, not source progress, and the
 * original TrackingService retains all definition/entry/schedule authority.
 */
import type { TrackingDefinition, TrackingEntry } from '../tracking/trackingTypes';
import { aggregateDayForDefinition, aggregatePeriodMetrics } from '../tracking/trackingAggregationEngine';
import { addDays } from '../temporal/dateUtils';

export const KEEP_FAITH_SELECTION_KEY = 'keep_fd1_selected_p50_habit_ids_v1';
export function validateFaithSelection(value: unknown, definitions: readonly TrackingDefinition[]): string[] {
  if (!Array.isArray(value) || value.length > 16) return [];
  const allowed = new Set(definitions.filter(d => d.type === 'habit' && d.status !== 'archived').map(d => d.id));
  const selected = value.filter((id): id is string => typeof id === 'string' && allowed.has(id));
  return [...new Set(selected)].slice(0, 12);
}
export function readFaithSelection(definitions: readonly TrackingDefinition[], storage?: Pick<Storage,'getItem'>): string[] {
  try {
    const data = (storage ?? localStorage).getItem(KEEP_FAITH_SELECTION_KEY);
    return validateFaithSelection(JSON.parse(data || 'null'), definitions);
  } catch { return []; }
}
export function saveFaithSelection(ids: readonly string[], definitions: readonly TrackingDefinition[], storage?: Pick<Storage,'setItem'>): boolean {
  const verified=validateFaithSelection([...ids],definitions);
  try { (storage ?? localStorage).setItem(KEEP_FAITH_SELECTION_KEY,JSON.stringify(verified));return true; }
  catch { return false; }
}
export function projectSelectedFaithPractices(definitions: readonly TrackingDefinition[], entries: readonly TrackingEntry[], selectedIds: readonly string[], today: string) {
  const allowed = validateFaithSelection([...selectedIds],definitions);
  const start = addDays(today,-6);
  return definitions.filter(d=>allowed.includes(d.id)).map(d=>{
    const ownEntries=entries.filter(e=>e.definitionId===d.id);
    const day=aggregateDayForDefinition(d,today,ownEntries);
    const week=aggregatePeriodMetrics(d,start,today,ownEntries);
    return {
      id:d.id,name:d.name,trackingType:d.trackingType,status:d.status,
      due:day.isDue,paused:day.isPaused,recordedToday:day.entryCount>0,
      completedToday:day.isCompleted && !day.isPaused,
      recordedDays:week.recordedOccurrences,scheduledDays:week.expectedOccurrences,
      completedDays:week.completionCount,
      weekValues:week.dailyData.map(x=>({date:x.date,due:x.isDue,recorded:x.hasEntry,completed:x.isCompleted})),
    };
  });
}
