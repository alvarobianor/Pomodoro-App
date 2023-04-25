import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useState } from 'react'

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

  const task = watch('task')
  const isDisabledTask = !task
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  function handleCreateNewCicle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton disabled={isDisabledTask} type="submit">
          <Play size={24} />
          Começar
        </CountdownButton>
      </FormContainer>
    </HomeContainer>
  )
}
