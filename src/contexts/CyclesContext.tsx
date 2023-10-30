import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addnewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
  updateActiveCycleIdAction,
} from '../reducers/cycle/actions'
import { Cycle, cyclesReducer } from '../reducers/cycle/reducer'
import { localStorageKey } from '../utils/constants'
import { differenceInSeconds } from 'date-fns'

type NewCicleFormData = {
  task: string
  minutesAmount: number
}

type CyclesContext = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  activeCycleId?: string
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
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      activeCycleId: null,
      cycles: [],
    },
    (initialState) => {
      const storageStateJson = localStorage.getItem(localStorageKey)
      return storageStateJson ? JSON.parse(storageStateJson) : initialState
    },
  )
  const { cycles, activeCycleId } = cycleState

  // Get tha all informations about the active cycle
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  // State to manager the decrement of seconds, the rate of decrement is 1 second
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startdate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)

    localStorage.setItem(localStorageKey, stateJSON)
  }, [cycleState])

  function createNewCicle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startdate: new Date(),
    }

    dispatch(addnewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCurrentCycleAction(activeCycleId))
  }

  function maskCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction(activeCycleId))
  }

  function updateActiveCycleId(value?: string) {
    dispatch(updateActiveCycleIdAction(value))
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
