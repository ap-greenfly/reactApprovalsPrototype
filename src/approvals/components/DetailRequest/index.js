import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

function ApprovalsDetailRequest({ request }) {
    const createdDate = new Date((request.created || request.createdDate)).toLocaleDateString();
    const creatorName = (request.createdBy) ? request.createdBy.name : request.user.name;

    return (
        <div>
            <h2 className={styles.headerItalic}>
                {request.content || request.instructions}
                <span className={styles.header__child}> ({request.hasOwnProperty('platforms') ? 'share' : 'media'})</span>
            </h2>
            <h6>Requested by { creatorName } on { createdDate }</h6>
        </div>
    );
}

ApprovalsDetailRequest.propTypes = {
    request: PropTypes.object.isRequired
};

export default ApprovalsDetailRequest;
