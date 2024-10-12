import { useRunner } from '@/providers/runner'
import { Button, ButtonProps, Stack, Typography } from '@mui/material'

export const StyledButton = (props: ButtonProps & { index: number }) => {
  const { questionState, selectQuestion } = useRunner()
  const status = questionState.questions[props.index]?.status ?? 'unanswered'

  return (
    <Button
      {...props}
      color={status === 'correct' ? 'success' : status === 'incorrect' ? 'error' : 'secondary'}
      variant="contained"
      className="h-14 w-20 text-3xl lg:h-20 lg:w-28 lg:text-4xl xl:h-24 xl:w-32 xl:text-5xl font-semibold"
      onClick={() => selectQuestion(props.index)}
    >
      {props.children}
    </Button>
  )
}

const Questions = () => {
  const {
    questionState: { questions },
  } = useRunner()

  return (
    <Stack spacing={4} alignItems="center">
      <Typography className="text-3xl lg:text-4xl font-semibold" variant="h2">
        Select a question below.
      </Typography>

      {Array.from({ length: questions.length }).map(
        (_, idx, arr) =>
          idx % 3 === 0 && (
            <Stack direction="row" spacing={3} alignItems="center" key={idx}>
              <StyledButton index={idx}>{idx + 1}</StyledButton>
              {idx + 1 < arr.length && <StyledButton index={idx + 1}>{idx + 2}</StyledButton>}
              {idx + 2 < arr.length && <StyledButton index={idx + 2}>{idx + 3}</StyledButton>}
            </Stack>
          )
      )}
    </Stack>
  )
}

export default Questions
