import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  UPDATE_ACTIVECYCLEID = 'UPDATE_ACTIVECYCLEID',
}

export function addnewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}
export function interruptCurrentCycleAction(activeCycleId: string | null) {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: {
      activeCycleId, // Can substituts thi for nothing, because the props can be accesss internaly
    },
  }
}
export function markCurrentCycleAsFinishedAction(activeCycleId: string | null) {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    payload: {
      activeCycleId, // Can substituts thi for nothing, because the props can be accesss internaly
    },
  }
}
export function updateActiveCycleIdAction(value: string | null) {
  return {
    type: ActionTypes.UPDATE_ACTIVECYCLEID,
    payload: {
      value,
    },
  }
}
