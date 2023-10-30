import { produce } from 'immer'
import { ActionTypes } from './actions'

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startdate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CycleState = {
  cycles: Cycle[]
  activeCycleId?: string
}

type ActionProps = {
  type: ActionTypes
  payload: {
    newCycle?: Cycle
    activeCycleId?: string
    value?: string
  }
}

export function cyclesReducer(state: CycleState, action: ActionProps) {
  const currentCycleIndex = state.cycles.findIndex(
    (item) => item.id === state.activeCycleId,
  )

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle as Cycle)
        draft.activeCycleId = action.payload.newCycle?.id
      })
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = undefined
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = undefined
      })
    }

    case ActionTypes.UPDATE_ACTIVECYCLEID: {
      return produce(state, (draft) => {
        draft.activeCycleId = action.payload.value || undefined
      })
    }

    default:
      return state
  }
}
