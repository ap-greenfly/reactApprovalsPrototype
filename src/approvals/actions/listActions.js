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
                const { data } = response;

                // refetch last page if currently request page is invalid
                if (!data.items.length && data.pagination.totalResults > 0 && data.pagination.page > 1) {
                    return Axios.get('/ajax/approvals', {
                        params: Object.assign({}, getState()[subState].payload, {page: data.pagination.totalPages})
                    });
                } else {
                    return response;
                }
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
