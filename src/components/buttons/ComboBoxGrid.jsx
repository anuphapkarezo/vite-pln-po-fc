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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ComboBoxGrid({ onSearch }) {

  const [selectedFactory, setSelectedFactory] = useState({ factory: "All" });
  const [selectedProcess, setSelectedProcess] = useState({ process: "All" });
  const [selectedDepartment, setSelectedDepartment] = useState({ department: "All" });
  const [selectedComputerName, setSelectedComputerName] = useState({ computer_name: "All" });
  const [selectedUserUpdateBy, setSelectedUserUpdateBy] = useState({ user_update_by: "All" });
  
  const [distinctFactory, setDistinctFactory] = useState([]);
  const [distinctProcess, setDistinctProcess] = useState([]);
  const [distinctDepartment, setDistinctDepartment] = useState([]);
  const [distinctComputerName, setDistinctComputerName] = useState([]);
  const [distinctUserUpdateBy, setDistinctUserUpdateBy] = useState([]);

  const fetchDistinctFactory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3002/api/factorylist");
      const distinctFactory = response.data;
      setDistinctFactory(distinctFactory);
    } catch (error) {
      console.error(`Error fetching distinct factories: ${error}`);
    }
  };
  // console.log(selectedDepartment);
  const fetchDistinctDepartment = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/factory-filter-deparment?factorySelect=${selectedFactory.factory}`);
      const distinctDepartment = response.data;
      // console.log(distinctDepartment);
      setDistinctDepartment(distinctDepartment);
    } catch (error) {
      console.error(`Error fetching distinct Departments: ${error}`);
    }
  };

  const fetchDistinctProcess = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/department-filter-process?factorySelect=${selectedFactory.factory}&departmentSelect=${selectedDepartment.department}`);
      const distinctProcess = response.data;
      setDistinctProcess(distinctProcess);
    } catch (error) {
      console.error(`Error fetching distinct processes: ${error}`);
    }
  };

  const fetchDistinctComputerName = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/process-filter-computer_name?factorySelect=${selectedFactory.factory}&departmentSelect=${selectedDepartment.department}&processSelect=${selectedProcess.process}`);
      const distinctComputerName = response.data;
      setDistinctComputerName(distinctComputerName);
    } catch (error) {
      console.error(`Error fetching distinct computer_name: ${error}`);
    }
  };

  const fetchDistinctUserUpdateBy = async () => {
    try {
      // console.log('filter user update by');
      // console.log('filter user update by',selectedFactory.factory,selectedDepartment.department,selectedProcess.process);
      // console.log(selectedUserUpdateBy.user_update_by);
      const response = await axios.get(`http://localhost:3002/api/search-user-update?user_update_by=${selectedUserUpdateBy.user_update_by}`);
      const distinctUserUpdateBy = response.data;
      setDistinctUserUpdateBy(distinctUserUpdateBy);
      // console.log(distinctUserUpdateBy);
    } catch (error) {
      console.error(`Error fetching distinct computer_name: ${error}`);
    }
  };



//Use effect reset
  useEffect(() => {
    fetchDistinctFactory();
    fetchDistinctProcess();
    fetchDistinctDepartment();
    fetchDistinctComputerName();
    fetchDistinctUserUpdateBy();
  }, []);

//Use effect เมื่อมีการเลือก selection
  useEffect(() => {
    fetchDistinctDepartment(selectedFactory.factory);
    fetchDistinctProcess(selectedDepartment.department);
    fetchDistinctComputerName(selectedProcess.process);
  }, [selectedFactory,selectedDepartment,selectedProcess]);
  
//Use effect กรณีเลือก User update by ให้ทำแค่นี้
  useEffect(() => {
    fetchDistinctUserUpdateBy(selectedUserUpdateBy.user_update_by);
  }, [selectedUserUpdateBy]);


  //สร้าง Functions selection change event
  const handleFactoryChange = (event, newValue) => {
    console.log(newValue);
    setSelectedFactory(newValue);
  };

  const handleProcessChange = (event, newValue) => {
    console.log(newValue);
    setSelectedProcess(newValue);
  };

  const handleDepartmentChange = (event, newValue) => {
    console.log(newValue);
    setSelectedDepartment(newValue);
  };

  const handleComputerNameChange = (event, newValue) => {
    console.log(newValue);
    setSelectedComputerName(newValue);
  };

  const handleUserUpdateByChange = async (event, newValue) => {
    console.log(newValue);
    setSelectedUserUpdateBy(newValue);
  };

  const handleSearch = () => {
    console.log("Button search",selectedFactory.factory,selectedUserUpdateBy.user_update_by);
    const queryParams = {
      factory: selectedFactory.factory,
      department: selectedDepartment.department,
      process: selectedProcess.process,
      computerName: selectedComputerName.computer_name,
      userUpdateBy: selectedUserUpdateBy.user_update_by,
      
    };

    onSearch(queryParams); // Invoke the callback function with the selected values
};

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container maxWidth="xl">
        <Box maxWidth="xl" sx={{ height: 150, width: "100%" }}>
          {/* row 1
           */}
          <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
              <Item>
                <Autocomplete
                options={distinctFactory}
                getOptionLabel={(option) => option && option.factory}
                value={selectedFactory}
                onChange={handleFactoryChange}
                size="small"
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Factory"
                    variant="outlined"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option && value && option.factory === value.factory
                }
              />

              </Item>
            </Grid>

            <Grid item xs={3} md={3}>
              <Item>
                  <Autocomplete
                    options={distinctDepartment}
                    getOptionLabel={(option) => option && option.department}
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    size="small"
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
                        variant="outlined"
                      />
                    )}
                  />
                </Item>
              
            </Grid>

            <Grid item xs={3} md={3}>
                <Item>
                  <Autocomplete
                    options={distinctProcess}
                    getOptionLabel={(option) => option && option.process}
                    value={selectedProcess}
                    onChange={handleProcessChange}
                    size="small"
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Process"
                        variant="outlined"
                      />
                    )}
                  />
                </Item>
            </Grid>
            <Grid item xs={3} md={3}>

            </Grid>        
          </Grid>
          {/* row 2 */}
          <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
              <Item>
                <Autocomplete
                  options={distinctComputerName}
                  getOptionLabel={(option) => option && option.computer_name}
                  value={selectedComputerName}
                  onChange={handleComputerNameChange}
                  size="small"
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Computer Name"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>

            <Grid item xs={3} md={3}>
            <Item>
                <Autocomplete
                  options={distinctUserUpdateBy}
                  getOptionLabel={(option) => option && option.user_update_by}
                  value={selectedUserUpdateBy}
                  onChange={handleUserUpdateByChange}
                  size="small"
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User Update by"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            {/* </Grid>

            <Grid item xs={3} md={3}> */}
  
            </Grid>
            <Grid item xs={3} md={3}>
            <Button 
              variant="contained" 
              size="large" 
              style={{ marginTop: '10px' }}
              onClick={handleSearch}
              >
              SEARCH...
            </Button>
            </Grid>        
          </Grid>
        </Box>
        
      </Container>
      
    </React.Fragment>
  );
}