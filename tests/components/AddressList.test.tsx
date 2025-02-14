import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, describe, it, expect } from 'vitest'
import AddressList from '../../components/AddressList'

describe('AddressList component', () => {
  const mockData = [
    {
      id: 1,
      state: 'NSW',
      postcode: 2000,
      latitude: -33.8688,
      longitude: 151.2093,
      location: 'Sydney',
      category: 'Delivery Area'
    },
    {
      id: 2,
      state: 'VIC',
      postcode: 3000,
      latitude: -37.8136,
      longitude: 144.9631,
      location: 'Melbourne',
      category: 'Urban'
    }
  ]
  it('should render the Address list with the correct data', () => {
    render(<AddressList data={mockData} />)
    expect(screen.getByText(/Address List/i)).toBeInTheDocument()

    mockData.forEach((item) => {
      expect(screen.getByText(`State : ${item.state}`)).toBeInTheDocument()
      expect(screen.getByText(`Postcode : ${item.postcode}`)).toBeInTheDocument()
      expect(screen.getByText(`Latitude : ${item.latitude}`)).toBeInTheDocument()
      expect(screen.getByText(`Longitude : ${item.longitude}`)).toBeInTheDocument()
      expect(screen.getByText(`location : ${item.location}`)).toBeInTheDocument()
      expect(screen.getByText(`Category : ${item.category}`)).toBeInTheDocument()
    })
  })
})
