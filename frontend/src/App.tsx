import React, { useState, useEffect } from "react";
import "./App.css";
import * as superagent from "superagent";

// export interface table {

// }

function App() {
  const [data, updateData] = useState([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    superagent.get("http://localhost:3000").end((error, res) => {
      if (error) {
        setError(true)
      }
      updateData(JSON.parse(res.text));
    });
  }, []);

  let table
  if (data.length && !error) {
    table = (
      <div>
        {Object.keys(data[0]).map(key => (
          <span key={key}>{key}</span>
        ))}
      </div>
    )
  }


  return (
    <div className="App">
      {table}
    </div>
  );
}

export default App;
