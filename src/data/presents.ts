'use server'

export type Present = {
  title: string
}

const Presents: Present[] = [
  { title: 'orange-candle' },
  { title: 'jasmine-candle' },
  { title: 'heart-night-light' },
  { title: 'baymax-night-light' },
  { title: 'lollipop' },
  { title: 'free-parking' },
  { title: 'macaron-key-ring' },
  { title: 'lollipop' },
  { title: 'banana-key-ring' },
  { title: 'banana-key-ring' },
]

export const getPresents = () => Promise.resolve(Presents)
