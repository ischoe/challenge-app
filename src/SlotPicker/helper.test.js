import { 
  updateBlockedSlots, 
  groupSlotsByDate, 
  isBlockedSlot
} from './helper'
import { multipleDayTimeSlots } from './mockData'
const mockTimeSlots = multipleDayTimeSlots

describe('helper functions', () => {
  describe('updateBlockedSlots', () => {
    it('should add a new blocked slot on empty list', () => {
      const newSlot = {
        id: 1,
        start_time: '1',
        end_time: '2'
      }
      const existingSlots = []
      const result = updateBlockedSlots(
        existingSlots, 
        newSlot
      )
      expect(result.length).toBe(1)
      expect(result[0]).toEqual(newSlot)
    })

    it('should add a new blocked slot on existing list', () => {
      const newSlot1 = {
        id: 1,
        start_time: '1',
        end_time: '2'
      }
      const newSlot2 = {
        id: 2,
        start_time: '1',
        end_time: '2'
      }
      const existingSlots = [newSlot1]
      const result = updateBlockedSlots(
        existingSlots, 
        newSlot2
      )
      expect(result.length).toBe(2)
      expect(result[0]).toEqual(newSlot1)
      expect(result[1]).toEqual(newSlot2)
    })

    it('should update existing blocked slot', () => {
      const newSlot = {
        id: 1,
        start_time: '1',
        end_time: '2'
      }
      const updatedSlot = {
        id: 1,
        start_time: '2',
        end_time: '3'
      }
      const existingSlots = [newSlot]
      const result = updateBlockedSlots(
        existingSlots, 
        updatedSlot
      )
      expect(result.length).toBe(1)
      expect(result[0]).toEqual(updatedSlot)
    })
  })

  describe('groupSlotsByDate', () => {
    it('should group slots by date', () => {
      const result = groupSlotsByDate(mockTimeSlots)
      expect(Object.keys(result).length).toBe(2)
      expect(result['Mo'].length).toBe(1)
      expect(result['Thu'].length).toBe(2)
    })
  })

  describe('isBlockedSlot', () => {
    it('should return true for overlapping slot', () => {
      const blockedSlots = [
        {
          id: 2,
          start_time: '2018-07-09T08:00:00.000+02:00',
          end_time: '2018-07-09T08:30:00.000+02:00'
        }
      ]
      const currentSlot = {
        start_time: "2018-07-09T08:00:00.000+02:00",
        end_time: "2018-07-09T09:30:00.000+02:00"
      }
      const result = isBlockedSlot(blockedSlots, currentSlot, 1)
      expect(result).toBe(true)
    })

    it('should return false if the blocked slot is from same company', () => {
      const blockedSlots = [
        {
          id: 1,
          start_time: '2018-07-09T08:00:00.000+02:00',
          end_time: '2018-07-09T08:30:00.000+02:00'
        }
      ]
      const currentSlot = {
        start_time: "2018-07-09T08:00:00.000+02:00",
        end_time: "2018-07-09T09:30:00.000+02:00"
      }
      const result = isBlockedSlot(blockedSlots, currentSlot, 1)
      expect(result).toBe(false)
    })

    it('should return false if the blocked slot is not overlapping', () => {
      const blockedSlots = [
        {
          id: 2,
          start_time: '2018-07-09T08:00:00.000+02:00',
          end_time: '2018-07-09T08:30:00.000+02:00'
        }
      ]
      const currentSlot = {
        start_time: "2018-07-09T09:00:00.000+02:00",
        end_time: "2018-07-09T09:30:00.000+02:00"
      }
      const result = isBlockedSlot(blockedSlots, currentSlot, 1)
      expect(result).toBe(false)
    })
  })
})