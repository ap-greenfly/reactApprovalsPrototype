import React from 'react';
import PropTypes from 'prop-types';

class ApprovalsDetailContributors extends React.Component {
    render () {
        const { contributors } = this.props;

        return (
            <ul>
                {contributors.map(contributor => {
                    return <li key={ contributor.id }>{ contributor.name }</li>;
                })}
                {!contributors.length &&
                    <li className="text-muted">
                        No contributors found, or request has no contribs, or this is a media request (which we are not
                        currently loading contribs.
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
