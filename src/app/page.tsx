import Runner from '@/providers/runner'
import AnsweringQuestion from '@/views/AnsweringQuestion'
import CorrectAnswer from '@/views/CorrectAnswer'
import QuestionAndRoulette from '@/views/QuestionAndRoulette'

export default function Home() {
  return (
    <Runner>
      <QuestionAndRoulette />
      <AnsweringQuestion />
      <CorrectAnswer />
    </Runner>
  )
}
