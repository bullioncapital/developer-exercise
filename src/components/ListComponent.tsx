import React from 'react';
import { ICountDataRes } from '../server/Queries';

interface IListComponentProps {
    listItems: Array<ICountDataRes>
}

interface IListComponentState { }

export class ListComponent extends React.Component<IListComponentProps, IListComponentState> {
    private _createList() {
        let returnArray: Array<JSX.Element> = [];
        this.props.listItems.forEach(item => {
            returnArray.push(<li className="list-group-item">
                <label>Count: {item.count.toString()} Timestamp: {item.timeStamp}</label>
            </li>)
        });
        
        return returnArray;
    }

    render() {
        return (
            <div className='react-ListComponent'>
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <ul className="list-group">
                            {this._createList()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}