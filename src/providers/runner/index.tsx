'use client'

import { getPresents, Present } from '@/data/presents'
import { getQuestions, Question } from '@/data/questions'
import { createTheme, ThemeProvider } from '@mui/material'
import random from 'lodash/random'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Sfx from './sfx'

export type View = 'question-and-roulette' | 'correct-answer' | 'answering-question'

type QuestionWithStatus = Question & {
  id: number
  optionSelectedIndex?: number
  status: 'unanswered' | 'correct' | 'incorrect'
}

type RunnerContextType = {
  questionState: {
    isAnswering?: QuestionWithStatus
    questions: Array<QuestionWithStatus>
  }
  rouletteState: {
    canSpin: boolean
    isSpinning: boolean
    presents: Array<Present>
    showingPresent?: Present
    spinToPresent?: number
  }

  changeView: (view: View) => void
  view: View

  answerQuestion: (optionIndex: number) => void
  closeShowingPresentDialog: () => void
  doneSpinning: () => void
  retryQuestion: () => void
  selectQuestion: (index: number) => void
  spinRoulette: () => void
}

const RunnerContext = createContext<RunnerContextType>({
  questionState: {
    questions: [],
  },
  rouletteState: {
    canSpin: false,
    isSpinning: false,
    presents: [],
  },

  changeView: () => null,
  view: 'question-and-roulette',

  answerQuestion: () => null,
  closeShowingPresentDialog: () => null,
  doneSpinning: () => null,
  retryQuestion: () => null,
  selectQuestion: () => null,
  spinRoulette: () => null,
})

const Runner = ({ children }: PropsWithChildren) => {
  const [view, changeView] = useState<View>('question-and-roulette')

  const [isAnswering, setIsAnswering] = useState<QuestionWithStatus>()
  const [questions, setQuestions] = useState<Array<QuestionWithStatus>>([])

  const [isSpinning, setIsSpinning] = useState(false)
  const [showingPresent, setShowingPresent] = useState<Present>()
  const [spinToPresent, setSpinToPresent] = useState<number>()
  const [presents, setPresents] = useState<Array<Present>>([])

  const canSpin = Boolean(
    view === 'question-and-roulette' && isAnswering?.status === 'correct' && presents.length
  )

  const answerQuestion = useCallback(
    (optionIndex: number) => {
      if (view === 'answering-question' && isAnswering) {
        const status = isAnswering.answers[optionIndex]?.isCorrect ? 'correct' : 'incorrect'
        setIsAnswering({ ...isAnswering, optionSelectedIndex: optionIndex, status })

        if (status === 'correct') {
          setTimeout(() => {
            changeView('correct-answer')
          }, 5000)
        }
      }
    },
    [isAnswering, view]
  )

  const retryQuestion = useCallback(() => {
    if (view === 'answering-question' && isAnswering) {
      setIsAnswering({ ...isAnswering, optionSelectedIndex: undefined, status: 'unanswered' })
    }
  }, [isAnswering, view])

  const spinRoulette = useCallback(() => {
    if (canSpin) {
      const presentIndex = random(0, presents.length - 1)

      setIsSpinning(true)
      setSpinToPresent(presentIndex)
    }
  }, [canSpin, presents])

  const doneSpinning = useCallback(() => {
    if (isSpinning && spinToPresent != null) {
      setIsAnswering(undefined)
      setShowingPresent(presents[spinToPresent])
      setIsSpinning(false)
      setSpinToPresent(undefined)
      setPresents((presents) => presents.filter((_, idx) => idx !== spinToPresent))
    }
  }, [isSpinning, spinToPresent])

  const closeShowingPresentDialog = useCallback(() => {
    if (showingPresent) {
      setShowingPresent(undefined)
    }
  }, [showingPresent])

  const selectQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length && questions[index].status === 'unanswered') {
        setIsAnswering(questions[index])
        changeView('answering-question')
      }
    },
    [questions]
  )

  useEffect(() => {
    if (isAnswering) {
      setQuestions((questions) =>
        questions.map((question) => (question.id === isAnswering.id ? isAnswering : question))
      )
    }
  }, [isAnswering])

  useEffect(() => {
    ;(async () => {
      const questions = await getQuestions()
      setQuestions(questions.map((question, id) => ({ ...question, id, status: 'unanswered' })))

      const presents = await getPresents()
      setPresents(presents)
    })()
  }, [])

  const theme = createTheme({
    palette: {
      info: {
        main: '#A4D3EE',
      },
      secondary: {
        main: '#FF82AB',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <RunnerContext.Provider
        value={{
          questionState: {
            isAnswering,
            questions,
          },
          rouletteState: {
            canSpin,
            isSpinning,
            presents,
            showingPresent,
            spinToPresent,
          },

          changeView,
          view,

          answerQuestion,
          closeShowingPresentDialog,
          doneSpinning,
          retryQuestion,
          selectQuestion,
          spinRoulette,
        }}
      >
        <div className="h-screen w-screen overflow-hidden relative">{children}</div>
        <Sfx />
      </RunnerContext.Provider>
    </ThemeProvider>
  )
}

export default Runner

export const useRunner = () => useContext(RunnerContext)
