import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    iterator: 0
  };

  handleIteratorChange = valueStateChange => _ => {
    this.setState(_ => ({
      iterator: valueStateChange
    }));
    console.log("New total: " + valueStateChange );
  };

  render() {
    const { iterator } = this.state;

    return (
      <div className="App">
        <h1>Contador: {iterator}</h1>
        <div>
          <button
            id="btn-incrementador"
            name="btn-incrementador"
            className="btn"
            onClick={this.handleIteratorChange(iterator + 5)}
          >
            Add +5
          </button>
          <button
            id="btn-decrementador"
            name="btn-decrementador"
            className="btn"
            onClick={this.handleIteratorChange(iterator - 5)}
          >
            Substract -5
          </button>
        </div>
      </div>
    );
  }
}

export default App;

