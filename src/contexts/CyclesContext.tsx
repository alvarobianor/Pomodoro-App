import { ReactNode, createContext, useReducer, useState } from 'react'

type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startdate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

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
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE': {
        return [...state, action.payload.newCycle]
      }
      case 'INTERRUPT_CURRENT_CYCLE': {
        return state.map((item) => {
          if (item.id === activeCycleId) {
            return { ...item, interruptedDate: new Date() }
          } else {
            return item
          }
        })
      }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
        return state.map((item) => {
          if (item.id === activeCycleId) {
            return { ...item, finishedDate: new Date() }
          } else {
            return item
          }
        })
      }

      default:
        return state
    }
  }, [])

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

    // setCycles((state) => [...state, newCycle])
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function interruptCycle() {
    // setCycles((state) =>
    //   state.map((item) => {
    //     if (item.id === activeCycleId) {
    //       return { ...item, interruptedDate: new Date() }
    //     } else {
    //       return item
    //     }
    //   }),
    // )
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    setActiveCycleId(null)
  }

  function maskCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
    // setCycles((state) =>
    //   state.map((item) => {
    //     if (item.id === activeCycleId) {
    //       return { ...item, finishedDate: new Date() }
    //     } else {
    //       return item
    //     }
    //   }),
    // )
  }

  function updateActiveCycleId(value: string | null = null) {
    setActiveCycleId(value)
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
