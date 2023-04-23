import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

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

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  const task = watch('task')

  const isDisabledTask = !task

  function handleCreateNewCicle(event: unknown) {
    console.log(event)
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
