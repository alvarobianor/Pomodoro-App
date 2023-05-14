import { CountdownContainer, Separator } from './styles'

type Props = {
  minutes: string
  seconds: string
}

export function Countdown({ minutes, seconds }: Props) {
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
