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
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle?.id,
      }
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      return {
        cycles: state.cycles.map((item) => {
          if (item.id === action.payload.activeCycleId) {
            return { ...item, interruptedDate: new Date() }
          } else {
            return item
          }
        }),
        activeCycleId: null,
      }
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      return {
        cycles: state.cycles.map((item) => {
          if (item.id === action.payload.activeCycleId) {
            return { ...item, finishedDate: new Date() }
          } else {
            return item
          }
        }),
        activeCycleId: null,
      }
    }
    case ActionTypes.UPDATE_ACTIVECYCLEID: {
      return {
        ...state,
        activeCycleId: action.payload.value || null,
      }
    }

    default:
      return state
  }
}
