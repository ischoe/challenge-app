import { useEffect, useState } from 'react'
import SlotPicker from './SlotPicker/SlotPicker'
function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fetch('/data')
        .then(response => response.json())
        .then(({ data }) => {
          setIsLoading(false)
          setCompanies(data)
        })
    }, 1000)
  }, [])
  
  return (
    <div data-testid="slot-picker-wrapper">
      {isLoading ? 
        <div data-testid="app-loading"></div> : 
        <div data-testid="app-loaded">
          <SlotPicker companies={companies}/>
        </div>
      }
    </div>
  )
}

export default App
