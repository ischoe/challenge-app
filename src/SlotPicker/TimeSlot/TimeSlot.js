function TimeSlot({ 
  timeSlot, 
  isSelectedSlot, 
  isBlocked, 
  handleClickSlot
}) {
  function getSlotClass(isSelected, isBlocked) {
    return isSelected ? 'selected-slot' : isBlocked ? 'blocked-slot' : 'available-slot'
  }
  return (
      <div 
        onClick={() => handleClickSlot(timeSlot)}
        className={getSlotClass(isSelectedSlot, isBlocked)}
        data-testid={'available-slot'}
      >
        <span>earliest: {timeSlot.start_time}</span>
        <span>latest: {timeSlot.end_time}</span>
      </div>
    )
}

export default TimeSlot