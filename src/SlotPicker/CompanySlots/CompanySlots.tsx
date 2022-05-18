import { useState } from 'react'
import { Box } from 'grommet'
import { groupSlotsByDate } from '../helper'
import { CompanyProps, TimeSlotType, BockedSlotType } from '../../App.interface'
import TimeSlot from '../TimeSlot/TimeSlot'
import ReservedSlot from '../ReservedSlot/ReservedSlot'

export interface CompanyComponentProps {
  company: CompanyProps
  changeSlot: (slot: TimeSlotType) => void
  blockedSlots: BockedSlotType[]
}

function CompanySlots({
  company,
  changeSlot,
  blockedSlots,
}: CompanyComponentProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null)
  function handleClickSlot(slot: TimeSlotType) {
    if (JSON.stringify(selectedSlot) === JSON.stringify(slot)) {
      setSelectedSlot(null)
    } else {
      setSelectedSlot(slot)
    }
    changeSlot(slot)
  }

  const groupedTimeSlots = groupSlotsByDate(company.time_slots)
  return (
    <>
      <div data-testid='company-name'>{company.name}</div>
      <ReservedSlot selectedSlot={selectedSlot} />
      <div data-testid='available-slots-wrapper'>
        {Object.keys(groupedTimeSlots).map((day) => {
          const slots = groupedTimeSlots[day]
          return (
            <Box key={`${company.id}_${day}`}>
              <Box pad='small' align='center' data-testid={'available-day'}>
                {day}
              </Box>
              {slots.map((timeSlot: TimeSlotType) => {
                const timeSlotKey = `${company.id}_${timeSlot.start_time}_${timeSlot.end_time}`
                return (
                  <TimeSlot
                    handleClickSlot={handleClickSlot}
                    companyId={company.id}
                    timeSlot={timeSlot}
                    selectedSlot={selectedSlot}
                    blockedSlots={blockedSlots}
                    key={timeSlotKey}
                  />
                )
              })}
            </Box>
          )
        })}
      </div>
    </>
  )
}

export default CompanySlots
