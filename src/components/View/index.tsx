import { Fade, Stack } from '@mui/material'
import { ViewProps } from './types'
import useView from '@/hooks/use-view'

const View = ({ children, viewId }: ViewProps) => {
  const viewState = useView(viewId)

  return (
    <Fade in={viewState.in} timeout={1000}>
      <Stack className="absolute inset-0" data-view={viewId}>
        {children}
      </Stack>
    </Fade>
  )
}

export default View
