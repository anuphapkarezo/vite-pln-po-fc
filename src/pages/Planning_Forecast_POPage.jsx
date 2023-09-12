// import * as React from 'react';
import React, { useState, useEffect } from "react";
import SearchFacSeriesProd_Fc from "../components/SearchGroup/SearchFacSeriesProd_Fc";
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    useGridApiContext,
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
  } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon


export default function Planning_Forecast_POPage({ onSearch }) {
    const getJson = (apiRef) => {
        // Select rows and columns
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
      
        // Format the data. Here we only keep the value
        const data = filteredSortedRowIds.map((id) => {
          const row = {};
          visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
          });
          return row;
        });
      
        // Stringify with some indentation
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
        return JSON.stringify(data, null, 2);
      };
      
        const exportBlob = (blob, filename) => {
        // Save the blob in a json file
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      
        setTimeout(() => {
          URL.revokeObjectURL(url);
        });
    };
      
    function JsonExportMenuItem(props) {
        const apiRef = useGridApiContext();
        const { hideMenu } = props;
      
        return (
          <MenuItem
            onClick={() => {
              const jsonString = getJson(apiRef);
              const blob = new Blob([jsonString], {
                type: 'text/json',
              });
              exportBlob(blob, 'DataGrid_demo.json');
      
              // Hide the export menu after the export
              hideMenu?.();
            }}
          >
            Export JSON
          </MenuItem>
        );
    }
    const csvOptions = { delimiter: ',' };
      
    function CustomExportButton(props) {
        return (
          <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem options={csvOptions} />
            <JsonExportMenuItem />
          </GridToolbarExportContainer>
        );
    }
      
    function CustomToolbar(props) {
        return (
          <GridToolbarContainer {...props}>
            <CustomExportButton />
          </GridToolbarContainer>
        );
    }

    const [error , setError] = useState(null);
    const [products , setProducts] = useState([]);
    const [runningNumber, setRunningNumber] = useState(1); //use for table
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [wk_no, setWeekNumbers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [po_alls , setPo_All] = useState([]);
    const [po_rec, setPoRec] = useState([]);
    const [po_due, setPoDue] = useState([]);
    const [poBalData, setPoBalData] = useState(Array.from({ length: wk_no.length }, () => "0"));
    const [Fg, setFg] = useState([]);
    const [wip, setWip] = useState([]);
    const [monDate, setMonDate] = useState([]);
    const [actualShips, setActualShips] = useState([]);
    const [pdShow, setpdShow] = useState([]);
    const [fetchedProductData, setFetchedProductData] = useState([]);
    const [selectedPoBal, setSelectedPoBal] = useState(null);
    const [isModalOpen_PODet, setIsModalOpen_PODet] = useState(false);
    const [fcFlatData, setFcFlatData] = useState([]);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const fetchData_week = async (
        ) => {
          try {
            const response = await fetch(`http://localhost:3002/api/get-week`);
            if (!response.ok) {
              throw new Error('Network response was not OK');
          }
            const wk_no = await response.json();
            const weekNumbers = wk_no.map(weekObj => weekObj.wk);
            const mon_date = wk_no.map(weekObj => weekObj.mon_date);
            setWeekNumbers(weekNumbers);
            setMonDate(mon_date);
          } catch (error) {
            console.error('Error fetching data:', error);
            // setError('An error occurred while fetching data week');
            setError(`An error occurred while fetching data week: ${error.message}`);
          }
    };

    const fetchData_fc = async (
        prd_name = selectedProduct,
        prd_series = selectedSeries,
    ) => {
    try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3002/api/filter-fc-by-product-series?prd_series=${selectedSeries}&prd_name=${selectedProduct}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        setProducts(data);
        setRunningNumber(1); // Reset the running number to 1
        } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data Product');
        } finally {
            setIsLoading(false); // Set isLoading back to false when fetch is complete
        }
    };

    const fetchData_po = async (
        prd_name = selectedProduct,
        prd_series = selectedSeries,
    ) => {
    try {
        // setIsLoading(true);
        const response = await fetch(`http://localhost:3002/api/filter-po-all-product-series?prd_series=${selectedSeries}&prd_name=${selectedProduct}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        const poRecData = {};
        data.forEach(item => {
            poRecData[item.wk] = item.qty_rec;
        });

        const poDueData = {};
        data.forEach(item => {
            poDueData[item.wk] = item.qty_due;
        });

        const FgData = {};
        data.forEach(item => {
            FgData[item.wk] = item.qty_fg;
        });

        const WipData = {};
        data.forEach(item => {
            WipData[item.wk] = item.qty_wip;
        });

        setPo_All(data);
        setPoRec(poRecData);
        setPoDue(poDueData);
        setFg(FgData);
        setWip(WipData);

        } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data Po_All');
        } finally {
            // setIsLoading(false); // Set isLoading back to false when fetch is complete
        }
    };

    const fetchData_pobal = async (
        prd_name = selectedProduct,
        prd_series = selectedSeries,
    ) => {
    try {
        // setIsLoading(true);
        const response = await fetch(`http://localhost:3002/api/filter-po-bal-product-series?prd_series=${selectedSeries}&prd_name=${selectedProduct}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        const poBalData = {};
        data.forEach(item => {
            poBalData[item.wk] = item.qty_bal;
        });

        setPoBalData(poBalData);
        } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data Po_Bal');
        } finally {
            // setIsLoading(false); // Set isLoading back to false when fetch is complete
        }
    };
    

    const fetchData_ActualShip = async (
        prd_name = selectedProduct,
        prd_series = selectedSeries,
    ) => {
    try {
        // setIsLoading(true);
        const response = await fetch(`http://localhost:3002/api/filter-actual-ship-summary-product-series?prd_series=${selectedSeries}&prd_name=${selectedProduct}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        const ActualData = {};
        data.forEach(item => {
            ActualData[item.wk] = item.qty_ship;
        });
        setActualShips(ActualData);
        } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data Actual ship Summary');
        } finally {
            // setIsLoading(false); // Set isLoading back to false when fetch is complete
        }
    };

    const fetchData_PDshow = async (
        prd_name = selectedProduct,
        prd_series = selectedSeries,
    ) => {
    try {
        // setIsLoading(true);
        const response = await fetch(`http://localhost:3002/api/filter-show-product-series?prd_series=${selectedSeries}&prd_name=${selectedProduct}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        console.log("Data" , data);
        setpdShow(data);
        } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data product show');
        } finally {
            // setIsLoading(false); // Set isLoading back to false when fetch is complete
        }
    };

    const fetchData_FcFlat = async (
        prd_name = selectedProduct,
        prd_series = selectedSeries,
    ) => {
        try {
            const response = await fetch(`http://localhost:3002/api/filter-fc-diff-prev-curr?prd_series=${prd_series}&prd_name=${prd_name}`);
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            const data = await response.json();
            const FlatData = {};
            data.forEach(item => {
                FlatData[item.wk] = item.qty_fc;
            });
            setFcFlatData(FlatData); // Update the state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data FC_FLAT');
        } finally {
            // setIsLoading(false);
        }
    };
    
    useEffect(() => { //ต้องมี userEffect เพื่อให้รับค่าจาก อีก component ได้ต่อเนื่อง realtime หากไม่มีจะต้องกดปุ่ม 2 รอบ
        fetchData_week();
        fetchData_fc();
        fetchData_po();
        fetchData_pobal();
        fetchData_ActualShip();
        fetchData_PDshow();
        fetchData_FcFlat();
    }, [selectedProduct , selectedSeries]);

    useEffect(() => {
        const prdNames = pdShow.map((item) => item.prd_name);
        console.log('pdShow' , prdNames);
        if (prdNames.length === 0) {
            setFetchedProductData('');
        } else {
            setFetchedProductData(prdNames);
        }
    }, [pdShow]);

    function chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }
      
    if (error) {
        return <div>Error: {error}</div>;
    }

    const dataByProduct = {};
    products.forEach(product => {
        if (!dataByProduct[product.pfd_period_no]) {
            dataByProduct[product.pfd_period_no] = {
                pfd_period_no: product.pfd_period_no,
                qty_fc: {}
            };
        }
        dataByProduct[product.pfd_period_no].qty_fc[product.wk] = product.qty_fc;
    });

    // Function to open the modal with the selected PO_BAL value
    const openModal = (poBalValue) => {
        if (poBalValue > 0) {
            setSelectedPoBal(poBalValue);
            setIsModalOpen_PODet(true);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedPoBal(null);
        setIsModalOpen_PODet(false);
        console.log("isModalOpen:", isModalOpen_PODet); 
    };

    const style  = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
    };
    

    const fcLatestData = {};
    wk_no.forEach(week => {
        const week4Chars = week.slice(-4);
        fcLatestData[week] = Object.values(dataByProduct).reduce((latest, productData) => {
            const period4Chars = productData.pfd_period_no.slice(-4);
            if (period4Chars === week4Chars) {
                const qty_fc = productData.qty_fc[week];
                return qty_fc !== undefined ? qty_fc : 0;
            } else {
                // If period4Chars !== week4Chars, update qty_fc with the value from 'week'
                const qty_fc = productData.qty_fc[week];
                if (qty_fc !== undefined) {
                    latest = qty_fc;
                }
            }
            return latest;
        }, 0);
    });
    
    const columns = [
        { field: 'productName', headerName: 'Product Name', width: 200},
        { field: 'soLine', headerName: 'SO Line', width: 200 },
        { field: 'soNumber', headerName: 'SO Number', width: 200 },
        { field: 'reqDate', headerName: 'Req. Date', width: 200 },
        { field: 'dueDate', headerName: 'Due. Date', width: 200 },
        { field: 'qtyBal', headerName: 'Qty Bal', width: 200 },
      ];
      
      const rows = [
        {
          id: 1,
          productName: 'CAC-126S-1B',
          soLine: 1,
          soNumber: '2SD05521',
          reqDate: '2023-09-04',
          dueDate: '2023-09-04',
          qtyBal: 1300,
        },
      ];
    
    return (
        <div className='container'>
            {/* style={{ display: 'flex', flexDirection: 'row' }} */}
            <div >
                <SearchFacSeriesProd_Fc
                    onSearch={(queryParams) => {
                    setSelectedProduct(queryParams.prd_name);
                    setSelectedSeries(queryParams.prd_series);
                    }}
                />
                <div id="pdShowLabel" style={{width: '565px'}}>
                    {selectedProduct === "Product" ? (
                        <div style={{ backgroundColor: '#FFFFDD', fontSize: '14px', fontFamily: 'Angsana News, sans-serif', color: '#952323' }}>{selectedSeries}</div> // Render an empty div if selectedProduct is "Empty"
                    ) : (
                        chunkArray(fetchedProductData, 8).map((chunk, index) => (
                        <div key={index} style={{ backgroundColor: '#FFFFDD', fontSize: '14px', fontFamily: 'Angsana News, sans-serif', color: '#952323' }}>
                            {chunk.join(' : ')}
                        </div>
                        ))
                    )}
                    {/* {fetchedProductData ? (
                        chunkArray(fetchedProductData, 8).map((chunk, index) => (
                        <div key={index} style={{ backgroundColor: '#FFFFDD', fontSize: '14px', fontFamily: 'Angsana News, sans-serif', color: '#952323' }}>
                            {chunk.join(' : ')}
                        </div>
                        ))
                    ) : (
                        // Render empty content when fetchedProductData is empty
                        null
                    )} */}
                    {/* {chunkArray(fetchedProductData, 8).map((chunk, index) => (
                        <div key={index} style={{backgroundColor: '#FFFFDD' , fontSize: '14px' , fontFamily: 'Angsana News, sans-serif' , color: '#952323'}}>
                        {chunk.join(' : ')}
                        </div>
                    ))} */}
                </div>
            </div>
            
            <div className="table-responsive table-fullscreen" style={{ height: 800, width: '1600px' , marginTop: '5px'}}>
                {isLoading ? ( // Render the loading indicator if isLoading is true
                    <div className="loading-indicator" style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'center' , alignItems: 'center' , height: '50vh'}}>
                        <CircularProgress /> {/* Use the appropriate CircularProgress component */}
                        <p>Loading data...</p>
                        {/* <p>Loading data...{Math.round(loadingPercentage)}%</p> */}
                    </div>
                ) : (
                    <table className="table table-striped table-bordered table-hover blue-theme small" style={{fontSize: '10px' , fontFamily: 'Angsana News, sans-serif'}}>
                        <thead className="thead-dark">
                        {/* className="table table-hover blue-theme table-very-small" */}
                            <tr>
                                {/* <th>Row No</th> */}
                                <th  style={{textAlign: 'center'}}>Period No</th>
                                {wk_no.map((week, index) => {
                                    let backgroundColor = '';
                                    let fontColor = '';

                                    if (index < 12) {
                                    backgroundColor = '#FFDBAA';
                                    } else if (index > 12) {
                                    backgroundColor = '#279EFF';
                                    } else {
                                    backgroundColor = '#5C8374',
                                    fontColor = '#F3FDE8';
                                    }

                                    return (
                                    <th
                                        key={index}
                                        style={{
                                        backgroundColor: backgroundColor,
                                        color: fontColor,
                                        textAlign: 'center'
                                        }}>
                                        {week}
                                    </th>
                                    );
                                    })
                                }
                            </tr>
                            <tr>
                            <th style={{ textAlign: 'center' }}>Date</th>
                                {monDate.map((date, index) => {
                                    let backgroundColor = '';
                                    let fontColor = '';

                                    if (index < 12) {
                                    backgroundColor = '#FFDBAA';
                                    } else if (index > 12) {
                                    backgroundColor = '#279EFF';
                                    } else {
                                    backgroundColor = '#5C8374',
                                    fontColor = '#F3FDE8';
                                    }

                                    return (
                                    <th
                                        key={index}
                                        style={{
                                        backgroundColor: backgroundColor,
                                        color: fontColor,
                                        textAlign: 'center'
                                        }}>
                                        {date}
                                    </th>
                                    );
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(dataByProduct).map((productData, index) => (
                                <tr key={productData.pfd_period_no}>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{productData.pfd_period_no}</td>
                                {wk_no.map((week, weekIndex) => {
                                    const Period4Chars = productData.pfd_period_no.slice(-4);
                                    const Week4Chars = week.slice(-4);
                                    let backgroundColor = 'white'; // Default background color
                                    let fontColor_wk = ''

                                    if (weekIndex === 12) {
                                    backgroundColor = '#CEDEBD'; 
                                    fontColor_wk = '#0E21A0';
                                    } else if (Period4Chars === Week4Chars) {
                                        backgroundColor = '#B9B4C7'; // Set background color to your desired color if weekIndex is 12
                                    }

                                    return (
                                    <td
                                        key={weekIndex}
                                        style={{
                                        textAlign: 'center',
                                        backgroundColor: backgroundColor,
                                        color: fontColor_wk,
                                        }}
                                    >
                                        {productData.qty_fc[week] !== undefined ? formatNumberWithCommas(productData.qty_fc[week]) : "0"}
                                    </td>
                                    );
                                })}
                                </tr>
                            ))}
                            <tr>
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#CEDEBD'}}>FC_Lastest:</td>
                                {wk_no.map((week, weekIndex) => (
                                    <td key={weekIndex} style={{ textAlign: 'center' , backgroundColor: '#CEDEBD' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal' }}>
                                    {formatNumberWithCommas(fcLatestData[week])}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FD8D14'}}>FC_Fluctuation:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const FlatValue = fcFlatData[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#FD8D14' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal'  }}
                                        >
                                            {FlatValue !== undefined ? formatNumberWithCommas(FlatValue) : "0"}
                                        </td>
                                    );
                                })}
                            </tr>

                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FFC436' }}>PO_REC:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const recValue = po_rec[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#FFC436' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal'  }}
                                        >
                                            {recValue !== undefined ? formatNumberWithCommas(recValue) : "0"}
                                            {/* {recValue !== undefined ? (recValue !== 0 ? recValue : "--") : "--"} */}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#F8DE22' }}>PO_DUE:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const dueValue = po_due[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#F8DE22' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal'  }}
                                        >
                                            {dueValue !== undefined ? formatNumberWithCommas(dueValue) : "0"}
                                            {/* {recValue !== undefined ? (recValue !== 0 ? recValue : "--") : "--"} */}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FFE17B' }}>Actual ship:</td>
                                {/* <td style={{ textAlign: 'center', backgroundColor: '#FFE17B' }}>0</td> */}
                                {wk_no.map((week, weekIndex) => (
                                <td
                                    key={weekIndex}
                                    style={{textAlign: 'center', backgroundColor: '#FFE17B', color: weekIndex === 12 ? '#0E21A0' : 'black', fontWeight: weekIndex === 12 ? 'bold' : 'normal'
                                    }}
                                >
                                    {actualShips[week] !== undefined ? formatNumberWithCommas(actualShips[week]) : "0"}
                                </td>
                            ))}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FD8D14' }}>PO_BAL:</td>
                                {wk_no.map((week, weekIndex) => (
                                    <td
                                        key={weekIndex}
                                        style={{cursor: "pointer" , textAlign: 'center',backgroundColor: '#FD8D14' , color: weekIndex === 12 ? '#0E21A0' : 'black',fontWeight: weekIndex === 12 ? 'bold' : 'normal'
                                        }}
                                        onClick={() => openModal(poBalData[week])} // Open modal on click
                                    >
                                        {poBalData[week] !== undefined ? formatNumberWithCommas(poBalData[week]) : "0"}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FFF6DC' }}>FG:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const FgValue = Fg[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#FFF6DC' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal' }}
                                        >
                                            {FgValue !== undefined ? formatNumberWithCommas(FgValue) : "0"}
                                            {/* {recValue !== undefined ? (recValue !== 0 ? recValue : "--") : "--"} */}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FFF6DC' }}>FG Unmove:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const FgValue = Fg[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#FFF6DC' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal' }}
                                        >
                                            {FgValue !== undefined ? formatNumberWithCommas(FgValue) : "0"}
                                            {/* {recValue !== undefined ? (recValue !== 0 ? recValue : "--") : "--"} */}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FFF6DC' }}>WIP:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const WipValue = wip[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#FFF6DC' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal' }}
                                        >
                                            {WipValue !== undefined ? formatNumberWithCommas(WipValue) : "0"}
                                            {/* {recValue !== undefined ? (recValue !== 0 ? recValue : "--") : "--"} */}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                {/* <td></td> */}
                                <td style={{color: 'blue' , fontWeight: 'bold' , textAlign: 'right' , backgroundColor: '#FFF6DC' }}>WIP Pending:</td>
                                {wk_no.map((week, weekIndex) => {
                                    const WipValue = wip[week];
                                    return (
                                        <td
                                            key={weekIndex}
                                            style={{ textAlign: 'center', backgroundColor: '#FFF6DC' , color: weekIndex === 12 ? '#0E21A0' : 'black' , fontWeight: weekIndex === 12 ? 'bold' : 'normal' }}
                                        >
                                            {WipValue !== undefined ? formatNumberWithCommas(WipValue) : "0"}
                                            {/* {recValue !== undefined ? (recValue !== 0 ? recValue : "--") : "--"} */}
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                )}

                {/* Modal */}
                {isModalOpen_PODet && (
                    <Modal
                    open={isModalOpen_PODet}
                    onClose={closeModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                    >
                    <Box sx={{ ...style, width: 1325 , height: 500 }}>
                        <h5 style={{textAlign: 'center'}}>PO Balance by Details</h5>
                        <div style={{ height: 400, width: '100%' , border: '1px solid black'}}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                checkboxSelection
                                autoPageSize
                                style={{ minHeight: '400px', border: '1px solid #ccc' }}
                                slots={{ toolbar: CustomToolbar }} 
                            />
                        </div>
                        {/* <table>
                            <thead >
                                <tr style={{textAlign: 'center'}}>
                                    <th style={{border: '1px solid black' , width: '250px'}}>Product Name</th>
                                    <th style={{border: '1px solid black' , width: '150px'}}>SO Line</th>
                                    <th style={{border: '1px solid black' , width: '200px'}}>SO Number</th>
                                    <th style={{border: '1px solid black' , width: '200px'}}>Req. Date</th>
                                    <th style={{border: '1px solid black' , width: '200px'}}>Due. Date</th>
                                    <th style={{border: '1px solid black' , width: '200px'}}>Qty Bal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{border: '1px solid black' }}>
                                    <td>CAC-126S-1B</td>
                                    <td style={{textAlign: 'center'}}>1</td>
                                    <td style={{textAlign: 'center'}}>2SD05521</td>
                                    <td>2023-09-04</td>
                                    <td>2023-09-04</td>
                                    <td style={{textAlign: 'center'}}>1,300</td>
                                </tr>
                            </tbody>
                        </table> */}
                    </Box>
                </Modal>
                )}
            </div>
        </div>
    );
}