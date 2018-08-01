import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ApprovalsListPage extends React.Component {
    render() {
        const { type } = this.props.match.params;

        return (
            <div>
                <h1 className="text-capitalize">{type}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Request</th>
                            <th>Created</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="100">
                                Approvals list items will go here. Then you can click one to <Link to="/approvals/test/details">view its details</Link>. This is just
                                a placeholder.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

ApprovalsListPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default ApprovalsListPage;
