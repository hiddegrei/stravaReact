import React, { useEffect, useState } from "react";
import { useStateValue } from "../Stateprovider";
import Chart from "react-google-charts";
import "../css/MySufferScores.css";

function MySufferScores() {
  const [{ accesToken }] = useStateValue();
  const [intenPoints, setIntenPoints] = useState([]);
  const [length, setLength] = useState();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    console.log(accesToken);
    const data2 = { data: accesToken };
    fetch("https://www.strava.com/api/v3/athlete/activities?page=1&per_page=30", {
      method: "GET", // or 'PUT'
      headers: {
        authorization: "Bearer " + accesToken,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Success, Data:", json);
        console.log(json);
        let currentEndWeek = new Date();

        let day = currentEndWeek.getDay();

        if (day === 0) {
          currentEndWeek = Date.now() / 1000 - 604800;
        } else {
          currentEndWeek = new Date(currentEndWeek.setDate(currentEndWeek.getDate() + (7 - day) - 6));
          //console.log(currentEndWeek)
          currentEndWeek = currentEndWeek.getTime() / 1000;
        }

        let currentWeekScore = 0;
        let currentWeekIndex = 0;

        for (let i = 0; i < json.length; i++) {
          let date = new Date(json[i].start_date_local).getTime() / 1000;

          if (date >= currentEndWeek) {
            currentWeekScore += json[i].suffer_score;
          }
          if (date < currentEndWeek || i === json.length - 1) {
            setIntenPoints((doc) => {
              let oldData = doc;
              let newData = [currentWeekIndex, currentWeekScore];
              return [...oldData, newData];
            });
            currentWeekIndex += 1;
            currentEndWeek = currentEndWeek - 604800;
            currentWeekScore = json[i].suffer_score;
          }
        }
        setLength(currentWeekIndex);
      });
  }, []);

  useEffect(() => {
    if (intenPoints.length === length) {
      console.log(intenPoints);
      let newArr = [["time", "suffer score"]];
      let counter = 1;
      for (let i = intenPoints.length - 1; i >= 0; i--) {
        newArr[counter] = [counter - 1, intenPoints[i][1]];
        counter += 1;
      }
      console.log(newArr);
      setIntenPoints(newArr);
      setShowChart(true);
    }
  }, [length, intenPoints]);
  return (
    <div className="suffer">
      {showChart && (
        <Chart
          width={"600px"}
          height={"500px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={intenPoints}
          options={{
            title: "Suffer scores",
            hAxis: { title: "time", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0, maxValue: 200 },

            // For the legend to fit, we make the chart area smaller
            //chartArea: { width: '50%', height: '70%' },
            // lineWidth: 25
          }}
        />
      )}
    </div>
  );
}

export default MySufferScores;
