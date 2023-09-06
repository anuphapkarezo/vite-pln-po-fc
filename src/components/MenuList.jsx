import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ViewCompactSharpIcon from '@mui/icons-material/ViewCompactSharp';
import WaterfallChartRoundedIcon from '@mui/icons-material/WaterfallChartRounded';

const MenuList = ({ open }) => {
  return (
    <List>
        <ListItem disablePadding sx={{ display: 'block',color: 'black' }} component={Link} to="/">
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block',color: 'black' }} component={Link} to="/computer-table"> 
        <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Computer master list" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/computer-recover">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary="SE Update status" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/table">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary="SE Receiving PC" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/mui_dense_table">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <AutoAwesomeMotionTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="MUI Dense Table" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/data_grid">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <FileDownloadIcon />
                </ListItemIcon>
                <ListItemText primary="Data Grid ()" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/Search_data_grid">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <ManageSearchTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Search Data Grid ()" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/apex_chart">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <BarChartRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Apex Charts" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/grid_box">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <ViewCompactSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Grid Box ()" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' ,color: 'black'}} component={Link} to="/pln_fc_po">
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    
                }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit', // Set initial color
                                "&:hover": {
                                color: 'primary.main', // Change color on hover
                                }
                    }}
                    >
                    <WaterfallChartRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Planning / Forecast Vs PO" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </List>
  );
}

export default MenuList;
