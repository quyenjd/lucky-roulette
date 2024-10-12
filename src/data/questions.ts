'use server'

export type Question = {
  title: string
  answers: Array<{
    isCorrect: boolean
    text: string
  }>
}

const Questions: Question[] = [
  {
    title: 'An exclusive 20-year right to manufacture a product or use a process is',
    answers: [
      { isCorrect: false, text: 'Franchise' },
      { isCorrect: true, text: 'Patent' },
      { isCorrect: false, text: 'Trademark' },
      { isCorrect: false, text: 'Copyright' },
    ],
  },
  {
    title: 'Goodwill is',
    answers: [
      {
        isCorrect: true,
        text: 'The excess of the fair value of a business over the fair value of all net identifiable assets',
      },
      { isCorrect: false, text: 'Only recorded by the seller of a business' },
      { isCorrect: false, text: 'Amortized over the greater of its estimated life or forty years' },
      { isCorrect: false, text: 'None of the above' },
    ],
  },
  {
    title: 'The legal life of a patent is generally',
    answers: [
      { isCorrect: true, text: 'Twenty years' },
      { isCorrect: false, text: 'Forty years' },
      { isCorrect: false, text: 'Indefinite' },
      { isCorrect: false, text: 'Life of the inventor plus fifty years' },
    ],
  },
  {
    title: 'Under International Financial Reporting Standards, research expenditures are',
    answers: [
      { isCorrect: true, text: 'Expensed in the period incurred' },
      { isCorrect: false, text: 'Expensed in the period they are determined to be unsuccessful' },
      { isCorrect: false, text: 'Capitalized if certain criteria are met' },
      { isCorrect: false, text: 'Expensed if unsuccessful, capitalized if successful' },
    ],
  },
  {
    title:
      'If an intangible asset is revalued upwards, the increase in value should be credited ...',
    answers: [
      { isCorrect: false, text: 'in profit or loss' },
      { isCorrect: true, text: 'to equity under "revaluation surplus"' },
      { isCorrect: false, text: 'OCI' },
      { isCorrect: false, text: 'None of the above' },
    ],
  },
  {
    title: 'After initial recognition, an intangible asset shall be measured using',
    answers: [
      { isCorrect: false, text: 'Cost model' },
      { isCorrect: false, text: 'Revaluation model' },
      { isCorrect: false, text: 'Cost model or fair value model' },
      { isCorrect: true, text: 'Cost model or revaluation model' },
    ],
  },
  {
    title: 'Goodwill shall be recognized only when',
    answers: [
      { isCorrect: false, text: 'It is purchased from another entity' },
      {
        isCorrect: false,
        text: 'It can be established that a definite benefit or advantage has resulted to an entity from some item such as good name, capable staff or reputation',
      },
      { isCorrect: true, text: 'It is acquired through the purchase of another business entity' },
      {
        isCorrect: false,
        text: 'An entity reports super normal earnings for five or more consecutive year',
      },
    ],
  },
  {
    title: 'Goodwill shall be tested for impairment',
    answers: [
      { isCorrect: false, text: 'If there is an indication of impairment' },
      { isCorrect: true, text: 'Annually' },
      { isCorrect: false, text: 'Every five years' },
      { isCorrect: false, text: 'On the acquisition of a subsidiary' },
    ],
  },
  {
    title:
      'Which intangible asset should be reported as a separate line item in the statement of financial position?',
    answers: [
      { isCorrect: true, text: 'Goodwill' },
      { isCorrect: false, text: 'Franchise' },
      { isCorrect: false, text: 'Trademark' },
      { isCorrect: false, text: 'Patent' },
    ],
  },
  {
    title: 'An entity may use the revaluation model for an intangible asset only when',
    answers: [
      {
        isCorrect: false,
        text: 'The useful life of the intangible asset can be reliably determined',
      },
      { isCorrect: true, text: 'An active market exists for the intangible asset' },
      { isCorrect: false, text: 'The cost of the intangible asset can be measured reliably' },
      { isCorrect: false, text: 'The intangible asset is a monetary asset' },
    ],
  },
]

export const getQuestions = () => Promise.resolve(Questions)
