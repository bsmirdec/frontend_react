import React from 'react'
import { Box, Typography } from '@mui/material'
import Coffrage from './Coffrage.js'

export default function StockTab() {
  return (
    <Box>
      <Box sx={{ paddingBottom: '25px'}}>
        <Typography variant="h6" component="h2">
          Coffrage
        </Typography>
        <Coffrage />
      </Box>
      <Box sx={{ paddingBottom: '25px'}}>
        <Typography variant="h6" component="h2">
          Machine & Outils
        </Typography>
        <Coffrage/>
      </Box>
      <Box sx={{ paddingBottom: '25px'}}>
        <Typography variant="h6" component="h2">
          Consommable
        </Typography>
        <Coffrage />
      </Box>
      <Box sx={{ paddingBottom: '25px'}}>
        <Typography variant="h6" component="h2">
          Sécurité
        </Typography>
        <Coffrage />
      </Box>
    </Box>
  )
}