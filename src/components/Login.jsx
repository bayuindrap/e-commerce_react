import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h3>
                    Silahkan masuk ke akun Anda
                </h3>
                <p>
                    Silahkan masuk ke akun Anda untuk menyelesaikan pembayaran dengan data pribadi Anda.
                </p>

            <form>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                value={this.props.logEmail} onChange={(event) => this.props.handleInput(event.target.value, "logEmail")}
                />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                value={this.props.logPass} onChange={(event) => this.props.handleInput(event.target.value, "logPass")}
                />
            </div>
            <button type="button" className="btn btn-primary" style={{ width: "564px"}} onClick={this.props.btMasuk}>Masuk</button>
            </form>

            </div>
         );
    }
}
 

 
export default Login;