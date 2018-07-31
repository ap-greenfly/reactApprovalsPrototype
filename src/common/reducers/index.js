import {combineReducers} from 'redux';
import approvalsList from '../../approvals/reducers/listReducer';

const rootReducer = combineReducers({
    approvalsList
});

export default rootReducer;
