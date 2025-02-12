'use client'
import React, { useState } from 'react'

function FormUi() {
  const [formData, setFormData] = useState({ postcode: '', suburb: '', state: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { postcode, suburb, state } = formData
    // Log the values in console
    console.log('Postcode:', postcode)
    console.log('Suburb:', suburb)
    console.log('State:', state)
  }
  return (
    <div className="form">
      <div className="form-container">
        <h2>Address Validation Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Postcode:</label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          />

          <label>Suburb:</label>
          <input
            type="text"
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            required
          />

          <label>State:</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="">Select State</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="NSW">NSW</option>
            <option value="WA">WA</option>
          </select>

          <button type="submit">Validate Address</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  )
}

export default FormUi
