import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../pages/Home'

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    activeCycleId,
    updateActiveCycleId,
    updateAmountSecondsPassed,
    maskCycleAsFinished,
  } = useContext(CycleContext)

  // Calculate the total of seconds of the cycle
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let intervalId: number

    if (activeCycle) {
      intervalId = setInterval(() => {
        const secondsOfCicle = differenceInSeconds(
          new Date(),
          activeCycle.startdate,
        )
        if (amountSecondsPassed >= totalSeconds) {
          maskCycleAsFinished()

          updateActiveCycleId()
          clearInterval(intervalId)
        } else {
          updateAmountSecondsPassed(secondsOfCicle)
        }
      }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCycle, activeCycleId, amountSecondsPassed, totalSeconds])

  // If has a active cycle, calculate the current second of the cycle
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Calculates only the amount of minutes this cycle has
  const minutesAmount = Math.floor(currentSeconds / 60)

  // Calculates only the rest of seconds this cycle has
  const secondsAmount = currentSeconds % 60

  // Transform and format to the correct format the minutes and seconds to show on display
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro App'
    }
  }, [activeCycle, minutes, seconds])

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
