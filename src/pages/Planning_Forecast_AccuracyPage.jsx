import React, { useState, useEffect } from "react";
import SearchProd_Fc from "../components/SearchGroup/SearchProd_Fc";
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
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';


export default function Planning_Forecast_AccuracyPage({ onSearch }) {
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

    const [selectedProduct, setSelectedProduct] = useState(null);

    const columns_accuracy = [
      { field: 'sales', headerName: 'SALES', width: 150 , headerAlign: 'center' , border: '1px solid black' },
      { field: 'part', headerName: 'PART', width: 200 , headerAlign: 'center' },
      { field: 'fg', headerName: 'FG', width: 100 , headerAlign: 'center' , align: 'center'},
      { field: 'wip', headerName: 'WIP', width: 100 , headerAlign: 'center'  , align: 'center'},
      { field: 'po_bal', headerName: 'PO_BAL', width: 100 , headerAlign: 'center'  , align: 'center'},
      { field: 'fc', headerName: 'FC', width: 100 , headerAlign: 'center'  , align: 'center'},
      { field: 'po_cover_fc', headerName: 'PO Cover FC (WK)', width: 150 , headerAlign: 'center'  , align: 'right'},
      { field: 'fc_acc', headerName: 'FC Accuracy 4WK', width: 150 , headerAlign: 'center'  , align: 'right'},
      { field: 'wip_fg_no_po', headerName: 'WIP+FG no PO', width: 150 , headerAlign: 'center' , align: 'center'},
      { field: 'wip_fg_no_fc', headerName: 'WIP+FG no FC', width: 150 , headerAlign: 'center' , align: 'center'},
      { field: 'wip_fg_over_fc', headerName: 'WIP+FG over FC', width: 150 , headerAlign: 'center' , align: 'center' },
    ];
    const mockRows = [
      { id: 1, 
        sales: 'FAM', 
        part: 'CACZ-136MW-2D', 
        fg: 100, 
        wip: 100, 
        po_bal: 100, 
        fc: 100, 
        po_cover_fc: 4,
        fc_acc: '80%',
        wip_fg_no_po: 'YES',
        wip_fg_no_fc: 'YES',
        wip_fg_over_fc: 'YES',
      },
    ];
    return (
      <div className='container'>
        <div >
          <SearchProd_Fc
            onSearch={(queryParams) => {
            setSelectedProduct(queryParams.prd_name);
            }}
          />
        </div>
        <div style={{ height: 600, width: '1440px' , marginTop: '5px'}}>
          <div style={{ height: 680, width: '1570px' }}>
            <DataGrid
                rows={mockRows}
                columns={columns_accuracy}
                // loading={!FGDetails.length} 
                pageSize={10}
                checkboxSelection
                // autoPageSize
                style={{ minHeight: '400px', border: '1px solid black' , backgroundColor: '#E4F1FF'}}
                slots={{ toolbar: CustomToolbar }} 
            />
          </div>
        </div>
      </div>
    );
}