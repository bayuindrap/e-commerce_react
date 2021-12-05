import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, FormGroup, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart } from '../redux/actions';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPayment: 0,
            detail: []
        }
    }

    componentDidMount() {
        this.printTotalPayment()
    }

    printTotalPayment = () => {
        let total = this.state.totalPayment
        this.props.cart.forEach((value) => {
            total += value.totalHarga
        });
        return this.setState({ totalPayment: total })
    }

    totalPayment = () => {
        let total = 0
        this.props.cart.forEach((value) => {
            total += value.totalHarga
        });
        return <h3 style={{ fontWeight: "bolder" }}>Rp {(total).toLocaleString()}</h3>
    }

    onBtRemove = (index) =>{
        this.props.cart.splice(index,1)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`,{cart:this.props.cart})
            .then((res)=>{
                this.props.updateUserCart(res.data.cart)
            }).catch((err)=>{
                console.log(err)
            })
        
    }



    printCart = () => {
        return this.props.cart.map((value, index) => {
            return (
                <div className="row shadow p-1 mb-3 bg-white rounded" >
                    <div className="col-md-2">
                        <img src={value.images} width="100%" />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center flex-column">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.nama}</h5>
                        <h4 style={{ fontWeight: 'bolder' }}>Rp {value.harga.toLocaleString()}</h4>
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.type}</h5>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ width: '50%' }}>
                                <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtDec(index)}>
                                        remove
                                    </span>
                                    <Input placeholder="qty" value={value.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtInc(index,value)}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <h4>Rp {(value.harga * value.qty).toLocaleString()}</h4>
                        </div>
                        <Button color="warning" style={{ border: 'none', float: 'right', marginLeft: "1vw" }} onClick={() => this.onBtRemove(index)}>Remove</Button>
                    </div>
                </div>
            )
        })
    }

    // onBtInc = (index) => {
    //     let temp = [...this.props.cart];
    //     temp[index].qty += 1
    //     axios.patch(`${API_URL}/users/${this.props.iduser}`, {
    //         cart: temp
    //     })
    //         .then((res) => {
    //             this.props.updateUserCart(res.data.cart)
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }

    // onBtDec=(index)=>{
    //     if(this.props.cart[index].qty > 1){
    //         this.props.cart[index].qty -= 1
    //         this.props.cart[index].totalHarga -= this.props.cart[index].harga
    //         console.log("qty", this.props.cart[index].qty)
    //         axios.patch(`${API_URL}/dataUser/${this.props.iduser}`,{cart:this.props.cart})
    //         .then((res)=>{
    //             this.props.updateUserCart(res.data.cart)
    //         }).catch((err)=>{
    //             console.log(err)
    //         })
    //     }
    // }

    onBtInc = (index) => {
        this.props.cart[index].qty += 1
        this.props.cart[index].totalHarga += this.props.cart[index].harga
        console.log("qty", this.props.cart[index].totalHarga)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, { cart: this.props.cart })
            .then((res) => {
                this.props.updateUserCart(res.data.cart)
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtDec = (index) => {
        if (this.props.cart[index].qty > 1) {
            this.props.cart[index].qty -= 1
            this.props.cart[index].totalHarga -= this.props.cart[index].harga
            console.log("qty", this.props.cart[index].qty)
            axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, { cart: this.props.cart })
                .then((res) => {
                    this.props.updateUserCart(res.data.cart)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }



    render() {
        return (<div>
            <h1 className="text-center mt-5">Keranjang Belanja</h1>
            <div className="row m-1">
                <div className="col-8">
                    {this.printCart()}
                </div>
                <div className="col-4">
                    <div className="shadow p-4 mb-3 bg-white rounded">
                        <h4>Total Payment</h4>
                        {this.totalPayment()}
                        <FormGroup>
                            <Label for="ongkir">Biaya Pengiriman</Label>
                            <Input type="text" id="ongkir" innerRef={elemen => this.ongkir = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="note">Notes</Label>
                            <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                        </FormGroup>
                        <div className="d-flex justify-content-end">
                            <Button type="button" color="success" onClick={this.onBtCheckOut}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { updateUserCart })(CartPage);