import * as actions from '../actions/detailActions';

const initialState = {
    id: null,
    type: null,
    isFetching: false,
    isLoaded: false,
    approval: {},
    approvers: [],
    request: {},
    approversFilter: {
        name: '',
        status: ''
    }
};

export default function approvalsDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actions.APPROVAL_DETAIL_FETCH_START:
            return Object.assign({}, state, { isFetching: true });

        case actions.APPROVAL_DETAIL_FETCH_DONE:
            if (!action.error) {
                return Object.assign({}, state, action.payload, {
                    approvers: action.payload.approval.approvers,
                    isLoaded: true,
                    isFetching: false
                });
            } else {
                return Object.assign({}, initialState, { isFetching: false });
            }

        case actions.APPROVAL_DETAIL_RESET:
            return Object.assign({}, initialState);

        case actions.APPROVAL_DETAIL_REMOVE_APPROVER_DONE:
            if (!action.error) {
                return Object.assign({}, state, {
                    approval: {
                        ...state.approval,
                        approvers: state.approval.approvers.filter((approver) => {
                            return approver.id !== action.payload.id;
                        })
                    }
                });
            } else {
                return state;
            }

        case actions.APPROVAL_DETAIL_FILTER_APPROVERS:
            return { ...state, approversFilter: { ...state.approversFilter, ...action.payload } };

        default:
            return state;
    }
}


// selectors
export function getFilteredApprovers(approvers, filters) {
    return approvers.filter(approver => {
        let nameFilter = true, statusFilter = true;

        if (filters.name.length) {
            nameFilter = approver.user.name.toLowerCase().includes(filters.name.toLowerCase());
        }

        if (filters.status.length) {
            statusFilter = approver.status === filters.status;
        }

        return nameFilter && statusFilter;
    });
}
