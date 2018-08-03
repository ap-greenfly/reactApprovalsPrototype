import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import approvalsList from '../../approvals/reducers/listReducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    approvalsList
});

export default rootReducer;
