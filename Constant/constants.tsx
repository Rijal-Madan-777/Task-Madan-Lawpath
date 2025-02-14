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
export const stateSuburbList: Record<string, Record<string, number>> = {
  VIC: {
    Melbourne: 3000,
    'ferntree gully': 3156
  },
  QLD: {
    Brisbane: 4000,
    'noosa heads': 4567
  },
  NSW: {
    Broadway: 2007,
    'surry hills': 2010
  },
  WA: {
    Perth: 6000,
    fremantle: 6163
  },
  SA: {
    adelaide: 5000,
    whyalla: 5600
  },
  TAS: {
    hobart: 7000,
    launceston: 7250
  }
}
