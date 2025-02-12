import { useState } from 'react'

type FormValues = {
  state: string
  suburb: string
  postcode: number | string
}
const stateSuburbList: Record<string, Record<string, number>> = {
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

const useCustomForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
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

  // Validate form fields
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate an API call
    setTimeout(() => {
      console.log('Form submitted:', values)
      setIsSubmitting(false)
      setValues(initialValues) // Reset form after submission
    }, 2000)
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit }
}

export default useCustomForm
