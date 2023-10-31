import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { Countdown } from '../../components/Countdown'
import { NewCycleform } from '../../components/NewCyleForm'
import { useCycles } from '../../hooks/useCycles'
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
    .max(99, 'O máximo são 99 minutos'),
})

export type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

export function Home() {
  const { activeCycle, activeCycleId, createNewCicle, interruptCycle } =
    useCycles()

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isDisabledTask = !task && !activeCycleId

  function handleCreateNewCicle(data: NewCicleFormData) {
    createNewCicle(data)
    reset()
  }

  function handleInterruptCycle() {
    interruptCycle()
  }

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleform />
        </FormProvider>

        <Countdown />

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
