import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
    { title: 'Factory A1'},
    { title: 'Factory K1'},
    { title: 'Factory N1'},
    { title: 'Factory P1'},
];

export default function GridBoxPage() {
    return (
        <React.Fragment>
            {/* <CssBaseline/> */}
            <Container style={{backgroundColor: '#f0f0f0'}} >
            <Box sx={{ height: 600, width: "1200px", margin: "0 auto" }}>

            </Box>
                {/* <Box sx={{ height: 600, width: "100%", margin: "0 auto" }}>
                    <h5 style={{ textAlign: 'center' }}>Grid Box for Test ()</h5>
                    <Grid style={{backgroundColor: '#FDE5EC', margin: 10, border: '1px solid black' ,  height: 275, width: "100%"}} container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={top100Films}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.title}
                                    </li>
                                )}
                                style={{ width: "100%" }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Factory" />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{backgroundColor: '#FFE5AD', margin: 10, border: '1px solid black' ,  height: 275, width: "100%"}} container spacing={2}>
                        <Grid style={{border: '1px solid black' }}  item xs={6} md={3}>
                            <p>Karezo</p>
                        </Grid>
                        <Grid style={{border: '1px solid black' }}  item xs={6} md={3}>
                            <p>Karezo1</p>
                        </Grid>
                        <Grid style={{border: '1px solid black' }}  item xs={6} md={3}>
                            <p>Karezo2</p>
                        </Grid>
                        <Grid style={{border: '1px solid black' }}  item xs={6} md={3}>
                            <p>Karezo3</p>
                        </Grid>
                    </Grid>
                </Box> */}
            </Container>
        </React.Fragment>
    );
}
