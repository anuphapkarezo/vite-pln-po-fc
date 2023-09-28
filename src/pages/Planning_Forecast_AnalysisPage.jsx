import React, { useState, useEffect } from "react";
// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { randomTraderName, randomEmail } from '@mui/x-data-grid-generator';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import './Planning_Forecast_AnalysisPage.css'; // Import the CSS file

const columns = [
  { field: 'sales', headerName: 'Sales', width: 80 , headerAlign: 'center' , headerClassName: 'bold-header'},
  { field: 'part', headerName: 'Part', width: 200 , headerAlign: 'center'  , headerClassName: 'bold-header'},
  { field: 'ship_factory', headerName: 'Ship Factory', width: 100 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'planner', headerName: 'Planner', width: 120 , headerAlign: 'center'  , headerClassName: 'bold-header'},
  { field: 'fc', headerName: 'FC', width: 100 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'po_cover_fc', headerName: 'PO-Cover-FC (WK)', width: 150 , headerAlign: 'center', align: 'center'  , headerClassName: 'bold-header'},
  { field: 'fc_accuracy', headerName: 'FC_Accuracy (4WK)', width: 150 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'wip', headerName: 'WIP', width: 100 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'fg', headerName: 'FG', width: 100 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'po_bal', headerName: 'PO_BAL', width: 100 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'wip_fg_no_po', headerName: 'WIP+FG No PO', width: 130 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'wip_fg_no_fc', headerName: 'WIP+FG No FC', width: 130 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
  { field: 'wip_fg_over_po', headerName: 'WIP+FG Over PO', width: 130 , headerAlign: 'center' , align: 'center' , headerClassName: 'bold-header'},
];

const rows = [
  { id:1 , sales: 'FAM', part: 'CACZ-136MW-2DL1' , ship_factory: 'P1' , planner: 'PANASSAYA' , fc: 100 , 
    po_cover_fc: 3.5 , fc_accuracy: '80 %' , wip: 30 , fg: 50 , po_bal: 120 ,
    wip_fg_no_po: "NO" , wip_fg_no_fc: 'NO' , wip_fg_over_po: 'NO'},

  { id:2 ,sales: 'FAM', part: 'CAC-161S-1C' , ship_factory: 'P1' , planner: 'PANASSAYA' , fc: 200 , 
  po_cover_fc: 3.5 , fc_accuracy: '80 %' , wip: 230 , fg: 50 , po_bal: 120 ,
  wip_fg_no_po: "NO" , wip_fg_no_fc: 'NO' , wip_fg_over_po: 'YES'},
];

export default function Planning_Forecast_AnalysisPage({ onSearch }) {
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});
  return (
    <div className="table-responsive table-fullscreen" style={{ height: 800, width: '1600px' , marginTop: '5px'}}>
        <Box sx={{ width: 1 }}>
          {/* <FormControlLabel
            checked={columnVisibilityModel.id !== false}
            onChange={(event) =>
              setColumnVisibilityModel(() => ({ id: event.target.checked }))
            }
            control={<Switch color="primary" size="small" />}
            label="Show ID column"
          />
          <FormControlLabel
            checked={filterModel.quickFilterExcludeHiddenColumns}
            onChange={(event) =>
              setFilterModel((model) => ({
                ...model,
                quickFilterExcludeHiddenColumns: event.target.checked,
              }))
            }
            control={<Switch color="primary" size="small" />}
            label="Exclude hidden columns"
          /> */}
          <Box sx={{ height: 400 }}>
            <DataGrid
              columns={columns}
              rows={rows}
              disableColumnFilter
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              filterModel={filterModel}
              onFilterModelChange={(newModel) => setFilterModel(newModel)}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
            />
          </Box>
        </Box>
    </div>
  );
}