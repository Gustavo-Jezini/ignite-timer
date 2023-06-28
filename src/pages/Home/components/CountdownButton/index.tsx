import { HandPalm, Play } from '@phosphor-icons/react'
import { StartCountDownButton, StopCountDownButton } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../context/CyclesContext'

export function CountdownButton({ isSubmitDisable }: any) {
  const { activeCycle, interruptCurrentCycle } = useContext(CyclesContext)
  return (
    <>
      {activeCycle ? (
        <StopCountDownButton onClick={interruptCurrentCycle} type="button">
          <HandPalm size={24} />
          Interromper
        </StopCountDownButton>
      ) : (
        <StartCountDownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      )}
    </>
  )
}
