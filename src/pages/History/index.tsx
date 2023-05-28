import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CycleContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(item.startdate), {
                      addSuffix: true,
                      locale: ptBr,
                    })}
                  </td>
                  <td>
                    {item.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {item.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!item.interruptedDate && !item.finishedDate && (
                      <Status statusColor="yellow">Em Andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
