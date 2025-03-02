'use client'
import useCustomForm from '../Hooks/useCustomForm'
import { Icon } from '@iconify/react/dist/iconify.js'
import AddressList from './AddressList'
import React, { useRef } from 'react'

function FormUi() {
  const addressListRef = useRef<HTMLDivElement | null>(null)
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    serverError,
    parsedData,
    handleSubmit
  } = useCustomForm(
    {
      state: '',
      suburb: '',
      postcode: ''
    },
    addressListRef
  )

  return (
    <div className="main-container">

      <div className="container">
        <div className="form">
          <div className="form-container">
            <h2>Lawpath Tech Test By Madan</h2>
            <h3>
              <Icon icon="bitcoin-icons:address-book-outline" width="24" height="24" /> Address
              Validation Form
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-container-input">
                <label htmlFor="state">State</label>
                <select id="state" name="state" value={values.state} onChange={handleChange}>
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
                <label htmlFor="suburb">Suburb</label>
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
                <label htmlFor="postcode">Postcode</label>
                <input
                  type="number"
                  name="postcode"
                  placeholder="Postcode"
                  value={values?.postcode}
                  onChange={handleChange}
                />
                {errors.postcode && <p>*{errors.postcode}</p>}
              </div>
              {values.postcode &&
                values.suburb &&
                values.state &&
                Object.keys(errors).length === 0 && (
                  <span className="message">
                    {' '}
                    <Icon icon="mdi:playlist-tick" width="24" height="24" /> The postcode, suburb,
                    and state input are valid.
                  </span>
                )}
              {serverError && <p className="error-message">{serverError?.message}</p>}

              <button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit">
                {isSubmitting ? 'Loading...' : 'Validate Address'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {parsedData && (
        <div ref={addressListRef}>
          <AddressList data={parsedData?.localities} />
        </div>
      )}
    </div>
  )
}

export default FormUi
