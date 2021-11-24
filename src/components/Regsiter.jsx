import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <h3>
                    Silahkan buat akun Anda
                </h3>

                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={this.props.username} onChange={(event) => this.props.handleInput(event.target.value, "username")}
                        />

                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Email</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            value={this.props.email} onChange={(event) => this.props.handleInput(event.target.value, "email")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            value={this.props.password} onChange={(event) => this.props.handleInput(event.target.value, "password")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Confirmation Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            value={this.props.confrPassword} onChange={(event) => this.props.handleInput(event.target.value, "confrPassword")}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" style={{ width: "564px" }} onClick={this.props.btDaftar}>Daftar</button>
                </form>

            </div>
        );
    }
}

export default Register;