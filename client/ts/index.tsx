import * as React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router-dom'
import { FrontPage } from './Components/FrontPage/FrontPage'
import FrontPageContainer from './Components/FrontPage/FrontPageContainer';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.render(
    <Provider store={store}>
        <FrontPageContainer></FrontPageContainer>
    </Provider>,
    document.getElementById('portal')
)