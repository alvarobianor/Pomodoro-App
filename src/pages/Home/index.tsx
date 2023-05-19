import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'

import { createContext, useState } from 'react'
import { Countdown } from '../../components/Countdown'
import { NewCycleform } from '../../components/NewCyleForm'
import {
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa.'),
  minutesAmount: zod
    .number()
    .min(1, 'O mínimo é de 1 minuto.')
    .max(90, 'O máximo são 90 minutos'),
})

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startdate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CyclesContext = {
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  activeCycleId: string | null
  updateActiveCycleId: (value?: string) => void
  updateAmountSecondsPassed: (value: number) => void
  maskCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CyclesContext)

export function Home() {
  const formCycle = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = formCycle

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // State to manager the decrement of seconds, the rate of decrement is 1 second
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  // Get tha all informations about the active cycle
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  const task = watch('task')
  const isDisabledTask = !task && !activeCycleId

  function updateActiveCycleId(value: string | null = null) {
    setActiveCycleId(value)
  }

  function updateAmountSecondsPassed(value: number) {
    setAmountSecondsPassed(value)
  }

  function maskCycleAsFinished() {
    setCycles((state) =>
      state.map((item) => {
        if (item.id === activeCycleId) {
          return { ...item, finishedDate: new Date() }
        } else {
          return item
        }
      }),
    )
  }

  function handleCreateNewCicle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startdate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((item) => {
        if (item.id === activeCycleId) {
          return { ...item, interruptedDate: new Date() }
        } else {
          return item
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewCicle)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            amountSecondsPassed,
            activeCycleId,
            updateActiveCycleId,
            updateAmountSecondsPassed,
            maskCycleAsFinished,
          }}
        >
          <FormProvider {...formCycle}>
            <NewCycleform />
          </FormProvider>

          <Countdown />
        </CycleContext.Provider>

        {!activeCycle ? (
          <StartCountdownButton disabled={isDisabledTask} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        ) : (
          <StopCountdownButton
            disabled={isDisabledTask}
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        )}
      </FormContainer>
    </HomeContainer>
  )
}
