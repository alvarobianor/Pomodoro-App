import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  CountdownButton,
  TaskContainer,
  TaskInput,
  MinutesAmountInput,
} from './styles'
import { useEffect, useState } from 'react'

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
}

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // State to manager the decrement of seconds, the rate of decrement is 1 second
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const task = watch('task')
  const isDisabledTask = !task

  // Get tha all informations about the active cycle
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  useEffect(() => {
    let intervalId: number
    if (activeCycle) {
      intervalId = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startdate),
        )
      }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [activeCycle])

  // Calculate the total of seconds of the cycle
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // If has a active cycle, calculate the current second of the cycle
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Calculates only the amount of minutes this cycle has
  const minutesAmount = Math.floor(currentSeconds / 60)

  // Calculates only the rest of seconds this cycle has
  const secondsAmount = currentSeconds % 60

  // Transform and format to the correct format the minutes and seconds to show on display
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

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

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewCicle)}>
        <TaskContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value={'Projeto 1'} />
            <option value={'Projeto 2'} />
            <option value={'Projeto 3'} />
            <option value={'Projeto 4'} />
            <option value={'Projeto 5'} />
            <option value={'Projeto 6'} />
            <option value={'Açai'} />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={0}
            max={90}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </TaskContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <CountdownButton disabled={isDisabledTask} type="submit">
          <Play size={24} />
          Começar
        </CountdownButton>
      </FormContainer>
    </HomeContainer>
  )
}
