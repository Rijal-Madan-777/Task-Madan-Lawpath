'use client'
import useCustomForm from '@/Hooks/useCustomForm'
import React, { useState } from 'react'

function FormUi() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useCustomForm({
    state: '',
    suburb: '',
    postcode: ''
  })
  console.log('🚀 ~ FormUi ~ values:', values)

  const [message, setMessage] = useState('')

  // Valid postcode-suburb-state data
  const validAddresses = [
    { state: 'VIC', suburb: 'Melbourne', postcode: '3000' },
    { state: 'VIC', suburb: 'Ferntree Gully', postcode: '3156' },
    { state: 'QLD', suburb: 'Brisbane', postcode: '4000' },
    { state: 'QLD', suburb: 'Noosa Heads', postcode: '4567' },
    { state: 'NSW', suburb: 'Broadway', postcode: '2007' },
    { state: 'NSW', suburb: 'Surry Hills', postcode: '2010' },
    { state: 'WA', suburb: 'Perth', postcode: '6000' }
  ]

  return (
    <div className="form">
      <div className="form-container">
        <h2>
          Lawpath Tech Test <span> By Madan</span>
        </h2>
        <h3>Address Validation Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-container-input">
            <label>*State</label>
            <select name="state" value={values.state} onChange={handleChange}>
              <option value="">Select State</option>
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="WA">WA</option>
              <option value="SA">SA</option>
              <option value="TAS">TAS</option>
            </select>
            {errors.state && <p>*{errors.state}</p>}
          </div>
          <div className="form-container-input">
            <label>*Suburb</label>
            <input
              type="text"
              name="suburb"
              placeholder="Suburb"
              value={values.suburb}
              onChange={handleChange}
            />
            {errors.suburb && <p>*{errors.suburb}</p>}
          </div>

          <div className="form-container-input">
            <label>*Postcode</label>
            <input
              type="number"
              name="postcode"
              placeholder="Postcode"
              value={values?.postcode}
              onChange={handleChange}
            />
            {errors.postcode && <p>*{errors.postcode}</p>}
          </div>

          <button type="submit">Validate Address</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  )
}

export default FormUi
