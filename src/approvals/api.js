import Axios from 'axios';

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
}

export default ApprovalsApi
