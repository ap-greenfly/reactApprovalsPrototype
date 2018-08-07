import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchApprovalDetails, approvalDetailReset} from '../../actions/detailActions';

import ApprovalsDetailRequest from '../DetailRequest';
import ApprovalsDetailApprovers from '../DetailApprovers';
import ApprovalsDetailContributors from '../DetailContributors';

class ApprovalsDetailPage extends React.Component {
    componentDidMount() {
        this.fetchDetails();
    }

    componentWillUnmount() {
        this.props.dispatch(approvalDetailReset());
    }

    fetchDetails() {
        return this.props.dispatch(fetchApprovalDetails(this.props.match.params.id));
    }

    render() {
        const { approval, isLoaded, request } = this.props.approvalDetail;

        return (
            <div>
            {!isLoaded && <h2 className="text-muted">Loading...</h2>}

            {isLoaded &&
                <div className="detail">
                    <div className="detail__request"><ApprovalsDetailRequest request={request}/></div>
                    <div className="detail__approvers">
                        <h4>Approvers</h4>
                        <ApprovalsDetailApprovers approvers={approval.approvers}/>
                    </div>
                    <div className="detail__contributors">
                        <h4>Contributors</h4>
                        <ApprovalsDetailContributors contributors={request.contributors || []}/>
                    </div>
                    <div className="detail__statusAndComments">Status &amp; Comments TBD</div>
                </div>
            }
            </div>
        );
    }
}

ApprovalsDetailPage.propTypes = {
    approvalDetail: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        approvalDetail: state.approvalDetail
    };
}

export default connect(mapStateToProps)(ApprovalsDetailPage);
