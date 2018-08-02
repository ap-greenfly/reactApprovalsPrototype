import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchApprovalsList, approvalsListPayload } from '../../actions/listActions'

import ListRow from '../ListRow';
import UltimatePaginationBootstrap4 from 'react-ultimate-pagination-bootstrap-4'

class ApprovalsListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        this.fetchList().then(() => {
            this.setState({initialized: true});
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.type !== prevProps.match.params.type) {
            this.fetchList(1);
        }
    }

    fetchList(page) {
        if (page) {
            this.props.dispatch(approvalsListPayload({page: page}));
        }

        return this.props.dispatch(fetchApprovalsList({ type: this.props.match.params.type }));
    }

    onPageChange(page) {
        this.fetchList(page);
    }

    render() {
        const { type } = this.props.match.params;
        const { listItems } = this.props;
        const loading = this.props.listMeta.isFetching;
        const pagination = this.props.listMeta.pagination;

        return (
            <div>
                <h1 className="text-capitalize">
                    {type}
                    {this.state.initialized && loading && <small className="text-muted ml-auto">...loading</small>}
                </h1>
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
                    {!this.state.initialized &&
                        <tr>
                            <td colSpan="100">
                                <div className="text-muted text-lg-center">Loading&hellip;</div>
                            </td>
                        </tr>
                    }
                    {this.state.initialized && !listItems.length &&
                        <tr>
                            <td colSpan="100">
                                <div className="text-muted text-lg-center">No approvals found!</div>
                            </td>
                        </tr>
                    }
                    { !loading &&
                        listItems.map(item => {
                            return <ListRow item={item} key={item.id}/>
                        })
                    }
                    </tbody>
                </table>

                {!loading && pagination && pagination.totalPages &&
                    <UltimatePaginationBootstrap4
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onChange={this.onPageChange}
                    />
                }
            </div>
        );
    }
}

ApprovalsListPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    listItems: PropTypes.array.isRequired,
    listMeta: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        listItems: state.approvalsList.items,
        listMeta: state.approvalsList.meta
    };
}

export default connect(mapStateToProps)(ApprovalsListPage);
