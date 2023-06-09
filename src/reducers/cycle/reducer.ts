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
  activeCycleId: string | null
}

// type ActionProps = {
//   type: ActionTypes
//   payload: {
//     newCycle?: Cycle
//     activeCycleId?: string | null
//     value?: string | null
//   }
// }

export function CyclesReducer(state: CycleState, action: any) {
  const currentCycleIndex = state.cycles.findIndex(
    (item) => item.id === state.activeCycleId,
  )

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle?.id
      })
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.UPDATE_ACTIVECYCLEID: {
      return produce(state, (draft) => {
        draft.activeCycleId = action.payload.value || null
      })
    }

    default:
      return state
  }
}
