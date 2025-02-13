'use client'
import useCustomForm from '@/Hooks/useCustomForm'
import { Icon } from '@iconify/react/dist/iconify.js'

function FormUi() {
  const { values, errors, isSubmitting, handleChange, data, handleSubmit } = useCustomForm({
    state: '',
    suburb: '',
    postcode: ''
  })
  console.log('🚀 ~ FormUi ~ data:', data)

  return (
    <div className="form">
      <div className="form-container">
        <h2>
          Lawpath Tech Test <span> By Madan</span>
        </h2>
        <h3>
          <Icon icon="bitcoin-icons:address-book-outline" width="24" height="24" /> Address
          Validation Form
        </h3>
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

          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Validating...' : 'Validate Address'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormUi
