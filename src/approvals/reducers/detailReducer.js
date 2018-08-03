import * as actions from '../actions/detailActions';

const initialState = {
    id: null,
    type: null,
    isFetching: false,
    isLoaded: false,
    approval: {},
    request: {}
};

export default function approvalsDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actions.APPROVAL_DETAIL_FETCH_START:
            return Object.assign({}, state, { isFetching: true });

        case actions.APPROVAL_DETAIL_FETCH_DONE:
            if (!action.error) {
                return Object.assign({}, state, action.payload, {isLoaded: true, isFetching: false });
            } else {
                return Object.assign({}, initialState, { isFetching: false });
            }

        case actions.APPROVAL_DETAIL_RESET:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}
