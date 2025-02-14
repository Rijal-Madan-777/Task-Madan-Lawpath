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
  const [isShowInfo, setIsShowInfo] = useState<boolean>(true)

  const [fetchData, { data, loading, error }] = useMutation(SEARCH_POSTCODE)
  const parsedData = data?.searchPostcode

  useEffect(() => {
    setTimeout(() => {
      setIsShowInfo(false)
    }, 5000)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    setErrors((prev) => ({ ...prev, [name]: '' }))
    let newErrors: Partial<FormValues> = {}

    if (name === 'state' || name === 'suburb' || name === 'postcode') {
      if (name === 'state' && !stateSuburbList[value]) {
        newErrors.state = 'Invalid state selected'
      }

      if (name === 'state' && values.suburb) {
        if (suburbData[values.suburb.toLocaleLowerCase()].state === value) {
          delete newErrors.state
        } else {
          newErrors.state = `The state ${value} does not contain in the suburb ${values.suburb}`
        }
      } else if (name === 'state' && values.postcode) {
        if (postcodeData[Number(values.postcode)].state === value) {
          delete newErrors.state
        } else {
          newErrors.state = `The state ${value} does not contain the postcode ${values.postcode}`
        }
      }

      if (name === 'suburb' && values.state) {
        if (
          stateSuburbList[values.state].find((item) => item.suburb === value.toLocaleLowerCase())
        ) {
          delete newErrors.suburb
        } else {
          newErrors.suburb = `The suburb ${value} does not exist in the state ${values.state}`
        }
      } else if (name === 'suburb' && values.postcode) {
        if (postcodeData[Number(values.postcode)].suburb === value.toLowerCase()) {
          delete newErrors.suburb
        } else {
          newErrors.suburb = `The suburb ${value} does not contain the postcode ${values.postcode}`
        }
      }
      if (name === 'postcode' && values.state) {
        if (
          stateSuburbList[values.state] &&
          stateSuburbList[values.state].find((item) => item.postcode === Number(value))
        ) {
          delete newErrors.postcode
        } else {
          newErrors.postcode = `The postcode ${value} does not exist in the state ${values.state}`
        }
      } else if (name === 'postcode' && values.suburb) {
        if (suburbData[values.suburb.toLowerCase()].postcode === Number(value)) {
          delete newErrors.postcode
        } else {
          newErrors.postcode = `The postcode ${value} does not exist in the suburb ${values.suburb}`
        }
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
    isShowInfo,
    handleChange,
    serverError,
    parsedData,
    handleSubmit
  }
}

export default useCustomForm
