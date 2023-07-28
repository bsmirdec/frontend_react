import React from 'react';
// import { isUserAdmin } from '../../utils/userUtils';
// Material UI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';
import { useTheme, makeStyles } from '@mui/styles';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  addIcon: {
    color: theme.palette.primary.main
  },
}));

const WorksitesDrawer = (props) => {
  const worksites = props.worksites;
  const onCreateNewWorksite = props.onCreateNewWorksite
  const classes = useStyles();
  console.log(worksites)

  function displayWorksite(worksite_id) {
    const worksitesFilteredActive= worksites.find(
      (worksite) => worksite.worksite_id === worksite_id
    )
    console.log(worksitesFilteredActive)
    if(worksitesFilteredActive) {
      props.setActiveWorksite(worksitesFilteredActive)
    } else {
      props.setActiveWorksite('')
    }
  }

  if (!worksites || worksites.length === 0) 
    return <p>Pas de chantier chargé</p>
    
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', position:'inherit'},
        }}
      >
        <Box sx={{ overflow: 'auto'}}>
          {isUserAdmin && (
            <ListItemButton onClick={onCreateNewWorksite}>
              Créer Nouveau Chantier
            </ListItemButton>
          )}
          <Divider />
          <List>
            {worksites.map((worksite) => (
              <ListItem key={worksite.name} disablePadding>
                <ListItemButton onClick={() => displayWorksite(worksite.worksite_id)}>
                  <ListItemText primary={worksite.city + " - " + worksite.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
    )
}

export default WorksitesDrawer