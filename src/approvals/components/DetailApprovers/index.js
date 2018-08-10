import React from 'react';
import PropTypes from 'prop-types';

import { DebounceInput } from 'react-debounce-input';
import ApprovalDetailUserListItem from '../DetailUserListItem';

class ApprovalsDetailApprovers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFiltered: false,
            name: '',
            status: ''
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    handleFilterChange(event) {
        let filter = {};
        filter[event.target.name] = event.target.value;

        this.doFilter(filter)
    }

    clearFilters() {
        this.doFilter({
            name: '',
            status: ''
        });
    }

    doFilter(filterUpdate) {
        this.setState(filterUpdate, () => {
            this.props.onFilter(this.state);
        });
    }

    render () {
        const { approvers, remove } = this.props;

        return (
            <div>
                <div className="d-flex">
                    <div className="flex-grow-1 mb-3">
                        <DebounceInput
                            className="form-control"
                            placeholder="Search..."
                            value={this.state.name}
                            onChange={this.handleFilterChange}
                            name="name"
                            debounceTimeout={350}
                        />
                    </div>
                    <div className="ml-2">
                        <select name="status" className="form-control" value={this.state.status} onChange={this.handleFilterChange}>
                            <option value=''>All</option>
                            <option value='APPROVED'>Approved</option>
                            <option value='REJECTED'>Declined</option>
                            <option value='ACTIVE'>Pending</option>
                        </select>
                    </div>
                </div>
                <ul className="list-unstyled">
                    {approvers.map(approver => {
                        return <ApprovalDetailUserListItem
                            key={approver.id}
                            removeId={ approver.id }
                            user={approver.user}
                            isCm={approver.user.roles.includes('COMPANY_CONTRIBUTOR_MANAGER')}
                            canRemove={ !!approvers.length }
                            onClickRemove={ remove }
                            status={ approver.status }
                        />
                    })}

                    {!approvers.length &&
                        <li>
                            No approvers found. <a href="javascript:void(0)" onClick={this.clearFilters}>Clear filters</a> to view all approvers.
                        </li>
                    }
                </ul>
            </div>
        );
    }
}

ApprovalsDetailApprovers.propTypes = {
    approvers: PropTypes.array.isRequired,
    remove: PropTypes.func,
    onFilter: PropTypes.func.isRequired
};

export default ApprovalsDetailApprovers;
