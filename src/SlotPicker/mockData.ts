export const mockCompany1 = {
  id: 1,
  name: 'A',
  time_slots: [
    {
      start_time: '2018-07-09T08:00:00.000+02:00',
      end_time: '2018-07-09T09:30:00.000+02:00',
    },
    {
      start_time: '2018-07-09T08:30:00.000+02:00',
      end_time: '2018-07-09T10:00:00.000+02:00',
    },
    {
      start_time: '2018-07-09T09:00:00.000+02:00',
      end_time: '2018-07-09T10:30:00.000+02:00',
    },
  ],
}

export const mockCompany2 = {
  id: 2,
  name: 'B',
  time_slots: [],
}

// these slots have one slot for MO, and two for THU
export const multipleDayTimeSlots = [
  {
    start_time: '2018-07-09T08:00:00.000+02:00',
    end_time: '2018-07-09T09:30:00.000+02:00',
  },
  {
    start_time: '2018-08-09T08:30:00.000+02:00',
    end_time: '2018-08-09T10:00:00.000+02:00',
  },
  {
    start_time: '2018-08-09T09:00:00.000+02:00',
    end_time: '2018-08-09T10:30:00.000+02:00',
  },
]

export const companies = [mockCompany1, mockCompany2]
