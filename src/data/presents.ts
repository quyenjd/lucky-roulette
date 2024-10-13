'use server'

export type Present = {
  title: string
}

const Presents: Present[] = [
  { title: 'Orange Candle' },
  { title: 'Jasmine Candle' },
  { title: 'Heart Night Light' },
  { title: 'Bear Night Light' },
  { title: 'Lollipop' },
  { title: 'Free Parking' },
  { title: 'Macaron Key Ring' },
  { title: 'Lollipop' },
  { title: 'Banana Key Ring' },
  { title: 'Banana Key Ring' },
]

export const getPresents = () => Promise.resolve(Presents)
