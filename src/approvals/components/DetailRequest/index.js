import React from 'react';
import PropTypes from 'prop-types';

function ApprovalsDetailRequest({ request }) {
    const createdDate = new Date((request.created || request.createdDate)).toLocaleDateString();
    const creatorName = (request.createdBy) ? request.createdBy.name : request.user.name;

    return (
        <div>
            <h2>{request.content || request.instructions}</h2>
            <h6>Requested by { creatorName } on { createdDate }</h6>
        </div>
    );
}

ApprovalsDetailRequest.propTypes = {
    request: PropTypes.object.isRequired
};

export default ApprovalsDetailRequest;
