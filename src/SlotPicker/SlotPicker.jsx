import { useState } from 'react'
import { Grid, Box } from 'grommet'
import { updateBlockedSlots } from './helper'
import CompanySlots from './CompanySlots/CompanySlots'

function SlotPicker({ companies }) {
  const [blockedSlots, setBlockedSlots] = useState([])
  function handleChangeSlot(slot) {
    setBlockedSlots(updateBlockedSlots(blockedSlots, slot))
  }
  return companies.length === 0 ? null : (
    <Grid
      columns={{
        count: 3,
        size: 'auto',
      }}
      gap='small'
      data-testid='slot-picker'
    >
      {companies.map((company) => {
        return (
          <Box
            gap='small'
            pad='small'
            align='center'
            data-testid='company-column'
            key={company.id}
            background='light-5'
          >
            <CompanySlots
              company={company}
              changeSlot={handleChangeSlot}
              blockedSlots={blockedSlots}
            />
          </Box>
        )
      })}
    </Grid>
  )
}

export default SlotPicker
