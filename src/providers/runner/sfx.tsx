import { useEffect } from 'react'
import useSound from 'use-sound'
import { useRunner } from '.'

const Sfx = () => {
  const [playCorrectSfx, { stop: stopCorrectSfx }] = useSound('/sfx/correct.mp3')
  const [playFireworksSfx, { stop: stopFireworksSfx }] = useSound('/sfx/fireworks.mp3', {
    loop: true,
  })
  const [playIncorrectSfx, { stop: stopIncorrectSfx }] = useSound('/sfx/incorrect.mp3')
  const [playQuestionSfx, { stop: stopQuestionSfx }] = useSound('/sfx/question.mp3', { loop: true })
  const [playRouletteSfx, { stop: stopRouletteSfx }] = useSound('/sfx/roulette.mp3', { loop: true })

  const { questionState, rouletteState, view } = useRunner()

  // Play sound while question is being answered
  useEffect(() => {
    if (view === 'answering-question' && questionState.isAnswering?.status === 'unanswered') {
      playQuestionSfx()
    } else {
      stopQuestionSfx()
    }
  }, [questionState.isAnswering, view])

  // Play sound on choosing the correct answer
  useEffect(() => {
    if (view === 'answering-question' && questionState.isAnswering?.status === 'correct') {
      playCorrectSfx()
    } else {
      stopCorrectSfx()
    }
  }, [questionState.isAnswering?.status, view])

  // Play sound on choosing the incorrect answer
  useEffect(() => {
    if (view === 'answering-question' && questionState.isAnswering?.status === 'incorrect') {
      playIncorrectSfx()
    } else {
      stopIncorrectSfx()
    }
  }, [questionState.isAnswering?.status, view])

  // Play sound while roulette is spinning
  useEffect(() => {
    if (view === 'question-and-roulette' && rouletteState.isSpinning) {
      playRouletteSfx()
    } else {
      stopRouletteSfx()
    }
  }, [rouletteState.isSpinning, view])

  // Play sound while fireworks are shooting
  useEffect(() => {
    if (view === 'question-and-roulette' && rouletteState.showingPresent) {
      playFireworksSfx()
    } else {
      stopFireworksSfx()
    }
  }, [rouletteState.showingPresent, view])

  return <></>
}

export default Sfx
