import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { format } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
// import { useState , useEffect } from 'react';


function SearchApexChartFacDep({ onSearch }) {
    const [error , setError] = useState(null);

    //Set Dropdown List
    const [selectedFactory, setSelectedFactory] = useState({ factory: "All" });
    const [selectedDepartment, setSelectedDepartment] = useState({ department: "All" });

    //Set Parameter from API
    const [distinctFactory, setDistinctFactory] = useState([]);
    const [distinctDepartment, setDistinctDepartment] = useState([]);


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const fetchFactory = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:3002/api/factorylist");
          const dataFactory = response.data;
          setDistinctFactory(dataFactory);
        } catch (error) {
          console.error(`Error fetching distinct factories: ${error}`);
        }
    };
    const fetchDepartment = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3002/api/factory-filter-deparment?factorySelect=${selectedFactory.factory}`); //รับค่าเป็น json ต้องใส่ key เพื่อดึงไปใช้งานใน API
            const datatDepartment = response.data;
            setDistinctDepartment(datatDepartment);
        } catch (error) {
            console.error(`Error fetching distinct Departments: ${error}`);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    //สร้าง Function selection change
    const handleFactoryChange = (event, newValue) => {
        console.log(newValue);
        setSelectedFactory(newValue);
    }
    const handleDepartmentChange = (event, newValue) => {
        console.log(newValue);
        setSelectedDepartment(newValue);
    }

    const handleSearch = () => {
        // console.log("Button search",selectedFactory.factory,selectedUserUpdateBy.user_update_by);
        const queryParams = {
          factory: selectedFactory.factory,
          department: selectedDepartment.department,
        };
        onSearch(queryParams); // Invoke the callback function with the selected values
    };

    useEffect(() => {
        fetchFactory();

        if (selectedFactory && selectedFactory.factory) {
            fetchDepartment();
        }
    }, [selectedFactory , selectedDepartment ]);

    return (
        <React.Fragment>
        {/* <CssBaseline /> */}
            <Container maxWidth="xl">
                <Box maxWidth="xl" sx={{ height: 150, width: "100%" }}>
                {/* row 1
                */}
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            // options={distinctFactory}
                            options={[{ factory: "All" }, ...distinctFactory]}
                            getOptionLabel={(option) => option && option.factory}
                            value={selectedFactory}
                            onChange={handleFactoryChange}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Factory" />}
                            isOptionEqualToValue={(option, value) =>
                                option && value && option.factory === value.factory
                            }
                        />
                    </Grid>

                    <Grid item xs={2} md={1.5}>
                        
                    </Grid>

                    <Grid item xs={3} md={3}>
                       <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            // options={distinctDepartment}
                            options={[{ department: "All" }, ...distinctDepartment]}
                            getOptionLabel={(option) => option && option.department}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Department" />}
                            isOptionEqualToValue={(option, value) =>
                                option && value && option.department === value.department
                            }
                        />
                    </Grid>    
                </Grid>

                {/* row 2 */}
                <Grid container spacing={2}>
                    {/* <Grid item xs={3} md={3}>
                        
                    </Grid>

                    <Grid item xs={3} md={3}>
                        
        
                    </Grid> */}
                    <Grid item xs={3} md={3}>
                        <Button 
                            variant="contained" 
                            size="medium"
                            style={{ marginTop: '10px' }}
                            onClick={handleSearch}
                        >SEARCH
                        </Button>
                    </Grid>        
                </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default SearchApexChartFacDep