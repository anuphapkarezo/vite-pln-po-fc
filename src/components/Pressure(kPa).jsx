import React from "react";
import Plot from "react-plotly.js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ChartComponent = ({ dataplot, categories }) => {
  // ดึงค่าล่าสุดจาก dataplot
  const latestValues = {
    pressure_pv: dataplot[dataplot.length - 1].pressure_pv,
  };

  // สร้างชิปสำหรับแสดงค่าล่าสุดแต่ละตัว
  const latestValueChips = Object.entries(latestValues).map(([key, value]) => (
    <Chip
      key={key}
      variant="outlined"
      color={value <= 200000 ? "primary" : "error"}
      avatar={
        <Avatar
          style={{
            width: `${
              value.toString().length >= 3
                ? value.toString().length * 8
                : "auto"
            }px`,
            height: "auto",
            borderRadius: `${value.toString().length * 2}px`,
          }}
        >
          {value}
        </Avatar>
      }
      label={key}
    />
  ));

  // สร้างข้อมูลกราฟ
  const data = Object.entries(latestValues).map(([key, value]) => ({
    x: categories,
    y: dataplot.map((item) => item[key]),
    type: "scatter",
    mode: "lines",
    // line: {
    //   color: key === "m_c_limit3" ? "#FF0000" : "#0161FF",
    // },
    name: key,
  }));

  // เพิ่มเส้น Trace อีก 1 เส้น
  data.push({
    x: categories,
    y: Array(categories.length).fill(-15),
    type: "scatter",
    mode: "lines",
    line: {
      color: "#FF0000", // เปลี่ยนสีตามต้องการ
    },
    name: "LSL", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  });

  // เพิ่มเส้น Trace อีก 1 เส้น
  data.push({
    x: categories,
    y: Array(categories.length).fill(0),
    type: "scatter",
    mode: "lines",
    line: {
      color: "#FF0000", // เปลี่ยนสีตามต้องการ
    },
    name: "USL", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  });

  const layout = {
    title: "Pressure(kPa)",
    xaxis: {
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "kPa",
    },
    width: 1450,
    height: 350,
    autosize: false,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 50,
      pad: 0,
    },
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "right" }}>
        {latestValueChips}
      </div>
      <div>
        <Plot data={data} layout={layout} config={{ responsive: true }} />
      </div>
    </>
  );
};

export default ChartComponent;
