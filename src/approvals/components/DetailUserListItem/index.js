import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

class ApprovalsDetailUserListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: false
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(event) {
        event.preventDefault();

        this.setState({pending: true});

        this.props.onClickRemove(this.props.removeId);
    }

    render () {
        const { user, status, isCm, canRemove } = this.props;
        const avatarClassName = isCm ? 'avatar avatar--cm' : 'avatar';
        const style = this.state.pending ? {cursor: 'wait'} : {};
        let statusClassName = styles.user__status;
        if (status === 'APPROVED') {
            statusClassName = styles.user__statusApproved;
        } else if  (status === 'REJECTED') {
            statusClassName = styles.user__statusRejected;
        }

        return (
            <li className={styles.user} style={ style }>
                <span className={ avatarClassName } style={{backgroundImage: `url(${user.photo})`}}/>
                <span>{ user.name }</span>
                { canRemove && <a onClick={ this.handleRemove } href='#'>Remove</a> }
                { status && <span className={statusClassName}/> }
            </li>
        );
    }
}

ApprovalsDetailUserListItem.propTypes = {
    user: PropTypes.object.isRequired,
    status: PropTypes.string,
    isCm: PropTypes.bool.isRequired,
    canRemove: PropTypes.bool.isRequired,
    removeId: PropTypes.string,
    onClickRemove: PropTypes.func
};

export default ApprovalsDetailUserListItem;
