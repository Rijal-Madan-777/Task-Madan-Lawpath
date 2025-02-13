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
      }
    }
  }
`
export const stateSuburbList: Record<string, Record<string, number>> = {
  VIC: {
    Melbourne: 3000,
    FerntreeGully: 3156
  },
  QLD: {
    Brisbane: 4000,
    NoosaHeads: 4567
  },
  NSW: {
    Broadway: 2007,
    SurryHills: 2010
  },
  WA: {
    Perth: 6000,
    Fremantle: 6163
  },
  SA: {
    Adelaide: 5000,
    Whyalla: 5600
  },
  TAS: {
    Hobart: 7000,
    Launceston: 7250
  }
}
