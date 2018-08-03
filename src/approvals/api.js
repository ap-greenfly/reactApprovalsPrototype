import Axios from 'axios';

const QUERY_APPROVAL = 'query Approval($id:ID!){approval(id:$id){id instructions created due completed lapsed locked status approvers{id user{id firstName lastName name roles photo}rejected approved status}mediaRequest{id contributors{id firstName lastName name contributorManager{id}photo}}shareRequest{id contributors{id firstName lastName name contributorManager{id}photo}}}}';

class ApprovalsApi {
    static getApprovals(payload = {
        page: 1,
        pageSize: 20,
        type: 'pending',
        keywords: ''
    }) {
        return Axios.get('/ajax/approvals', {
            params: payload
        });
    }

    static deleteApproval(approval) {
        let url;

        if (approval.request.mediaRequestId) {
            url = `/ajax/media-requests/${approval.request.mediaRequestId}`;
        } else {
            url = `/ajax/shareRequests/${approval.request.shareRequestId}`
        }

        return Axios.delete(url);
    }

    static getApproval(id) {
        let approvalData;

        return Axios.post('/graphql', {
            query: QUERY_APPROVAL,
            variables: { id }
        })
            .then(function(response) {
                if (response.data.errors) {
                    return Promise.reject(response.data.errors[0].message);
                }

                approvalData = response.data.data.approval;

                if (approvalData.mediaRequest) {
                    return Axios.get(`/ajax/media-requests/${approvalData.mediaRequest.id}`);
                } else {
                    return Axios.get(`/ajax/shareRequests/${approvalData.shareRequest.id}`);
                }
            })
            .then(({ data }) => {
                return {
                    id: approvalData.id,
                    approval: approvalData,
                    request:  data,
                    type: approvalData.mediaRequest ? 'MEDIA' : 'SHARE'
                };
            })
            .catch(error => Promise.reject(error.response));
    }
}

export default ApprovalsApi;
