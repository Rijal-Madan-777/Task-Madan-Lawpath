export type FormValues = {
  state: string
  suburb: string
  postcode: number | string
}

export type Locality = {
  id: number
  location: string
  postcode: number
  state: string
  latitude: number | null
  longitude: number | null
  category: string
}
