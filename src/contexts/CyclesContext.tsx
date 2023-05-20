import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle, CyclesReducer } from '../reducers/cycle/reducer'
import { ActionTypes } from '../reducers/cycle/actions'

type NewCicleFormData = {
  task: string
  minutesAmount: number
}

type CyclesContext = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  activeCycleId: string | null
  updateActiveCycleId: (value?: string) => void
  updateAmountSecondsPassed: (value: number) => void
  maskCycleAsFinished: () => void
  createNewCicle: (data: NewCicleFormData) => void
  interruptCycle: () => void
}

type Props = {
  children: ReactNode
}

export const CycleContext = createContext({} as CyclesContext)

export function CyclesContextProvider({ children }: Props) {
  const [cycleState, dispatch] = useReducer(CyclesReducer, {
    activeCycleId: null,
    cycles: [],
  })
  const { cycles, activeCycleId } = cycleState

  // State to manager the decrement of seconds, the rate of decrement is 1 second
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  // Get tha all informations about the active cycle
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  function createNewCicle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startdate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  function maskCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
  }

  function updateActiveCycleId(value: string | null = null) {
    dispatch({
      type: ActionTypes.UPDATE_ACTIVECYCLEID,
      payload: {
        value,
      },
    })
  }

  function updateAmountSecondsPassed(value: number) {
    setAmountSecondsPassed(value)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        activeCycleId,
        updateActiveCycleId,
        updateAmountSecondsPassed,
        maskCycleAsFinished,
        createNewCicle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
