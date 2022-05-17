import { render, screen, fireEvent } from '@testing-library/react'
import Company from './Company'
import { mockCompany1, multipleDayTimeSlots } from '../mockData'
const mockCompany = mockCompany1
const mockTimeSlots = multipleDayTimeSlots

describe('<Company />', () => {
  it('should render the Company name', () => {
    render(<Company company={mockCompany}/>)
    const companyName = screen.getByTestId('company-name').textContent
    expect(companyName).toBe(mockCompany.name)
  })

  it('should render the list of available slots', () => {
    render(<Company company={mockCompany}/>)
    const slots = screen.getAllByTestId('available-slot')
    expect(slots.length).toBe(3)
  })

  it('should render a grouped list', () => {
    const mockCompanyWith2DaySlots = {
      ...mockCompany,
      time_slots: mockTimeSlots
    }
    render(<Company company={mockCompanyWith2DaySlots}/>)
    const slots = screen.getAllByTestId('available-slot')
    expect(slots.length).toBe(3)

    const days = screen.getAllByTestId('available-day')
    expect(days.length).toBe(2)
  })

  it('should render selected time slot', () => {
    render(<Company company={mockCompany}/>)
    const selectedSlot = screen.getByTestId('selected-slot')
    expect(selectedSlot).toBeInTheDocument()
  })

  it('should render empty selected slot', () => {
    render(<Company company={mockCompany}/>)
    const selectedSlot = screen.getByTestId('selected-slot')
    expect(selectedSlot).toHaveTextContent('')
  })

  it('should call event handler in parent component', () => {
    const changeSlot = jest.fn()
    render(<Company company={mockCompany} changeSlot={changeSlot}/>)
    const slots = screen.getAllByTestId('available-slot')
    fireEvent.click(slots[0])
    expect(changeSlot).toBeCalled()
  })

  it('should have a selected slot', () => {
    render(<Company company={mockCompany} changeSlot={() => {}}/>)
    
    const slots = screen.getAllByTestId('available-slot')
    fireEvent.click(slots[1])

    const selectedSlotElement = screen.getByTestId('selected-slot')
    expect(selectedSlotElement).toHaveTextContent('Reservation')
    
    const selectedStart = screen.getByTestId('selected-slot-start')
    expect(selectedStart).toBeInTheDocument()

    const selectedEnd = screen.getByTestId('selected-slot-end')
    expect(selectedEnd).toBeInTheDocument()
  })

  it('should highlight the selected slot', () => {
    render(<Company company={mockCompany} changeSlot={() => {}} />)
    const slots = screen.getAllByTestId('available-slot')
    fireEvent.click(slots[1])

    expect(slots.length).toBe(3)
    expect(slots[1]).toHaveAttribute('class', 'selected-slot')
  })

  it('should disable selected slot for other company', () => {
    const blockedSlots = [
      {
        id: 2, // slot from other company
        start_time: '2018-07-09T08:00:00.000+02:00',
        end_time: '2018-07-09T08:30:00.000+02:00'
      }
    ]
    render(<Company company={mockCompany} blockedSlots={blockedSlots} />)
    const slots = screen.getAllByTestId('available-slot')
    expect(slots[0]).toHaveAttribute('class', 'blocked-slot')
    expect(slots[1]).toHaveAttribute('class', 'blocked-slot')
    expect(slots[2]).not.toHaveAttribute('class', 'blocked-slot')
  })
})

