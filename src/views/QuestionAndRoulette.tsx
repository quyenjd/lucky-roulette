'use client'

import Questions from '@/components/Questions'
import Roulette from '@/components/Roulette'
import View from '@/components/View'
import { useRunner } from '@/providers/runner'
import Fireworks, { FireworksHandlers } from '@fireworks-js/react'
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useEffect, useRef } from 'react'

const QuestionAndRoulette = () => {
  const { rouletteState, closeShowingPresentDialog } = useRunner()

  const fireworksRef = useRef<FireworksHandlers>(null)

  useEffect(() => {
    if (rouletteState.showingPresent) {
      fireworksRef.current?.start()
    } else {
      fireworksRef.current?.stop()
    }
  }, [rouletteState.showingPresent])

  return (
    <View viewId="question-and-roulette">
      <Stack className="h-full w-full" direction="row" alignItems="center">
        <div className="w-[45%]">
          <Questions />
        </div>
        <div className="w-[55%]">
          <Roulette />
        </div>
      </Stack>

      <Dialog
        open={Boolean(rouletteState.showingPresent)}
        PaperProps={{ className: 'animate-wiggle w-1/2' }}
      >
        <DialogTitle className="text-center text-4xl px-8 pt-6 font-bold bg-[#FAFAD2]">
          Congratulations!!!
        </DialogTitle>
        <DialogContent className="text-3xl px-8 pt-2 pb-6 bg-[#FAFAD2]">
          <Stack spacing={3} alignItems="center">
            <p>
              Our lucky 🎁 for you is <b>{rouletteState.showingPresent?.title}</b>!
            </p>
            <Button
              className="normal-case text-xl px-6 py-2"
              variant="outlined"
              color="primary"
              onClick={() => closeShowingPresentDialog()}
            >
              Thanks
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Fireworks
        className="absolute inset-0 z-[2000] pointer-events-none"
        ref={fireworksRef}
        options={{ brightness: { min: 80, max: 100 }, explosion: 7 }}
      />
    </View>
  )
}

export default QuestionAndRoulette
