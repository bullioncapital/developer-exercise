import React, {useEffect, useState} from "react";
import "../App.css";
import Filter from "../types/FilterType";

function ColumnFilter(props: {columns: string[], apply: ((filter: Filter) => void)}) {
    const {columns, apply} = props;
    const [column, setColumn] = useState<string>(columns[0]);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (columns && columns.length > 0) {
            setColumn(columns[0])
        }
    }, [columns]);

    function onColumnChange(e: React.FormEvent<HTMLSelectElement>) {
        setColumn(e.currentTarget.value);
    }
    function onValueChange(e: React.FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }
    function applyFilter(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (column && value) {
            apply({column: column, val: value});
        }
    }
    function cancelFilter(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        apply({column: '', val: ''});
    }
    return (
        <form onSubmit={applyFilter}>
            <label htmlFor="column">Choose a column:</label>
            <select name="column" id="column"
                    onChange={onColumnChange}>
                {columns.map(column =>
                    <option value={column}>{column}</option>
                )}
            </select>
            <input type='text' id="col_val" value={value} onChange={onValueChange}/>
            <br/>
            <input type="submit" value="Apply"/>
            <button onClick={cancelFilter}>Cancel</button>
        </form>
    )
}

export default ColumnFilter;