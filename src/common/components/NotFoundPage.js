import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

const NotFoundPage = () => {
    return (
        <div>
            <Alert color="danger">
                404 Page Not Found
            </Alert>
            <Link to="/"> Go back to homepage </Link>
        </div>
    );
};

export default NotFoundPage;
