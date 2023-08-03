import React from "react";
import { useState } from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import { useTheme } from '@emotion/react';

import StockTab from './stock/StockTab';
import BennesTab from './BennesTab';
import PersonnelTab from './PersonnelTab';
import QseTab from './QseTab';

const Worksite = (props) => {
    const {worksite} = props
    const [selectedTab, setSelectedTab] = useState(0);
    const theme= useTheme();

    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
    };  
    
    if (!worksite || worksite.length === 0) return <p>Aucun chantier sélectionné</p>

    
    return (
      <div maxWidth="lg">
        <Box maxWidth="lg">
          <AppBar position="static" style={{backgroundColor: theme.palette.secondary.light}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                {worksite.city} - {worksite.name}
              </Typography>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Stock" value={0} sx={{ color: 'white' }}/>
                <Tab label="Bennes" value={1} sx={{ color: 'white' }}/>
                <Tab label="Personnel" value={2} sx={{ color: 'white' }}/>
                <Tab label="QSE" value={3} sx={{ color: 'white' }}/>
              </Tabs>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ p: 2 }}>
        {selectedTab === 0 && (
          <div style={{ width: '100%' }}>
            <StockTab />
          </div>
        )}
        {selectedTab === 1 && (
          <div>
            <Typography variant="h6" component="h2">
              Bennes
            </Typography>
            <BennesTab />
          </div>
        )}
        {selectedTab === 2 && (
          <div>
            <Typography variant="h6" component="h2">
              Personnel
            </Typography>
            <PersonnelTab />
          </div>
        )}
        {selectedTab === 3 && (
          <div>
            <Typography variant="h6" component="h2">
              QSE
            </Typography>
            <QseTab />
          </div>
        )}
      </Box>
      </div>
    );
}

export default Worksite