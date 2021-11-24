import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './components/NavbarComponent';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductManagement from './pages/ProductManagement';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path="/home-page" element={<HomePage/>}/>
          <Route path="/auth-page" element={<AuthPage/>}/>
          <Route path="/product-page" element={<ProductManagement/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;