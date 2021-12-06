import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Collapse, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem, Spinner, Input, InputGroup } from 'reactstrap';
import { connect } from 'react-redux'
import { logOutAction } from '../redux/actions';
class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false,
            openToggle: false
        }
    }

    toggle = () => {
        this.setState({
            openToggle: !this.state.openToggle
        })

    }

    totalCart = () => {
        let total = 0
        this.props.cart.forEach((value) => {
            total += value.qty
        });
        return total
    }

    render() {
        return (
            <Navbar expand="md" className="shadow bg-white rounded">
                <NavbarBrand>
                    <Link to="/">
                        <img src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" alt="logo-brand" width="50px" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link className="nav-link" to="/products" style={{ color: "black" }}>
                                Product
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{ color: "black" }}>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {/* <div className="col-md-6" >
                        <InputGroup style={{ width: "50%", margin: "auto" }}>
                            <Input placeholder="Cari Barang" />
                            <Button outline color="primary"><span class="material-icons">
                                search
                            </span>
                            </Button>
                        </InputGroup>
                    </div> */}
                    {
                        this.props.loading ?
                            <Spinner style={{ marginLeft: "auto", marginRight: 10 }}>
                                Loading...
                            </Spinner>
                            :

                            this.props.username ?
                                <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                    <DropdownToggle caret nav size="sm" outline className="d-flex align-items-center" style={{ color: "#0984e3" }}>
                                        Hello,<b style={{ fontWeight: "bold" }}>{this.props.username}</b>
                                    </DropdownToggle>
                                    {
                                        this.props.role == "user"
                                            ?
                                            <DropdownMenu right>
                                                <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    <DropdownItem>
                                                        Cart <span className="badge badge-danger">{this.totalCart()}</span>
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem>
                                                    <Link to="/history-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        Transactions History
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        Profile
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.logOutAction() }}>
                                                    Keluar
                                                </DropdownItem>
                                            </DropdownMenu>
                                            :
                                            <DropdownMenu right >
                                                <DropdownItem>
                                                    <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        Products Management
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to="/transaction-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        Transactions Management
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.logOutAction() }}>
                                                    Keluar
                                                </DropdownItem>
                                            </DropdownMenu>
                                    }

                                </UncontrolledDropdown>
                                :

                                <Link to="/auth-page" style={{ marginLeft: "auto" }}>
                                    <Button type="button" color="success" outline>Masuk dan Daftar</Button>
                                </Link>

                    }
                </Collapse>
            </Navbar>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        cart: state.userReducer.cart
    }
}
export default connect(mapToProps, { logOutAction })(NavbarComponent);