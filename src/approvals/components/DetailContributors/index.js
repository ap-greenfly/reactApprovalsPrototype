import React from 'react';
import PropTypes from 'prop-types';

import ApprovalDetailUserListItem from '../DetailUserListItem';

class ApprovalsDetailContributors extends React.Component {
    render () {
        const { contributors } = this.props;

        return (
            <ul>
                {contributors.map(contributor => {
                    return <ApprovalDetailUserListItem
                        key={ contributor.id }
                        user={ contributor }
                        isCm={ false }
                        canRemove={ false }
                    />
                })}
                {!contributors.length &&
                    <li className="text-muted">
                        No contributors found, or request has no contribs, or currently loading contribs.
                    </li>
                }
            </ul>
        );
    }
}

ApprovalsDetailContributors.propTypes = {
    contributors: PropTypes.array.isRequired
};

export default ApprovalsDetailContributors;
