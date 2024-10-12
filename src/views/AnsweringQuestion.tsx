'use client'

import { StyledButton } from '@/components/Questions'
import View from '@/components/View'
import { useRunner } from '@/providers/runner'
import { Button, ButtonProps, Stack, Typography } from '@mui/material'
import classNames from 'classnames'

export const ShadowedButton = (props: ButtonProps & { index: number }) => {
  const { questionState, answerQuestion } = useRunner()

  const isSelected = questionState.isAnswering?.optionSelectedIndex === props.index
  const status = questionState.isAnswering?.status

  return (
    <Button
      className={classNames(
        'w-1/2 text-2xl md:text-3xl py-4 px-5 normal-case',
        status !== 'unanswered' && 'pointer-events-none opacity-60'
      )}
      color={
        isSelected && status === 'correct'
          ? 'success'
          : isSelected && status === 'incorrect'
          ? 'error'
          : 'info'
      }
      variant="contained"
      style={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
      onClick={() => answerQuestion(props.index)}
      {...props}
    >
      {questionState.isAnswering?.answers[props.index].text}
    </Button>
  )
}

const AnsweringQuestion = () => {
  const { questionState, changeView, retryQuestion } = useRunner()

  return (
    <View viewId="answering-question">
      {questionState.isAnswering && (
        <Stack
          flexGrow={1}
          className="px-4 sm:px-8 md:px-12 lg:px-16"
          spacing={4}
          justifyContent="center"
        >
          <div className="text-center">
            <StyledButton index={questionState.isAnswering.id} style={{ pointerEvents: 'none' }}>
              {questionState.isAnswering.id + 1}
            </StyledButton>
          </div>

          <Typography
            className="text-2xl sm:text-3xl md:text-4xl text-center pb-2 md:pb-6 font-semibold"
            variant="h2"
          >
            {questionState.isAnswering.title}
          </Typography>

          <Stack spacing={4}>
            <Stack spacing={4} direction="row">
              <ShadowedButton index={0} />
              <ShadowedButton index={1} />
            </Stack>
            <Stack spacing={4} direction="row">
              <ShadowedButton index={2} />
              <ShadowedButton index={3} />
            </Stack>
          </Stack>

          {questionState.isAnswering.status === 'incorrect' && (
            <Stack alignItems="center" className="pt-4">
              <Button
                className="normal-case"
                color="secondary"
                variant="outlined"
                onClick={() => retryQuestion()}
              >
                Try again!
              </Button>
            </Stack>
          )}
        </Stack>
      )}
      <Stack>
        <Button
          color="inherit"
          className="normal-case"
          onClick={() => changeView('question-and-roulette')}
        >
          ←<span className="ml-2">Back to Questions</span>
        </Button>
      </Stack>
    </View>
  )
}

export default AnsweringQuestion
