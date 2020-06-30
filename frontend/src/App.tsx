import React, {useState, useEffect} from "react";
import "./App.css";
import * as superagent from "superagent";

const URL = 'http://localhost:3000/data';

function App() {
    const [data, updateData] = useState([]);

    function getPage(start, size) {
        let params = [];
        if (start) {
            params.push('fmid=' + start);
        }
        if (size) {
            params.push('pagesize=' + size);
        }
        let url = URL;
        if (params.length > 0)
            url += '?' + params.join('&');

        superagent.get(url).end((err, res) => {
            updateData(JSON.parse(res.text));
        })
    }

    function prev() {
        if (data.length > 0) {
            const end = data[0].FMID;
            getPage(end, -20);
        }
    }
    function next() {
        if (data.length > 0) {
            const start = data[data.length - 1].FMID;
            getPage(start, 20);
        }
    }

    useEffect(() => {
        getPage(1, 20);
    }, []);

    return (
        <div className="App">
            <table>
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map(header =>
                        <th>{header}</th>
                    )}
                </tr>
                {data.map((row) => (
                    <tr>
                        {Object.values(row).map(val =>
                            <td>{val}</td>)}
                    </tr>
                ))}
            </table>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
        </div>
    );
}

export default App;
