export type TimeSlotType = {
  start_time: string
  end_time: string
}

export type BockedSlotType = {
  id: number
  start_time: string
  end_time: string
}

export type CompanyProps = {
  id: number
  name: string
  time_slots: TimeSlotType[]
}
