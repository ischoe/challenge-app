import { render, screen, act } from '@testing-library/react'
import App from './App'
import { companies } from './SlotPicker/mockData'
const mockCompanies = companies

describe('<App />', () => {
  jest.spyOn(global, 'setTimeout')

  it('should render the slot picker', () => {
    render(<App />)
    const appLoadingWrapper = screen.getByTestId('app-loading')
    expect(appLoadingWrapper).toBeInTheDocument()

    const appLoadedWrapper = screen.queryByTestId('app-loaded')
    expect(appLoadedWrapper).not.toBeInTheDocument()
  })

  it('should fetch data', async () => {
    jest.useFakeTimers()
    const mockedData = {
      data: mockCompanies,
    }
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      })
    ) as jest.Mock

    await act(async () => {
      render(<App />)
    })

    await act(async () => {
      jest.advanceTimersByTime(1000)
    })

    const appLoadingWrapper = screen.queryByTestId('app-loading')
    expect(appLoadingWrapper).not.toBeInTheDocument()

    const appLoadedWrapper = screen.getByTestId('app-loaded')
    expect(appLoadedWrapper).toBeInTheDocument()

    const slotPickerWrapper = screen.getByTestId('slot-picker-wrapper')
    expect(slotPickerWrapper).toBeInTheDocument()

    global.fetch.mockRestore()
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
})
