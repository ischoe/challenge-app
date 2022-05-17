import groupBy from 'lodash.groupby'

export function updateBlockedSlots(existingSlots, newSlot) {
  if(existingSlots.length === 0) {
    return [newSlot] 
  }
  const hasId = existingSlots.some(i => i.id === newSlot.id)
  if(hasId) {
    return [
      ...existingSlots.filter(i => i.id !== newSlot.id),
      newSlot
    ] 
  }
  return [
    ...existingSlots,
    newSlot
  ]
}

function getTranslatedDay(day) {
  switch(day) {
    case 1: {
      return 'Mo'
    }
    case 2: {
      return 'Tue'
    }
    case 3: {
      return 'Wed'
    }
    case 4: {
      return 'Thu'
    }
    case 5: {
      return 'Fri'
    }
    case 6: {
      return 'Sat'
    }
    case 7: {
      return 'Sun'
    }
  }
}

export function groupSlotsByDate(timeSlots) {
  const withDays = timeSlots.map(i => {
    const day = new Date(i.start_time).getDay()
    return {
      day: getTranslatedDay(day),
      start_time: i.start_time,
      end_time: i.end_time
    }
  })
  return groupBy(withDays, 'day')
}

export function isBlockedSlot(blockedSlots, currentSlot, companyId) {
  if(!blockedSlots || blockedSlots.length === 0) {
    return false
  }
  const otherBlockedSlots = blockedSlots
    .filter(slot => slot.id !== companyId)

  const currentStart = new Date(currentSlot.start_time)
  const currentEnd = new Date(currentSlot.end_time)
  
  return otherBlockedSlots.some(slot => {
    const otherSlotStart = new Date(slot.start_time)
    const otherSlotEnd = new Date(slot.end_time)
    return (currentStart >= otherSlotStart && currentStart <= otherSlotEnd) || (otherSlotStart >= currentStart && otherSlotStart <= currentEnd)
  })
}