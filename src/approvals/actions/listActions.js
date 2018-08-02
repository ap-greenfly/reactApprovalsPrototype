import Axios from 'axios';

export const APPROVALS_LIST_FETCH = 'APPROVALS_LIST_FETCH';
export const APPROVALS_LIST_PAYLOAD = 'APPROVALS_LIST_PAYLOAD';
export const APPROVALS_LIST_FETCH_DONE = 'APPROVALS_LIST_FETCH_DONE';

const subState = 'approvalsList';

export function fetchApprovalsList(payload) {
    return (dispatch, getState) => {
        dispatch(approvalsListPayload(payload));
        dispatch(fetchApprovalsListBegin());

        return Axios.get('/ajax/approvals', {
            params: getState()[subState].payload
        })
            .then(response => {
                dispatch(fetchApprovalsListDone(response.data));
            })
            .catch(response => {
                dispatch(fetchApprovalsListDone(null, response.data));
            });
    }
}

export function approvalsListPayload(payload) {
    return { type: APPROVALS_LIST_PAYLOAD, payload: payload };
}

export function fetchApprovalsListBegin() {
    return { type: APPROVALS_LIST_FETCH };
}

export function fetchApprovalsListDone(data, error) {
    if (!error) {
        return {
            type: APPROVALS_LIST_FETCH_DONE,
            payload: data
        }
    } else {
        return {
            type: APPROVALS_LIST_FETCH_DONE,
            payload: null,
            error
        }
    }
}
