import styled from 'styled-components'
import { Box } from 'grommet'
import { isBlockedSlot } from '../helper'
import { TimeSlotType, BockedSlotType } from '../../App.interface'
import SingleTimeSlot from './SingleTimeSlot'

type TimeSlotTypeWithId = TimeSlotType & { id: number }

interface TimeSlotCompnent {
  timeSlot: TimeSlotType
  selectedSlot: TimeSlotType | null
  blockedSlots: BockedSlotType[]
  handleClickSlot: (slot: TimeSlotTypeWithId) => void
  companyId: number
}

const StyledBox = styled(Box)<{ isSelected: boolean; isBlocked: boolean }>`
  color: black;
  background-color: ${(props) =>
    props.isBlocked ? 'grey' : props.isSelected ? 'red' : 'white'};
  cursor: ${(props) => (props.isBlocked ? 'not-allowed' : 'cursor')};
  pointer-events: ${(props) => (props.isBlocked ? 'none' : '')};
`

function getTestId(isSelectedSlot: boolean, isBlocked: boolean) {
  let testId = 'available-slot'
  if (isSelectedSlot) {
    testId += ' selected'
  }
  if (isBlocked) {
    testId += ' blocked'
  }
  return testId
}

function TimeSlot({
  timeSlot,
  selectedSlot,
  blockedSlots,
  handleClickSlot,
  companyId,
}: TimeSlotCompnent) {
  const isSelectedSlot = Boolean(
    selectedSlot &&
      timeSlot.start_time === selectedSlot.start_time &&
      timeSlot.end_time === selectedSlot.end_time
  )
  const isBlocked = isBlockedSlot(blockedSlots, timeSlot, companyId)
  function handleOnClick() {
    if (isBlocked) {
      return
    }
    handleClickSlot({ ...timeSlot, id: companyId })
  }
  return (
    <StyledBox
      pad='xxsmall'
      isSelected={isSelectedSlot}
      isBlocked={isBlocked}
      onClick={handleOnClick}
      data-testid={getTestId(isSelectedSlot, isBlocked)}
    >
      <SingleTimeSlot timeSlot={timeSlot} />
    </StyledBox>
  )
}

export default TimeSlot
