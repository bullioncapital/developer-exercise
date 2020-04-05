import React from 'react';

interface ICounterState {}

interface ICounterProps {
    count: string
}

export class Counter extends React.Component<ICounterProps, ICounterState> {
    render() {
        return (
            <div className='react-CounterComponent'>
                <div>Current count: {this.props.count}</div>
            </div>
        );
    }
}