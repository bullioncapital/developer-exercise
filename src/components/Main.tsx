import React from 'react';
import { Button } from './Button';
import { Counter } from './Counter';
import { ICountDataRes } from '../server/Queries';
import { RestServices } from '../api/RestServices';
import { ListComponent } from './ListComponent';
import 'bootstrap/dist/css/bootstrap.css';
import './css/main.css';

interface IMainState {
    count: number;
    dataList: Array<ICountDataRes>;
}

interface IMainProps {
}

export class Main extends React.Component<IMainProps, IMainState> {
    private _services: RestServices = new RestServices();
    private _increaseDecreaseNum: number = 5;
    constructor(props: IMainProps) {
        super(props);
        this.state = { count: null, dataList: [] };
    }

    componentDidMount() {
        this._services.getCount().then(res => {
            this.setState({ count: res.data[0].count, dataList: res.data });
        }).catch(err => {
            throw (err);
        });
    }

    public render(): JSX.Element {
        return (
            <div className="app-Main">
                <div className='react-Counter'>
                    {(this.state.count !== null) ?
                    <Counter count={this.state.count.toString()} /> : <div>Waiting for data</div>}
                </div>
                <div className="react-AddGroup">
                    <div className='react-AddBtn'>
                        <Button buttonTitle={'Add'} onClickCallBack={this._addCountCallback.bind(this)} />
                    </div>
                </div>
                <div className="react-SubtractGroup">
                    <div className='react-SubtractGroup'>
                        <Button buttonTitle={'Subtract'} onClickCallBack={this._subtractCountCallback.bind(this)} />
                    </div>
                </div>
                <div className="panel-heading"><h3 className="panel-title">History</h3></div>
                <div className='react-TransactionHistory'>
                {(this.state.dataList.length > 0) ?
                   <ListComponent listItems={this.state.dataList}/> : <div>Waiting for data</div>}
                </div>
            </div>
        );
    }

    private _addCountCallback() {
        let currentCount = Number(this.state.dataList[0].count);
        currentCount += this._increaseDecreaseNum;
        this._services.modifyCount(currentCount).then(res => {
            console.log(res);
            this.setState({ count: res.data[0].count, dataList: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    private _subtractCountCallback() {
        let currentCount = Number(this.state.dataList[0].count);
        currentCount -= this._increaseDecreaseNum;
        this._services.modifyCount(currentCount).then(res => {
            console.log(res);
            this.setState({ count: res.data[0].count, dataList: res.data });
        }).catch(err => {
            console.log(err);
        });
    }
}