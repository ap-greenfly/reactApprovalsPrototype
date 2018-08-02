import React from 'react';
import PropTypes from 'prop-types';

const ListRow = ({ item }) => {
    return (
        <tr>
            <td>{ item.request.title }</td>
            <td>{ item.created }</td>
            <td>{ item.request.mediaRequestId ? 'Content Request' : 'Share Request' }</td>
            <td>{ item.status }</td>
            <td>{ item.due }</td>
            <td>...</td>
        </tr>
    );
};

ListRow.propTypes = {
    item: PropTypes.object.isRequired
};

export default ListRow;
