import React from "react";
import Login from "./Login";
import Register from "./Regsiter";
import axios from "axios";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confPassword: "",
            logEmail: "",
            logPass: "",
            dataUser: []

        }
    }




    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get("http://localhost:2000/dataUser")
            .then((response) => {
                this.setState({ dataUser: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    handleInput = (value, propState) => {

        this.setState({ [propState]: value })
    }

    btDaftar = () => {
        let { username, email, password, confPassword } = this.state
        if (password === confPassword) {
            axios.post("http://localhost:2000/dataUser", {
                username, email, password, role: "user"
            }).then((response) => {
                this.getData()
                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    confPassword: "",
                })
                alert(`Register Berhasil`)
            }).catch((err) => {
            })

        } else {
            alert(`Password dan konfirmasi Password tidak sesuai`)
        }

    }


    btMasuk = () => {
        let { dataUser, logEmail, logPass } = this.state
        let index = null;
        for (let i = 0; i < dataUser.length; i++) {
            if (dataUser[i].email === logEmail && dataUser[i].password === logPass) {
               index = i
            }
        }
        if (index != null) {
            alert(`${dataUser[index].username} Berhasil Login ✔`)
            this.setState({
                logEmail: "",
                logPass: "",
            })
        } else {
            alert("Login Gagal ❌")
        }
    }

    render() {
        return (
            <div className="container-fluid">

                <div id="head" className="text-center my-4">
                    <h1>Pilihan Masuk</h1>
                    <p className="lead"> Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA.</p>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Login
                                handleInput={this.handleInput}
                                logEmail={this.state.logEmail}
                                logPass={this.state.logPass}
                                btMasuk={this.state.btMasuk}
                            />
                        </div>
                        <div className="col-6">
                            <Register
                                handleInput={this.handleInput}
                                username={this.state.username}
                                email={this.state.email}
                                password={this.state.password}
                                confPassword={this.state.confPassword}
                                btDaftar={this.btDaftar}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Form;