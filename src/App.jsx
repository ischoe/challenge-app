import { useEffect, useState } from 'react'
import { Grommet, Spinner, Box } from 'grommet'

import SlotPicker from './SlotPicker/SlotPicker'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fetch('/data')
        .then((response) => response.json())
        .then(({ data }) => {
          setIsLoading(false)
          setCompanies(data)
        })
    }, 1000)
  }, [])

  return (
    <Grommet plain theme={theme} data-testid='slot-picker-wrapper'>
      {isLoading ? (
        <div data-testid='app-loading'>
          <Box
            justify='center'
            align='center'
            direction='row'
            gap='small'
            pad='small'
          >
            <Spinner />
            Loading...
          </Box>
        </div>
      ) : (
        <div data-testid='app-loaded'>
          <SlotPicker companies={companies} />
        </div>
      )}
    </Grommet>
  )
}

export default App
