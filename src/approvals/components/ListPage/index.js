import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchApprovalsList, approvalsListPayload } from '../../actions/listActions'
import { DebounceInput } from 'react-debounce-input';

import { Table } from 'reactstrap';
import UltimatePaginationBootstrap4 from 'react-ultimate-pagination-bootstrap-4'
import ListRow from '../ListRow';

class ApprovalsListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false,
            search: props.listPayload.keywords
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.searchOnChange = this.searchOnChange.bind(this);
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
        window.scroll(0, 0, {behavior: 'smooth'});
        this.fetchList(page);
    }

    searchOnChange(event) {
        this.setState({search: event.target.value});
        this.setFilter('keywords', event.target.value);
    }

    setFilter(name, value) {
        let payloadUpdate = {
            page: 1
        };

        payloadUpdate[name] = value;

        this.props.dispatch(approvalsListPayload(payloadUpdate));
        this.fetchList();
    }

    render() {
        const { type } = this.props.match.params;
        const { listItems } = this.props;
        const loading = this.props.listMeta.isFetching;
        const pagination = this.props.listMeta.pagination;

        return (
            <div>
                <h1 className="text-capitalize d-flex align-items-center mt-4 mb-4">
                    <span>{type}</span>
                    {this.state.initialized && loading && <small className="text-muted ml-2">...loading</small>}
                    <div className="ml-auto">
                        <DebounceInput
                            className="form-control"
                            placeholder="Search..."
                            value={this.state.search}
                            onChange={this.searchOnChange}
                            debounceTimeout={350}
                        />
                    </div>
                </h1>
                <Table striped responsive>
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
                    {this.state.initialized &&
                        listItems.map(item => {
                            return <ListRow item={item} key={item.id}/>
                        })
                    }
                    </tbody>
                </Table>

                {!loading && pagination && pagination.totalPages > 0 &&
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
    match: PropTypes.object.isRequired,
    listPayload: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        listItems: state.approvalsList.items,
        listMeta: state.approvalsList.meta,
        listPayload: state.approvalsList.payload
    };
}

export default connect(mapStateToProps)(ApprovalsListPage);
