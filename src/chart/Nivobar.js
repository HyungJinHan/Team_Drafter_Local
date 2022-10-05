import { ResponsiveBar } from "@nivo/bar";
import "./Nivobar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Nivobar = () => {
  const [nivochart, setNivochart] = useState([]);
  const [onejo, setOnejo] = useState([{}]);
  const [twojo, setTwojo] = useState();
  const [threejo, setThreejo] = useState();
  const [fourjo, setFourjo] = useState();
  const [fivejo, setFivejo] = useState();

  const nivoresult = () => {
    axios.post("http://localhost:8008/resultchart").then((res) => {
      setNivochart(res.data);
    });
  };
  useEffect(() => {
    nivoresult();
  }, []);

  console.log(nivochart);
  return (
    <div className="nivobar">
      <ResponsiveBar
        data={[
          {
            country: `123`,
            "hot dog": 73,
            burger: 90,
            sandwich: 189,
            kebab: 146,
            fries: 102,
            donut: 66,
          },
          {
            country: "2조 사용코인",
            "hot dog": 40,
            burger: 56,
            sandwich: 55,
            kebab: 120,
            fries: 155,
            donut: 108,
          },
          {
            country: "3조 사용코인",
            "hot dog": 181,
            burger: 141,
            sandwich: 161,
            kebab: 54,
            fries: 178,
            donut: 55,
          },
          {
            country: "4조 사용코인",
            "hot dog": 52,
            burger: 11,
            sandwich: 16,
            kebab: 61,
            fries: 188,
            donut: 48,
          },
          {
            country: "5조 사용코인",
            "hot dog": 71,
            burger: 23,
            sandwich: 55,
            kebab: 103,
            fries: 15,
            donut: 102,
          },
        ]}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "pink_yellowGreen" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default Nivobar;
