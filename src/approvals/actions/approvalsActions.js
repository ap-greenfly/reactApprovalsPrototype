import ApprovalsApi from '../api';

export const APPROVALS_DELETE_START = 'APPROVALS_DELETE_START';
export const APPROVALS_DELETE_DONE = 'APPROVALS_DELETE_DONE';

export function deleteApproval(approval) {
    return (dispatch) => {
        dispatch(deleteApprovalStart(approval));

        let promise = ApprovalsApi.deleteApproval(approval);

        return promise
            .then(() => {
                dispatch(deleteApprovalDone(approval));
            })
            .catch(error => {
                dispatch(deleteApprovalDone(null, error.response.data));
                return Promise.reject(error.response);
            });

    }
}
export function deleteApprovalStart(approval) {
    return {type: APPROVALS_DELETE_START, payload: approval};
}
export function deleteApprovalDone(data, error) {
    if (!error) {
        return {
            type: APPROVALS_DELETE_DONE,
            payload: data
        }
    } else {
        return {
            type: APPROVALS_DELETE_DONE,
            payload: data,
            error
        }
    }
}

