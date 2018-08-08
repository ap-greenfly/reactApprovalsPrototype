import ApprovalsApi from '../api';

export const APPROVAL_DETAIL_FETCH_START = 'APPROVAL_DETAIL_FETCH_START';
export const APPROVAL_DETAIL_FETCH_DONE = 'APPROVAL_DETAIL_FETCH_DONE';
export const APPROVAL_DETAIL_RESET = 'APPROVAL_DETAIL_RESET';
export const APPROVAL_DETAIL_REMOVE_APPROVER_START = 'APPROVAL_DETAIL_REMOVE_APPROVER_START';
export const APPROVAL_DETAIL_REMOVE_APPROVER_DONE = 'APPROVAL_DETAIL_REMOVE_APPROVER_DONE';
export const APPROVAL_DETAIL_FILTER_APPROVERS = 'APPROVAL_DETAIL_FILTER_APPROVERS';

export function fetchApprovalDetails(id) {
    return dispatch => {
        dispatch(fetchApprovalDetailsStart(id));

        return ApprovalsApi.getApproval(id)
            .then(data => dispatch(fetchApprovalDetailDone(data)))
            .catch(error => dispatch(fetchApprovalDetailDone(id, error)));
    }
}
export function fetchApprovalDetailsStart(id) {
    return {type: APPROVAL_DETAIL_FETCH_START, payload: id};
}
export function fetchApprovalDetailDone(data, error) {
    if (!error) {
        return {
            type: APPROVAL_DETAIL_FETCH_DONE,
            payload: data
        }
    } else {
        return {
            type: APPROVAL_DETAIL_FETCH_DONE,
            payload: data,
            error
        }
    }
}

export function approvalDetailReset() {
    return { type: APPROVAL_DETAIL_RESET };
}


export function approvalDetailRemoveApprover(approverId) {
    return dispatch => {
        dispatch(approvalDetailRemoveApproverStart(approverId));

        return ApprovalsApi.removeApprover(approverId)
            .then(() => dispatch(approvalDetailRemoveApproverDone({ id: approverId })))
            .catch(error => dispatch(approvalDetailRemoveApproverDone({ id: approverId }, error)));
    }
}
export function approvalDetailRemoveApproverStart(id) {
    return {type: APPROVAL_DETAIL_REMOVE_APPROVER_START, payload: id};
}
export function approvalDetailRemoveApproverDone(data, error) {
    if (!error) {
        return {
            type: APPROVAL_DETAIL_REMOVE_APPROVER_DONE,
            payload: data
        }
    } else {
        return {
            type: APPROVAL_DETAIL_REMOVE_APPROVER_DONE,
            payload: data,
            error
        }
    }
}


export function approvalDetailFilterApprovers(filter) {
    return {type: APPROVAL_DETAIL_FILTER_APPROVERS, payload: filter};
}
