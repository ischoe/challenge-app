import { Box } from 'grommet'
import { TimeSlotType } from '../../App.interface'
import { getTranslatedDay } from '../helper'
import SingleTimeSlot from '../TimeSlot/SingleTimeSlot'

interface ReservedSlotComponent {
  selectedSlot: TimeSlotType | null
}

function ReservedSlot({ selectedSlot }: ReservedSlotComponent) {
  function renderBoxWrapper(child?: JSX.Element) {
    const color = child ? 'neutral-1' : 'red'
    return (
      <Box
        border={{ color, size: 'large' }}
        pad='medium'
        gap='medium'
        height='xxsmall'
        background={color}
        data-testid='selected-slot'
        align='center'
        justify='center'
      >
        {child}
      </Box>
    )
  }
  if (!selectedSlot) {
    return renderBoxWrapper()
  }
  const day = new Date(selectedSlot.start_time).getDay()
  return renderBoxWrapper(
    <>
      <span>Reservation</span>
      <span>{getTranslatedDay(day)}</span>
      <SingleTimeSlot
        data-testid='selected-slot-time'
        timeSlot={selectedSlot}
      />
    </>
  )
}

export default ReservedSlot
