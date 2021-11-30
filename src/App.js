import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './component/navbar';
import Form from './component/Form';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './component/NavbarReact';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductManagement from './pages/ProductManagement';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction } from './redux/actions';
import ProductsPage from './pages/ProductsPage';
import { getProductsAction } from './redux/actions';
import { API_URL } from './helper';
import ProductDetail from './pages/ProductDetail';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
    this.getProducts()
  }

  keepLogin = () => {
    let local = localStorage.getItem("data")
    if (local) {
      local = JSON.parse(local)
      axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
        .then((res) => {
          console.log("keepLogin berhasil ==>", res.data)
          this.setState({ loading: false })
          this.props.loginAction(res.data[0])
        }).catch((err) => {
          console.log(err)
        })
    } else {
      this.setState({ loading: false })
    }
  }

  getProducts = () => {
    axios.get(`${API_URL}/products`)
      .then((response) => {
        this.props.getProductsAction(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products-detail" element={<ProductDetail />} />
        </Routes>

      </div>
    );
  }
}

export default connect(null, { loginAction, getProductsAction })(App);

