import { render, screen } from '@testing-library/react'
import SlotPicker from './SlotPicker'
import { companies } from './mockData'
const mockCompanies = companies

describe('<SlotPicker />', () => {
  it('should render company columns', () => {
    render(<SlotPicker companies={mockCompanies}/>)
    const companies = screen.getAllByTestId('company-column')
    expect(companies).toHaveLength(2)
  })

  // it('should render company columns', () => {
  //   render(<SlotPicker companies={mockCompanies}/>)
  //   const companies = screen.getAllByTestId('company-column')
  //   expect(companies).toHaveLength(2)
  // })
})

