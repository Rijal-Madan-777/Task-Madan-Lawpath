import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../app/page' // Import the Home component
import { describe, it } from 'vitest'

describe('Home Component', () => {
  it('renders without crashing the app', () => {
    render(<Home />)
  })
})
