import axios from 'axios';
import React from 'react';
import { Button, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { loginAction } from "../redux/actions";
import { connect } from "react-redux"
import { Navigate } from 'react-router';
import { API_URL } from '../helper';

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // passwordShown:false
            logPassShow: "Show",
            logPassType: "password",
            regPassShow: "Show",
            regPassType: "password",
            toastOpen: false,
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
        }
    }
    // btnPasswordVisibility=()=>{
    //     const{passwordShown} =this.state
    //     this.setState({passwordShown:!passwordShown});
    // }
    btnShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }
    btnShowPassRegis = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: "Hide",
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: "Show",
                regPassType: "password"
            })
        }
    }

    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    }
    btnLogin = () => {
        this.props.loginAction(this.state.email, this.passwordLogin.value)
        
    }
    btnRegis = () => {
        if (this.usernameRegis.value == "" || this.emailRegis.value == "" || this.passwordRegis.value == "" || this.confPasswordRegis == "") {
            // alert("Lengkapi semua data")
            this.setState({
                toastOpen: true,
                toastHeader: "Register Warning",
                toastIcon: "warning",
                toastMessage: "Isi semua form"
            })
        } else {
            if (this.passwordRegis.value == this.confPasswordRegis.value) {
                if (this.emailRegis.value.includes("@")) {

                    axios.post(`${API_URL}/dataUser`, {
                        username: this.usernameRegis.value,
                        email: this.emailRegis.value,
                        password: this.passwordRegis.value,
                        role: "user",
                        status: "active",
                        cart: []
                    }).then((response) => {
                        // alert("Registrasi Berhasil")
                        this.setState({
                            toastOpen: true,
                            toastHeader: "Register Status",
                            toastIcon: "success",
                            toastMessage: "Registrasi Berhasil"
                        })

                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    // alert("Email salah")
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Warning",
                        toastIcon: "warning",
                        toastMessage: "Email salah"
                    })
                }
            } else {
                // alert("Password tidak sesuai")
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastMessage: "Password tidak sesuai"
                })
            }
        }
    }
    render() {
        // const { passwordShown } = this.state
        if (this.props.iduser){
            return <Navigate to="/"/>
        }
        return (
            <Container className="p-5">
                <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed" }}>
                        <ToastHeader icon={this.state.toastIcon} toggle={() => this.setState({ toastOpen: false })}>
                            {this.state.toastHeader}

                        </ToastHeader>
                        <ToastBody>
                            {this.state.toastMessage}
                        </ToastBody>

                    </Toast>
                </div>
                <h2 style={{ fontWeight: 'bold', textAlign: "center" }}>Pilihan Masuk</h2>
                <p className="text-center">Masuk dan selesaikan pesanan dengan data diri anda atau daftar untuk menikmati semua layanan</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan masuk ke akun anda</h3>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email anda"
                                onChange={(event) => this.handleInput(event.target.value, "email")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.logPassType} id="textPassword" placeholder="Masukkan Password anda"
                                    innerRef={(element) => this.passwordLogin = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btnShowPassLogin}>
                                    {this.state.logPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btnLogin}>Masuk</Button>
                    </div>
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan buat akun anda</h3>
                        <FormGroup>
                            <Label for="textUsername">Username</Label>
                            <Input type="text" id="textUsername" placeholder="Masukkan Username Anda"
                                innerRef={(element) => this.usernameRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                innerRef={(element) => this.emailRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btnShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Konfirmasi Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Konfirmasi Password Anda"
                                    innerRef={(element) => this.confPasswordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btnShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btnRegis}>Daftar</Button>
                    </div>
                </div>


            </Container>
        );
    }
}
const mapToProps = (state) =>{
    return{
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { loginAction })(AuthPage);