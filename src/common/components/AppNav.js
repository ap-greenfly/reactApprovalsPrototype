import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap'

class AppNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar expand="md" color="light">
                    <Link to="/"><NavbarBrand tag="span">Greenfly Approvals React</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/approvals/list/pending" className="nav-link">Pending</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/approvals/list/sent" className="nav-link">Sent</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/approvals/list/lapsed" className="nav-link">Lapsed</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default AppNav;
