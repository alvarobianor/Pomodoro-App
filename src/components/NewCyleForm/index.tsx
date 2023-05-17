import { TaskContainer, MinutesAmountInput, TaskInput } from './styles'
import { UseFormRegister } from 'react-hook-form'

type Props = {
  activeCycleId?: string | null
  register: UseFormRegister<{
    task: string
    minutesAmount: number
  }>
}

export function NewCycleform({ activeCycleId, register }: Props) {
  return (
    <TaskContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycleId}
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
        step={1}
        min={0}
        max={90}
        disabled={!!activeCycleId}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </TaskContainer>
  )
}