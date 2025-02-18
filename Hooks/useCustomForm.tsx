import { postcodeData, SEARCH_POSTCODE, stateSuburbList, suburbData } from '../Constant/constants'
import { FormValues } from '../Constant/Types'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

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

    const state = name === 'state' ? value : values.state
    const suburb = name === 'suburb' ? value.toLowerCase() : values.suburb?.toLowerCase()
    const postcode = name === 'postcode' ? Number(value) : Number(values.postcode)

    if (name === 'state' && !stateSuburbList[state]) {
      newErrors.state = 'Invalid state selected'
    }

    if (state && suburb) {
      if (suburbData[suburb]?.state !== state) {
        newErrors.state = `The state ${state} does not contain the suburb ${suburb}`
      }
      if (postcode && postcodeData[postcode]?.suburb !== suburb) {
        newErrors.postcode = `The postcode ${postcode} does not exist in the suburb ${suburb}`
      }
    }

    if (state && postcode) {
      if (postcodeData[postcode]?.state !== state) {
        newErrors.state = `The state ${state} does not contain the postcode ${postcode}`
      }
    }

    if (suburb && state) {
      const isValidSuburb = stateSuburbList[state]?.some((item) => item.suburb === suburb)
      if (!isValidSuburb) {
        newErrors.suburb = `The suburb ${suburb} does not exist in the state ${state}`
      }
    }

    if (postcode && suburb) {
      if (suburbData[suburb]?.postcode !== postcode) {
        newErrors.suburb = `The suburb ${suburb} does not contain the postcode ${postcode}`
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

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    serverError,
    parsedData,
    handleSubmit
  }
}

export default useCustomForm
