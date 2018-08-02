import * as actions from '../actions/listActions';

export default function approvalListReducer(state = {
    items: [],
    meta: {
        isFetching: false,
        pagination: null
    },
    payload: {
        page: 1,
        pageSize: 20,
        type: 'pending'
    }
}, action) {
    switch (action.type) {
        case actions.APPROVALS_LIST_FETCH:
            return { ...state, meta: { ...state.meta, isFetching: true } };

        case actions.APPROVALS_LIST_PAYLOAD:
            return { ...state, payload: { ...state.payload, ...action.payload } };

        case actions.APPROVALS_LIST_FETCH_DONE:
            if (!action.error) {
                return Object.assign({}, state, {
                    items: action.payload.items,
                    meta: {
                        ...state.meta,
                        pagination: action.payload.pagination,
                        isFetching: false
                    },
                    payload: { ...state.payload, page: action.payload.pagination.page }
                });
            } else {
                return Object.assign({}, state, {meta: { ...state.meta, isFetching: false }});
            }

        default:
            return state;
    }
}
