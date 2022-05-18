import { parseDate } from '../helper'
import { TimeSlotType } from '../../App.interface'

interface SingleTimeSlotProps {
  timeSlot: TimeSlotType
}

function SingleTimeSlot({ timeSlot, ...props }: SingleTimeSlotProps) {
  return (
    <span {...props}>
      {parseDate(timeSlot.start_time)} - {parseDate(timeSlot.end_time)}
    </span>
  )
}

export default SingleTimeSlot
