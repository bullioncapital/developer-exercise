import React from 'react';

interface IButtonProps {
    onClickCallBack: () => void;
    buttonTitle: string;
}

interface IButtonState {}

export class Button extends React.Component<IButtonProps, IButtonState> {
    render() {
        return (
            <div className='react-ButtonComponent'>
                <button className="btn btn-primary" onClick={this.props.onClickCallBack.bind(this)}>
                    <span>{this.props.buttonTitle}</span>
                </button>
            </div>
        );
    }
}