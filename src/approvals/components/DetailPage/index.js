import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/detailActions';
import { getFilteredApprovers } from '../../reducers/detailReducer';

import ApprovalsDetailRequest from '../DetailRequest';
import ApprovalsDetailApprovers from '../DetailApprovers';
import ApprovalsDetailContributors from '../DetailContributors';

class ApprovalsDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.removeApprover = this.removeApprover.bind(this);
        this.filterApprovers = this.filterApprovers.bind(this);
    }

    componentDidMount() {
        this.fetchDetails();
    }

    componentWillUnmount() {
        this.props.dispatch(actions.approvalDetailReset());
    }

    fetchDetails() {
        return this.props.dispatch(actions.fetchApprovalDetails(this.props.match.params.id));
    }

    getContributorList() {
        const { approval } = this.props.approvalDetail;
        return approval.mediaRequest ? approval.mediaRequest.contributors : approval.shareRequest.contributors;
    }

    removeApprover(approverId) {
        return this.props.dispatch(actions.approvalDetailRemoveApprover(approverId));
    }

    filterApprovers(filters) {
        this.props.dispatch(actions.approvalDetailFilterApprovers(filters));
    }

    render() {
        const { isLoaded, request } = this.props.approvalDetail;

        return (
            <div>
            {!isLoaded && <h2 className="text-muted">Loading...</h2>}

            {isLoaded &&
                <div className="detail">
                    <div className="detail__request"><ApprovalsDetailRequest request={request}/></div>
                    <div className="detail__approvers">
                        <h4>Approvers</h4>
                        <ApprovalsDetailApprovers
                            approvers={this.props.approvers}
                            remove={ this.removeApprover }
                            onFilter={this.filterApprovers}
                        />
                    </div>
                    <div className="detail__contributors">
                        <h4>Contributors</h4>
                        <ApprovalsDetailContributors contributors={this.getContributorList() || []}/>
                    </div>
                    <div className="detail__statusAndComments">Status &amp; Comments TBD</div>
                </div>
            }
            </div>
        );
    }
}

ApprovalsDetailPage.propTypes = {
    approvers: PropTypes.array.isRequired,
    approvalDetail: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        approvalDetail: state.approvalDetail,
        approvers: getFilteredApprovers(state.approvalDetail.approvers, state.approvalDetail.approversFilter)
    };
}

export default connect(mapStateToProps)(ApprovalsDetailPage);
