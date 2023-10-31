import { useContext } from 'react'
import { CycleContext } from '../contexts/CyclesContext'

export function useCycles() {
  const context = useContext(CycleContext)

  return context
}
