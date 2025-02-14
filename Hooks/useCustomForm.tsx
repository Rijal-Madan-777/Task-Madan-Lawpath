import { SEARCH_POSTCODE, stateSuburbList } from '../Constant/constants'
import { FormValues } from '../Constant/Types'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

const useCustomForm = (
  initialValues: FormValues,
  addressListRef?: React.RefObject<HTMLDivElement | null>
) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<any>(null)

  const [fetchData, { data, loading, error }] = useMutation(SEARCH_POSTCODE)
  const parsedData = data?.searchPostcode

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    setErrors((prev) => ({ ...prev, [name]: '' }))
    let newErrors: Partial<FormValues> = {}

    if (name === 'state' || name === 'suburb' || name === 'postcode') {
      if (name === 'state' && !stateSuburbList[value]) {
        newErrors.state = 'Invalid state selected'
      }

      if (name === 'suburb') {
        if (
          stateSuburbList[values.state] &&
          !Object.keys(stateSuburbList[values.state]).find(
            (suburb) => suburb.toLowerCase() === value.toLowerCase()
          )
        ) {
          newErrors.suburb = `The suburb ${value} does not exist in the state ${values.state}`
        }
      }

      if (
        name === 'postcode' &&
        stateSuburbList[values.state] &&
        stateSuburbList[values.state][values.suburb] !== Number(value)
      ) {
        newErrors.postcode = `The postcode ${value} does not match the suburb ${values.suburb}`
      }
    }
    setErrors(newErrors)
  }

  const validate = () => {
    let newErrors: Partial<FormValues> = {}
    if (!values.suburb.trim() && (values.postcode === '' || isNaN(Number(values.postcode)))) {
      newErrors.suburb = 'Suburb is required'
      newErrors.postcode = 'Postcode is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    let query = values.postcode !== '' ? values.postcode : values.suburb
    setIsSubmitting(true)
    fetchData({ variables: { q: query, state: values.state } })
      .then(() => {
        setIsSubmitting(false)
        setServerError(null)
        setTimeout(() => {
          if (addressListRef?.current) {
            addressListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      })
      .catch((err) => {
        setServerError(err)
        setIsSubmitting(false)
      })
  }

  return { values, errors, isSubmitting, handleChange, serverError, parsedData, handleSubmit }
}

export default useCustomForm
