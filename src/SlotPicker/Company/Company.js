import { useState } from 'react'
import { groupSlotsByDate, isBlockedSlot } from '../helper'
import TimeSlot from '../TimeSlot/TimeSlot'

function CompanyColumn({ company, changeSlot, blockedSlots }) {
  const [selectedSlot, setSelectedSlot] = useState(null)
  function handleClickSlot(slot) {
    setSelectedSlot(slot)
    changeSlot(slot)
  }

  function renderReservation(selectedSlot) {
    const start = new Date(selectedSlot.start_time)
    const end = new Date(selectedSlot.end_time)
    return (
      <div>
        <span>Reservation</span>
        <span data-testid="selected-slot-start">{start.toString()}</span>
        <span data-testid="selected-slot-end">{end.toString()}</span>
      </div>  
    )
  }

  const groupedTimeSlots = groupSlotsByDate(company.time_slots)
  return (
    <>
      <div data-testid="company-name">{company.name}</div>
      <div data-testid="selected-slot">
        {selectedSlot ? renderReservation(selectedSlot) : ''}
      </div>
      <div data-testid="available-slots-wrapper">
        {Object.keys(groupedTimeSlots).map(day => {
          const slots = groupedTimeSlots[day]
          return (
            <div key={company.id + '_' + day}>
              <span data-testid={'available-day'}>{day}</span>
              <>
              {slots.map(timeSlot => {
                const isSelectedSlot = 
                  selectedSlot &&
                  timeSlot.start_time === selectedSlot.start_time && 
                  timeSlot.end_time === selectedSlot.end_time
                const isBlocked = isBlockedSlot(blockedSlots, timeSlot)

                return (
                  <TimeSlot
                    handleClickSlot={handleClickSlot}
                    timeSlot={timeSlot}
                    isSelectedSlot={isSelectedSlot}
                    isBlocked={isBlocked}
                    key={company.id + '_' + timeSlot.start_time + '_' + timeSlot.end_time}
                  />
                )
              })}
              </>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CompanyColumn