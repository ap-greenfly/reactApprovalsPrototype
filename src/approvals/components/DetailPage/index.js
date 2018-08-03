import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchApprovalDetails, approvalDetailReset} from '../../actions/detailActions';

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
        const { isLoaded, request } = this.props.approvalDetail;

        return (
            <div>
                <h1>Approval Details</h1>
            {!isLoaded && <h2 className="text-muted">Loading...</h2>}
            {isLoaded &&
                <div>
                    <h2>{request.content || request.instructions}</h2>
                    <p>
                        <label><strong>Instructions:</strong></label>{" "}
                        {request.question || request.instructions}
                    </p>
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
