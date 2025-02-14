import { gql } from '@apollo/client'

export const SEARCH_POSTCODE = gql`
  mutation SearchPostcode($q: String!, $state: String!) {
    searchPostcode(q: $q, state: $state) {
      localities {
        id
        location
        postcode
        state
        latitude
        longitude
        category
      }
    }
  }
`
export const stateSuburbList: Record<string, { suburb: string; postcode: number }[]> = {
  VIC: [
    { suburb: 'melbourne', postcode: 3000 },
    { suburb: 'ferntree gully', postcode: 3156 }
  ],
  QLD: [
    { suburb: 'brisbane', postcode: 4000 },
    { suburb: 'noosa heads', postcode: 4567 }
  ],
  NSW: [
    { suburb: 'broadway', postcode: 2007 },
    { suburb: 'surry hills', postcode: 2010 }
  ],
  WA: [
    { suburb: 'perth', postcode: 6000 },
    { suburb: 'fremantle', postcode: 6163 }
  ],
  SA: [
    { suburb: 'adelaide', postcode: 5000 },
    { suburb: 'whyalla', postcode: 5600 }
  ],
  TAS: [
    { suburb: 'hobart', postcode: 7000 },
    { suburb: 'launceston', postcode: 7250 }
  ]
}
export const suburbData: Record<string, { state: string; postcode: number }> = {
  melbourne: { state: 'VIC', postcode: 3000 },
  'ferntree gully': { state: 'VIC', postcode: 3156 },
  brisbane: { state: 'QLD', postcode: 4000 },
  'noosa heads': { state: 'QLD', postcode: 4567 },
  broadway: { state: 'NSW', postcode: 2007 },
  'surry hills': { state: 'NSW', postcode: 2010 },
  perth: { state: 'WA', postcode: 6000 },
  fremantle: { state: 'WA', postcode: 6163 },
  adelaide: { state: 'SA', postcode: 5000 },
  whyalla: { state: 'SA', postcode: 5600 },
  hobart: { state: 'TAS', postcode: 7000 },
  launceston: { state: 'TAS', postcode: 7250 }
}
export const postcodeData: Record<number, { state: string; suburb: string }> = {
  3000: { state: 'VIC', suburb: 'melbourne' },
  3156: { state: 'VIC', suburb: 'ferntree gully' },
  4000: { state: 'QLD', suburb: 'brisbane' },
  4567: { state: 'QLD', suburb: 'noosa heads' },
  2007: { state: 'NSW', suburb: 'Broadway' },
  2010: { state: 'NSW', suburb: 'surry hills' },
  6000: { state: 'WA', suburb: 'perth' },
  6163: { state: 'WA', suburb: 'fremantle' },
  5000: { state: 'SA', suburb: 'adelaide' },
  5600: { state: 'SA', suburb: 'whyalla' },
  7000: { state: 'TAS', suburb: 'hobart' },
  7250: { state: 'TAS', suburb: 'launceston' }
}
