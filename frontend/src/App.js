import React, { useState, useEffect } from "react";
import "./App.css";
import * as superagent from "superagent";
function App() {
  const [data, updateData] = useState([]);
  useEffect(() => {
    superagent.get("http://localhost:3000").end((err, res) => {
      updateData(JSON.parse(res.text));
    });
  }, []);
  return (
    <div className="App">
      {data.map((row) => (
        <div>{row}</div>
      ))}
    </div>
  );
}

export default App;
