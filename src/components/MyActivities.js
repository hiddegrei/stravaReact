import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import { useStateValue } from "../Stateprovider";

function MyActivities() {
  const [activities, setActivities] = useState([]);
  const [{ accesToken }, dispatch] = useStateValue();
  useEffect(() => {
    console.log(accesToken);
    const data2 = { data: accesToken };
    //
    console.log("Bearer " + accesToken);
    fetch("https://www.strava.com/api/v3/athlete/activities?page=1&per_page=30", {
      method: "GET", // or 'PUT'
      headers: {
        authorization: "Bearer " + accesToken,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setActivities(json);
      });
    //
    // fetch("/listactivities", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data2),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success, Data:", data);
    //     //console.log(data.data[0])

    //     setActivities(data.data)
    //     }).catch((error) => {
    //     console.error("Error:", error);
    //   });
  }, []);
  return (
    <div>
      {activities && (
        <div className="activities">
          {activities.map((doc, index) => (
            <Activity counter={index} data={doc} key={index} accesToken={accesToken} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyActivities;
