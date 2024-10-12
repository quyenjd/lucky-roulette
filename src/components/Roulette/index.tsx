'use client'

import useAsRef from '@/hooks/use-as-ref'
import { useRunner } from '@/providers/runner'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { Wheel } from 'spin-wheel'

const Roulette = () => {
  const { rouletteState, doneSpinning, spinRoulette } = useRunner()

  const doneSpinningRef = useAsRef(doneSpinning)
  const spinRouletteRef = useAsRef(spinRoulette)

  const [rouletteRef, setRouletteRef] = useState<HTMLDivElement | null>(null)
  const [rouletteCenterRef, setRouletteCenterRef] = useState<HTMLImageElement | null>(null)
  const [rouletteOverlayRef, setRouletteOverlayRef] = useState<HTMLImageElement | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rouletteProps = useMemo<any>(
    () => ({
      radius: 0.84,
      itemLabelRadius: 0.93,
      itemLabelRadiusMax: 0.35,
      itemLabelRotation: 180,
      itemLabelAlign: 'left',
      itemLabelColors: ['#fff'],
      itemLabelBaselineOffset: -0.07,
      itemLabelFont: 'Amatic SC',
      itemLabelFontSizeMax: 55,
      itemBackgroundColors: [
        '#ffc93c',
        '#66bfbf',
        '#a2d5f2',
        '#515070',
        '#43658b',
        '#ed6663',
        '#d54062',
      ],
      rotationSpeedMax: 500,
      rotationResistance: -100,
      lineWidth: 1,
      lineColor: '#fff',
      image: rouletteCenterRef,
      overlayImage: rouletteOverlayRef,
      items: rouletteState.presents.map(() => ({ label: '🎁' })),
      onRest: () => doneSpinningRef.current(),
      onSpin: () => spinRouletteRef.current(),
    }),
    [rouletteState.presents]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wheel, setWheel] = useState<any>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let wheel: any

    if (rouletteRef) {
      wheel = new Wheel(rouletteRef, rouletteProps)
    }

    setWheel(wheel)

    return () => {
      wheel?.remove()
      setWheel(undefined)
    }
  }, [rouletteProps, rouletteRef])

  useEffect(() => {
    if (rouletteState.spinToPresent != null) {
      wheel.spinToItem(rouletteState.spinToPresent, 10000, true, 20)
    }
  }, [rouletteState.isSpinning])

  return (
    <>
      <div
        className={classNames('w-full select-none', !rouletteState.canSpin && 'cursor-not-allowed')}
      >
        <div
          className={classNames(
            'pb-[100%] relative',
            rouletteState.canSpin && !rouletteState.isSpinning && 'animate-bounce',
            !rouletteState.canSpin && 'pointer-events-none opacity-50'
          )}
        >
          <div className="absolute inset-0" ref={setRouletteRef} />
        </div>
      </div>
      <div className="hidden">
        <img src="/roulette-center.svg" alt="roulette center" ref={setRouletteCenterRef} />
        <img src="/roulette-border.svg" alt="roulette overlay" ref={setRouletteOverlayRef} />
      </div>
    </>
  )
}

export default Roulette
