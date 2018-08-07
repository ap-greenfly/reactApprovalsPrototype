import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ListRow = ({ item, onClickDelete }) => {
    // this is generally frowned upon, but since its only 1 function, we'll just define
    // this here as opposed to switching to a class component
    const onClickDeleteHandler = () => {
        onClickDelete(item);
    };

    return (
        <tr>
            <td><Link to={`/approvals/${item.id}/details`}>{ item.request.title }</Link></td>
            <td>{ item.created }</td>
            <td>{ item.request.mediaRequestId ? 'Content Request' : 'Share Request' }</td>
            <td>{ item.status }</td>
            <td>{ item.due }</td>
            <td>
                <UncontrolledDropdown size="sm">
                    <DropdownToggle>&hellip;</DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to={`/approvals/${item.id}/details`}>View</DropdownItem>
                        <DropdownItem onClick={onClickDeleteHandler}>Delete</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    );
};

ListRow.propTypes = {
    item: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired
};

export default ListRow;
