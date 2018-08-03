import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import approvalsList from '../../approvals/reducers/listReducer';
import approvalDetail from '../../approvals/reducers/detailReducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    approvalsList,
    approvalDetail
});

export default rootReducer;
