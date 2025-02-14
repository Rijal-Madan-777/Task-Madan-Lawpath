import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import FormUi from '../../components/FormUi'

// Mock the useMutation hook from @apollo/client
vi.mock('@apollo/client', () => ({
  ...vi.importActual('@apollo/client'), // Retain the actual Apollo Client functionality
  useMutation: vi.fn(), // Mock the useMutation hook
  gql: vi.fn(), // Mock gql to avoid execution of queries
}))

const mockData = {
  data: {
    searchPostcode: {
      localities: [
        {
          id: '1',
          state: 'NSW',
          postcode: '2000',
          latitude: '34.05',
          longitude: '118.25',
          location: 'Sydney',
          category: 'Urban',
        },
      ],
    },
  },
}

// Mock the useMutation hook to return the expected values
vi.mock('@apollo/client', () => ({
  ...vi.importActual('@apollo/client'),
  useMutation: vi.fn().mockReturnValue([
    () => {}, // Mock mutation function
    { data: mockData.data, loading: false, error: null }, // Mock response structure
  ]),
}))

describe('FormUi Component', () => {
  it('renders the FormUi component correctly', () => {
    render(<FormUi />)

    // Ensure the form elements are rendered correctly
    expect(screen.getByLabelText('State')).toBeInTheDocument()
    expect(screen.getByLabelText('Suburb')).toBeInTheDocument()
    expect(screen.getByLabelText('Postcode')).toBeInTheDocument()
  })

  it('handles form submission and displays validation message', async () => {
    render(<FormUi />)

    // Simulate user input for form fields
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'NSW' } })
    fireEvent.change(screen.getByLabelText('Suburb'), { target: { value: 'Sydney' } })
    fireEvent.change(screen.getByLabelText('Postcode'), { target: { value: '2000' } })

    // Submit the form
    fireEvent.submit(screen.getByRole('form'))

    // Check if the success message is displayed after form submission
    expect(screen.getByText('The postcode, suburb, and state input are valid.')).toBeInTheDocument()
  })
})
