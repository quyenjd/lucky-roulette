'use server'

export type Present = {
  title: string
}

const Presents: Present[] = [
  { title: 'Milk tea' },
  { title: 'Free parking' },
  { title: 'Key ring' },
  { title: 'Candy' },
  { title: 'Snack' },
  { title: 'Milk tea' },
  { title: 'Free parking' },
  { title: 'Key ring' },
  { title: 'Candy' },
  { title: 'Snack' }
]

export const getPresents = () => Promise.resolve(Presents)
