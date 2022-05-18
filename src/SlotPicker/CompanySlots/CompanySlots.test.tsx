import { render, screen, fireEvent } from '@testing-library/react'
import CompanySlots, { CompanyComponentProps } from './CompanySlots'
import { mockCompany1, multipleDayTimeSlots } from '../mockData'
const mockCompany = mockCompany1
const mockTimeSlots = multipleDayTimeSlots

describe('<CompanySlots />', () => {
  const defaultProps: CompanyComponentProps = {
    company: mockCompany,
    changeSlot: jest.fn(),
    blockedSlots: [],
  }

  it('should render the Company name', () => {
    render(<CompanySlots {...defaultProps} />)
    const companyName = screen.getByTestId('company-name').textContent
    expect(companyName).toBe(mockCompany.name)
  })

  it('should render the list of available slots', () => {
    render(<CompanySlots {...defaultProps} />)
    const slots = screen.getAllByTestId('available-slot')
    expect(slots.length).toBe(3)
  })

  it('should render a grouped list', () => {
    const props = {
      ...defaultProps,
      company: {
        ...mockCompany,
        time_slots: mockTimeSlots,
      },
    }
    render(<CompanySlots {...props} />)
    const slots = screen.getAllByTestId('available-slot')
    expect(slots.length).toBe(3)

    const days = screen.getAllByTestId('available-day')
    expect(days.length).toBe(2)
  })

  it('should render selected time slot', () => {
    render(<CompanySlots {...defaultProps} />)
    const selectedSlot = screen.getByTestId('selected-slot')
    expect(selectedSlot).toBeInTheDocument()
  })

  it('should render empty selected slot', () => {
    render(<CompanySlots {...defaultProps} />)
    const selectedSlot = screen.getByTestId('selected-slot')
    expect(selectedSlot).toHaveTextContent('')
  })

  it('should call event handler in parent component', () => {
    const changeSlotMock = jest.fn()
    const props = {
      ...defaultProps,
      changeSlot: changeSlotMock,
    }
    render(<CompanySlots {...props} />)
    const slots = screen.getAllByTestId('available-slot')
    fireEvent.click(slots[0])
    expect(changeSlotMock).toBeCalledWith({
      start_time: mockCompany.time_slots[0].start_time,
      end_time: mockCompany.time_slots[0].end_time,
      day: 'Mo',
      id: mockCompany.id,
    })
  })

  it('should have a selected slot', () => {
    render(<CompanySlots {...defaultProps} />)

    const slots = screen.getAllByTestId('available-slot')
    fireEvent.click(slots[1])

    const selectedSlotElement = screen.getByTestId('selected-slot')
    expect(selectedSlotElement).toHaveTextContent('Reservation')

    const selectedStart = screen.getByTestId('selected-slot-time')
    expect(selectedStart).toBeInTheDocument()
  })

  it('should deselected a selected slot', () => {
    render(<CompanySlots {...defaultProps} />)

    const slots = screen.getAllByTestId('available-slot')
    fireEvent.click(slots[1])
    expect(slots[1]).toHaveAttribute('data-testid', 'available-slot selected')
    fireEvent.click(slots[1])
    expect(slots[1]).toHaveAttribute('data-testid', 'available-slot')
  })

  it('should highlight the selected slot', () => {
    render(<CompanySlots {...defaultProps} />)
    const slots = screen.queryAllByTestId('available-slot')
    fireEvent.click(slots[1])

    expect(slots.length).toBe(3)
    expect(slots[1]).toHaveAttribute('data-testid', 'available-slot selected')
  })

  it('should disable selected slot for other company', () => {
    const blockedSlots = [
      {
        id: 2, // slot from other company
        start_time: '2018-07-09T08:00:00.000+02:00',
        end_time: '2018-07-09T08:30:00.000+02:00',
      },
    ]
    const props = {
      ...defaultProps,
      blockedSlots,
    }
    render(<CompanySlots {...props} />)
    const slots = screen.queryAllByTestId('available-slot blocked')
    expect(slots.length).toBe(1)
  })
})
