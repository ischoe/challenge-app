import groupBy from 'lodash.groupby'
import { BockedSlotType, TimeSlotType } from '../App.interface'

export function updateBlockedSlots(
  existingSlots: BockedSlotType[],
  newSlot: BockedSlotType
) {
  if (existingSlots.length === 0) {
    return [newSlot]
  }
  const existingSlot = existingSlots.find((i) => i.id === newSlot.id)
  if (existingSlot) {
    if (
      newSlot.end_time === existingSlot.end_time &&
      newSlot.start_time === existingSlot.start_time
    ) {
      return [...existingSlots.filter((i) => i.id !== newSlot.id)]
    }
    return [...existingSlots.filter((i) => i.id !== newSlot.id), newSlot]
  }
  return [...existingSlots, newSlot]
}

export function getTranslatedDay(day: number) {
  switch (day) {
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

export function groupSlotsByDate(timeSlots: TimeSlotType[]) {
  const withDays = timeSlots.map((i) => {
    const day = new Date(i.start_time).getDay()
    return {
      day: getTranslatedDay(day),
      start_time: i.start_time,
      end_time: i.end_time,
    }
  })
  return groupBy(withDays, 'day')
}

export function isBlockedSlot(
  blockedSlots: BockedSlotType[],
  currentSlot: TimeSlotType,
  companyId: number
) {
  if (!blockedSlots || blockedSlots.length === 0) {
    return false
  }
  const otherBlockedSlots = blockedSlots.filter((slot) => slot.id !== companyId)

  const currentStart = new Date(currentSlot.start_time)
  const currentEnd = new Date(currentSlot.end_time)

  return otherBlockedSlots.some((slot) => {
    const otherSlotStart = new Date(slot.start_time)
    const otherSlotEnd = new Date(slot.end_time)
    return currentEnd > otherSlotStart && currentStart < otherSlotEnd
  })
}

export function parseDate(dateString: string) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
}
