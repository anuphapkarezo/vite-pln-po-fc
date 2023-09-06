import * as React from 'react';
import ReactApexChart from "react-apexcharts";
import { useDemoData } from '@mui/x-data-grid-generator';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { useState , useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ConnectedTvTwoToneIcon from '@mui/icons-material/ConnectedTvTwoTone';
import LaptopTwoToneIcon from '@mui/icons-material/LaptopTwoTone';
import SearchFactoryDepartmentProcess from '../components/SearchGroup/SearchFactoryDepartmentProcess';
import SearchApexChartFacDep from '../components/SearchGroup/SearchApexChartFacDep';

function ApexChartPage() {
    const [error , setError] = useState(null);
    const [computers , setComputers] = useState([]);

    const [selectedFactory, setSelectedFactory] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchData = async ( factory = selectedFactory, department = selectedDepartment,) => {
        try {
          const response = await fetch(`http://localhost:3002/api/total_pc_fac_dep?factorySelect=${selectedFactory}&departmentSelect=${selectedDepartment}`);
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          const data = await response.json();
          console.log(data);
          const dataWithRunningNumber = data.map((item, index) => ({
            runningnumber: index + 1,
            ...item,
          }));
          setComputers(dataWithRunningNumber);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('An error occurred while fetching data');
        }
    };

    useEffect(() => { //ต้องมี userEffect เพื่อให้รับค่าจาก อีก component ได้ต่อเนื่อง realtime หากไม่มีจะต้องกดปุ่ม 2 รอบ
        fetchData();
    }, [selectedFactory, selectedDepartment]);
    
      
    if (error) {
        return <div>Error: {error}</div>;
    }

    const series = computers.map((item) => item.count); // Replace 'value' with the actual property containing the series data
    const labels = computers.map((item) => item.process); // Replace 'label' with the actual property containing the labels
    
    //Create apex pie chart
    const apex_pie_chartoptions = {
        // series: [44, 55, 13, 43, 22],
        series: series,
        // series: computers.map((computer) => computer.factory),
        chart: {width: 380, type: 'pie',},
        // labels: computers.map((computer) => computer.process),
        // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        labels: labels,
        responsive: [{breakpoint: 480,options: {chart: {width: 200},legend: {position: 'bottom'}}}]
    };
    

    return (
        <div >
            <div >
                <SearchApexChartFacDep
                    onSearch={(queryParams) => {
                        setSelectedFactory(queryParams.factory);
                        setSelectedDepartment(queryParams.department);
                        // You can add additional logic here based on the selected values if needed
                        fetchData();
                        console.log("comboGrid", selectedFactory);
                    }}
                />
            </div>
            <div style={{ height: 800, width: '100%' }}>
                    <ReactApexChart 
                        options={apex_pie_chartoptions} 
                        series={apex_pie_chartoptions.series} 
                        type="pie" height={350} width={600}
                    />
            </div>
        </div>
    );
      
    }

export default ApexChartPage

// const bar_chartptions = {
    // chart: {
    //     type: 'bar', // Change this to the type of chart you want (line, bar, pie, etc.)
    // },
    // series: [
    // {
    //     name: 'Series 1',
    //     data: [30, 40, 45, 50, 49, 60, 70, 91],
    // },
    // ],
    //     xaxis: {
    //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    //     },
    // };

    // //Create bar chart Apex
    // const apex_bar_chartoptions = {
    //     series: [{
    //     name: 'Inflation',
    //     data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    //   }],
    //     chart: {
    //     height: 350,
    //     type: 'bar',
    //   },
    //   plotOptions: {
    //     bar: {
    //       borderRadius: 10,
    //       dataLabels: {
    //         position: 'top', // top, center, bottom
    //       },
    //     }
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     formatter: function (val) {
    //       return val + "%";
    //     },
    //     offsetY: -20,
    //     style: {
    //       fontSize: '12px',
    //       colors: ["#304758"]
    //     }
    //   },
      
    //   xaxis: {
    //     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //     position: 'top',
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false
    //     },
    //     crosshairs: {
    //       fill: {
    //         type: 'gradient',
    //         gradient: {
    //           colorFrom: '#D8E3F0',
    //           colorTo: '#BED1E6',
    //           stops: [0, 100],
    //           opacityFrom: 0.4,
    //           opacityTo: 0.5,
    //         }
    //       }
    //     },
    //     tooltip: {
    //       enabled: true,
    //     }
    //   },
    //   yaxis: {
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //       formatter: function (val) {
    //         return val + "%";
    //       }
    //     }
      
    //   },
    //   title: {
    //     text: 'Monthly Inflation in Argentina, 2002',
    //     floating: true,
    //     offsetY: 330,
    //     align: 'center',
    //     style: {
    //       color: '#444'
    //     }
    //   }
    // };
    // var chart = new ApexCharts(document.querySelector("#chart"), apex_bar_chartoptions);
    // chart.render();

    //Create apex stack bar chart
    // const apex_stackbar_chartoptions = {
    //     series: [{
    //     name: 'PRODUCT A',
    //     data: [44, 55, 41, 67, 22, 43]
    //   }, {
    //     name: 'PRODUCT B',
    //     data: [13, 23, 20, 8, 13, 27]
    //   }, {
    //     name: 'PRODUCT C',
    //     data: [11, 17, 15, 15, 21, 14]
    //   }, {
    //     name: 'PRODUCT D',
    //     data: [21, 7, 25, 13, 22, 8]
    //   }],
    //     chart: {
    //     type: 'bar',
    //     height: 350,
    //     stacked: true,
    //     toolbar: {
    //       show: true
    //     },
    //     zoom: {
    //       enabled: true
    //     }
    //   },
    //   responsive: [{
    //     breakpoint: 480,
    //     options: {
    //       legend: {
    //         position: 'bottom',
    //         offsetX: -10,
    //         offsetY: 0
    //       }
    //     }
    //   }],
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 10,
    //       dataLabels: {
    //         total: {
    //           enabled: true,
    //           style: {
    //             fontSize: '13px',
    //             fontWeight: 900
    //           }
    //         }
    //       }
    //     },
    //   },
    //   xaxis: {
    //     type: 'datetime',
    //     categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
    //       '01/05/2011 GMT', '01/06/2011 GMT'
    //     ],
    //   },
    //   legend: {
    //     position: 'right',
    //     offsetY: 40
    //   },
    //   fill: {
    //     opacity: 1
    //   }
    // };

{/* <div>
                <ReactApexChart 
                    options={bar_chartptions} 
                    series={bar_chartptions.series} 
                    type="bar" height={350} width={600}
                />
            </div>
            <div>
                <ReactApexChart 
                    options={apex_bar_chartoptions} 
                    series={apex_bar_chartoptions.series} 
                    type="bar" height={350} width={600}
                />
            </div>
            <div>
                <ReactApexChart 
                    options={apex_stackbar_chartoptions} 
                    series={apex_stackbar_chartoptions.series} 
                    type="bar" height={350} width={600}
                />
            </div> */}