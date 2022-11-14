import React, { useState } from "react";

import "../css/Home.css";

function Home() {
  const [scope, setScope] = useState("profile:read_all,activity:read");

  function firee() {
    const data2 = { data: scope };

    window.open(`https://www.strava.com/oauth/authorize?client_id=74263&redirect_uri=https://apistrava-1c4c0.web.app/exchange_token&response_type=code&approval_prompt=force&scope=${scope}`, "_self");
  }
  return (
    <div className="home">
      <h1 className="home_title">GRETRAINING</h1>

      <button className="home_login" onClick={() => firee()} type="submit">
        log in
      </button>
    </div>
  );
}

export default Home;
