import { stateSuburbList } from '@/Constant/StateSuburbList'
import { FormValues } from '@/Constant/Types'
import { useState } from 'react'

const useCustomForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    setErrors((prev) => ({ ...prev, [name]: '' }))
    let newErrors: Partial<FormValues> = {}

    if (name === 'state' || name === 'suburb' || name === 'postcode') {
      if (name === 'state' && !stateSuburbList[value]) {
        newErrors.state = 'Invalid state selected'
      }

      if (
        name === 'suburb' &&
        stateSuburbList[values.state] &&
        !stateSuburbList[values.state][value]
      ) {
        newErrors.suburb = `The suburb ${value} does not exist in the state ${values.state}`
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
    if (!values.state.trim()) newErrors.state = 'State is required'
    if (!values.suburb.trim()) {
      newErrors.suburb = 'Suburb is required'
    }
    if (values.postcode === '' || isNaN(Number(values.postcode))) {
      newErrors.postcode = 'Postcode is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setValues(initialValues)
    }, 2000)
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit }
}

export default useCustomForm
