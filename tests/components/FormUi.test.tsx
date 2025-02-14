import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FormUi from '../../components/FormUi'
import { describe, expect, it, vi } from 'vitest'

// ✅ Mock useCustomForm to avoid form logic
vi.mock('../../Hooks/useCustomForm', () => ({
  default: () => ({
    values: { state: '', suburb: '', postcode: '' },
    errors: {},
    isSubmitting: false,
    handleChange: vi.fn(),
    serverError: null,
    parsedData: null,
    handleSubmit: vi.fn()
  })
}))
describe('FormUi Component', () => {
  it('renders the main heading', () => {
    render(<FormUi />)
    expect(screen.getByText(/Lawpath Tech Test By Madan/i)).toBeInTheDocument()
  })

  it('renders form inputs', () => {
    render(<FormUi />)
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Suburb/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Postcode/i)).toBeInTheDocument()
  })
})
