import { useRunner, View } from '@/providers/runner'

const useView = (view: View) => {
  const { view: displayingView, changeView } = useRunner()
  return { in: displayingView === view, transitionTo: changeView }
}

export default useView
