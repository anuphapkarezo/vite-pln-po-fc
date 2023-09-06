import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { format } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import ChartComponent from "../components/Pressure(kPa)";
import ChartComponent2 from "../components/Pressure(kPa)";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserEditMasterListPage
() {
  const [quantity, setQuantity] = useState(24);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [distinctMachine, setDistinctMachine] = useState([]);
  const fetchDistinctMachine = async () => {
    try {
      const response = await axios.get(
        "http://10.17.77.111:3001/api/smt_vacuum_seal_data/distinctMccode"
      );
      const distinctMachine = response.data;
      setDistinctMachine(distinctMachine);
    } catch (error) {
      console.error(`Error fetching distinct factories: ${error}`);
    }
  };
  const handleMachineChange = (event, newValue) => {
    console.log(newValue);
    setSelectedMachine(newValue);
  };

  useEffect(() => {
    fetchDistinctMachine();
  }, []);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (selectedMachine !== null) {
      fetchDataapi();
    } else if (selectedMachine === null) {
      setData([]);
    }
  }, [selectedMachine, quantity]);

  const fetchDataapi = async () => {
    try {
      const response = await axios.get(
        `http://10.17.77.111:3001/api/smt_vacuum_seal_data/dataplot?mc_code=${selectedMachine.mc_code}&hours=${quantity}`
      );
      const dataapi = response.data;
      setData(dataapi);
      console.log(dataapi);
      const categories = dataapi.map((item) => {
        let date = new Date(item.create_at);
        return date.toLocaleString();
      });
      setCategories(categories); // ตั้งค่า categories ที่นี่
    } catch (error) {
      console.error(`Error fetching distinct machines: ${error}`);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        
        <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
                <Item>
                <Autocomplete
                    // options={distinctFactory}
                    getOptionLabel={(option) => option && option.factory_code}
                    // value={selectedFactory}
                    // onChange={handleFactoryChange}
                    size="small"
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Factory"
                        variant="outlined"
                      />
                    )}
                  />
                </Item>
      
              </Grid>
              <Grid item xs={3} md={3}>
                <Item>
                <Autocomplete
                    // options={distinctFactory}
                    getOptionLabel={(option) => option && option.factory_code}
                    // value={selectedFactory}
                    // onChange={handleFactoryChange}
                    size="small"
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Factory"
                        variant="outlined"
                      />
                    )}
                  />
                </Item>
      
              </Grid>
              <Grid item xs={3} md={3}>
                <Item>
                <Autocomplete
                    // options={distinctFactory}
                    getOptionLabel={(option) => option && option.factory_code}
                    // value={selectedFactory}
                    // onChange={handleFactoryChange}
                    size="small"
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Factory"
                        variant="outlined"
                      />
                    )}
                  />
                </Item>
      
              </Grid>
              
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
              <Item>
                <Autocomplete
                  options={distinctMachine}
                  getOptionLabel={(option) => option && option.mc_code}
                  value={selectedMachine}
                  onChange={handleMachineChange}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="เลือก Machine"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={3} md={3}>
              <Item>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  label="Hr"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={handleDecrement}>
                          <RemoveIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleIncrement}>
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    inputProps: {
                      style: {
                        textAlign: "center",
                      },
                    },
                  }}
                  sx={{ width: "100%" }}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={categories[categories.length - 1]}
                />
              </div>
            </Grid>
            {data.length > 0 ? (
              <React.Fragment>
                <Container maxWidth="xl">
                  <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
                    <Grid container spacing={2}>
                      <Grid item xl={12} mt={2}>
                        <Item>
                          <ChartComponent
                            dataplot={data}
                            categories={categories}
                          />
                        </Item>
                      </Grid>
                      <Grid item xl={12} mt={2}>
                        <Item>
                          <ChartComponent2
                            dataplot={data}
                            categories={categories}
                          />
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </React.Fragment>
            ) : (
              <Container maxWidth="xl">
                <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xl={12} mt={2}>
                      <Item>... Wait Data API ...</Item>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            )}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
