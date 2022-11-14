import React, { useEffect, useState } from "react";
import "../css/Permissions.css";
import NavBar from "./NavBar";
import { useStateValue } from "../Stateprovider";
import { useHistory } from "react-router-dom";

function Permissions({ Notredirect }) {
  const [{ accesToken, expires_at, refresh_token }, dispatch] = useStateValue();
  const [scopesArr, setScopesArr] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accesToken === null && Notredirect) {
      let path = window.location.search;

      let code1 = path.split("&");
      let code2 = code1[1].split("=");
      let code = code2[1];
      let scopes = code1[2];

      setScopesArr(scopes.split("=")[1].split(","));

      console.log("code:", code);

      const data2 = { data: code };
      //
      let params = {
        client_id: "74263",
        client_secret: "de95dd8ef27c44d1c6f385779f381ec75e92fb8b",
        code: code,
        grant_type: "authorization_code",
      };

      fetch("https://www.strava.com/oauth/token", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((json) => {
          //   console.log(json);

          if (json.access_token) {
            dispatch({
              type: "SET_ACCESTOKEN",
              accesToken: json.access_token,
              expires_at: json.expires_at,
              refresh_token: json.refresh_token,
            });
            setLoading(false);
          }
        });
      //
    } else if (Date.now() / 1000 >= expires_at && expires_at != null) {
      console.log(Date.now() / 1000, expires_at);
      const data3 = { data: refresh_token };
      //
      let params = {
        client_id: "74263",
        client_secret: "de95dd8ef27c44d1c6f385779f381ec75e92fb8b",
        code: refresh_token,
        grant_type: "refresh_token",
      };

      fetch("https://www.strava.com/oauth/token", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((json) => {
          //   console.log(json);

          if (json.access_token) {
            dispatch({
              type: "SET_ACCESTOKEN",
              accesToken: json.access_token,
              expires_at: json.expires_at,
              refresh_token: json.refresh_token,
            });
          }
        });
    }
  }, []);

  return (
    <div>
      {/* <div onClick={()=>listActivities()}>Get my activities</div> */}

      {/* {activities&&<div className="activities">
              {activities.map((doc,index)=>(
                <Activity data={doc} key={index}/>
              ))}
            </div>} */}
      {/* {loading ? <div>loading..</div> : <div>permissions loaded</div>} */}
    </div>
  );
}

export default Permissions;
