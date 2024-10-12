'use client'

import View from '@/components/View'
import useView from '@/hooks/use-view'
import { useEffect } from 'react'

const CorrectAnswer = () => {
  const viewState = useView('correct-answer')

  useEffect(() => {
    if (viewState.in) {
      viewState.transitionTo('question-and-roulette')
    }
  }, [viewState])

  return <View viewId="correct-answer"></View>
}

export default CorrectAnswer
