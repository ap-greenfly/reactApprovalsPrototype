import ApprovalsApi from '../api';
import {APPROVALS_LIST_FETCH_DONE} from "./listActions";

export const APPROVAL_DELETE_START = 'APPROVAL_DELETE_START';
export const APPROVAL_DELETE_DONE = 'APPROVAL_DELETE_DONE';

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
    return {type: APPROVAL_DELETE_START, payload: approval};
}
export function deleteApprovalDone(data, error) {
    if (!error) {
        return {
            type: APPROVAL_DELETE_DONE,
            payload: data
        }
    } else {
        return {
            type: APPROVALS_LIST_FETCH_DONE,
            payload: data,
            error
        }
    }
}
