import { useEffect, useRef } from 'react'

const useAsRef = <T>(state: T) => {
  const ref = useRef(state)
  useEffect(() => {
    ref.current = state
  }, [state])
  return ref
}

export default useAsRef
