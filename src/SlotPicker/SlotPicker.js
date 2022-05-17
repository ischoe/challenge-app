import { useState } from 'react'
import { updateBlockedSlots } from './helper'
import Company from './Company/Company'

function SlotPicker({ companies }) {
  const [blockedSlots, setBlockedSlots] = useState([])
  function handleChangeSlot(slot) {
    setBlockedSlots(updateBlockedSlots(blockedSlots, slot))
  }
  if(companies.length === 0) {
    return null
  }
  return (
    <div data-testid="slot-picker">{
      companies.map(company => {
        return (
          <div data-testid="company-column" key={company.id}>
            <Company 
              company={company} 
              changeSlot={handleChangeSlot} 
              blockedSlots={blockedSlots} 
            />
          </div>
        )
      })}
    </div>
  )
}

export default SlotPicker