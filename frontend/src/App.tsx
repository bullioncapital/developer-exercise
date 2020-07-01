import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import Row from "./types/RowType";
import Filter from "./types/FilterType";
import ColumnFilter from "./components/ColumnFilter";

const URL = 'http://localhost:3000/data';

function App() {
    const [data, updateData] = useState<Row[]>([]);
    const [errMsg, setErrMsg] = useState();
    const columns = useRef<string[]>([]);
    const oriData = useRef<Row[]>([]);

    useEffect(() => {
        async function f() {
            await getPage(1, 20);
        }
        f();
    }, []);

    async function getPage(start: number, size: number) {
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

        try {
            const data = await fetch(url).then(res => res.json());
            if (data && data.length > 0) {
                oriData.current = data;
                columns.current = Object.keys(data[0]);
            }
            updateData(data);
        } catch (err) {
            setErrMsg('Oops something wrong..');
        }
    }

    async function prev() {
        if (oriData.current.length > 0) {
            const end = oriData.current[0].FMID;
            await getPage(end, -20);
        }
    }
    async function next() {
        if (oriData.current.length > 0) {
            const start = oriData.current[oriData.current.length - 1].FMID;
            await getPage(start, 20);
        }
    }
    function applyFilter(filter: Filter) {
        let res = oriData.current;
        if (filter && filter.column && filter.val) {
            res = res.filter((row: any) =>
                row[filter.column] == filter.val);
        }
        updateData(res);
    }

    if (errMsg) {
        return (
            <div className="App">
                <p>{errMsg}</p>
            </div>
        )
    }
    return (
        <div className="App">
            <ColumnFilter columns={columns.current}
                          apply={applyFilter}/>
            <table>
                <thead>
                    <tr>
                        {columns.current.map(column =>
                            <th>{column}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr>
                            {Object.values(row).map(val =>
                                <td>{val}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
        </div>
    );
}

export default App;
