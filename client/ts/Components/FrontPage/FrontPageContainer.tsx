import * as _ from 'lodash'
import { connect } from 'react-redux'

import { FrontPage } from './FrontPage'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import axios from 'axios';


const mapStateToProps = (state: RootState) => ( {
    json: state.data.json
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    recieveJsonFromServer: async (passback:string) => {
        let retrieved = await axios.get('http://localhost:8080/', {withCredentials: true})
        return retrieved
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FrontPage)