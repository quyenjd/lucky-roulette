'use server'

export type Present = {
  title: string
}

const Presents: Present[] = [
  { title: 'Orange Candle' },
  { title: 'Jasmine Candle' },
  { title: 'Heart Night Light' },
  { title: 'Bear Night Light' },
  { title: 'Round of Applause' },
  { title: 'Free Parking' },
  { title: 'Macaron Key Ring' },
  { title: 'Handbook' },
  { title: 'Handbook' },
  { title: 'Snack' },
  { title: 'Snack' },
]

export const getPresents = () => Promise.resolve(Presents)
