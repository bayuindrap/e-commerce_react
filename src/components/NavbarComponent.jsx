import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarText, Button, NavItem, NavLink, Collapse, Nav, NavbarToggler } from 'reactstrap';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false
        }
    }
    render() {
        return (
            <Navbar expand="md">
                <NavbarBrand>
                    <Link to="/home-page">
                        <img alt="..." width="50px" src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link to="/product-page" style={{ marginLeft: "auto" }}>
                                Product Management
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <Link to="/auth-page">
                            <Button type="button" style={{ marginLeft: "auto" }}>Masuk dan Daftar</Button>
                        </Link>
                    </NavbarText>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavbarComponent;