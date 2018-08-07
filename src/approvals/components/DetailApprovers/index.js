import React from 'react';
import PropTypes from 'prop-types';

class ApprovalsDetailApprovers extends React.Component {
    render () {
        const { approvers } = this.props;

        return (
            <ul>
                {approvers.map(approver => {
                    return <li key={ approver.id }>{ approver.user.name }</li>;
                })}
            </ul>
        );
    }
}

ApprovalsDetailApprovers.propTypes = {
    approvers: PropTypes.array.isRequired
};

export default ApprovalsDetailApprovers;
