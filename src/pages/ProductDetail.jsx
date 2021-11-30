// import axios from 'axios';
// import React from 'react';
// import { connect } from 'react-redux';
// import { Container, Button, UncontrolledCollapse, Card, CardBody, Col, Form, FormGroup, Row, Input } from 'reactstrap';
// import { API_URL } from '../helper';


// class ProductDetail extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             detail: [],
//             counter: 0
//         }
//     }
//     componentDidMount() {
//         console.log("CEK URL DETAIL PAGE:", window.location)
//         axios.get(`${API_URL}/products${window.location.search}`)
//             .then((response) => {
//                 console.log(response.data)
//                 this.setState({ detail: response.data })
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
    // btnIncrement = (num) => {
    //     this.state.counter += num
    //     // this.setState({propertiState : dataTerbaru}) : Untuk melakukan update data pada state
    //     this.setState({
    //         counter: this.state.counter
    //     })
    // }
    // btnDecrement = (num) => {
    //     this.state.counter -= num
    //     this.setState({
    //         counter: this.state.counter
    //     })
    // }
    // printCart = () => {
//         return this.state.detail.map((value, index) => {
//             return <div>
//                 <div class="card" className="d-flex shadow p-5 mb-5 bg-white rounded" style={{}}>
//                     <Col>
//                         {/* <Row> */}

//                         {value.images.map((val, idx) => {
//                             return <img src={val} width="20%" alt={value.nama + index}
//                                 onClick={() => this.setState({ thumbnailIdx: idx, selectedIdx: index })} />
//                         })}

//                         {/* </Row> */}
//                     </Col>
//                     <Col>
//                         {
//                             this.state.selectedIdx == index ?
//                                 <img src={value.images[this.state.thumbnailIdx]} width="80%" alt={value.nama + index} />
//                                 :
//                                 <img src={value.images[0]} width="80%" alt={value.nama + index} />
//                         }

//                     </Col>
//                     <Col>
//                         <div className="card-body">
//                             <h5 className="card-title font-weight-bold ">{value.nama}</h5>
//                             <p className="card-text">{value.kategori}</p>
//                             <h2 className="card-title font-weight-bold">Rp.{value.harga.toLocaleString()}</h2>

//                             <FormGroup>

//                                 <p className="font-weight-bold my-1 text-justify" id="toggler" style={{ cursor: "pointer" }}>Type :</p>
//                                 <UncontrolledCollapse toggler="#toggler">
//                                     {
//                                         value.stock.map((value, idx) => {
//                                             return (
//                                                 <p>{value.type} : {value.qty} </p>
//                                             )
//                                         })
//                                     }
//                                 </UncontrolledCollapse>

//                                 {/* <Button
//                                     color="primary"
//                                     id="toggler"
//                                     style={{
//                                         marginBottom: '1rem'
//                                     }}
//                                     >
//                                     Toggle
//                                     </Button>
//                                     <UncontrolledCollapse toggler="#toggler">
//                                     <Card>
//                                     <CardBody>
//                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.
//                                     </CardBody>
//                                     </Card>
//                                 </UncontrolledCollapse> */}

//                             </FormGroup>
//                             <p class="card-text">{value.deskripsi}</p>
                            // <Row>
                            //     <Col>
                            //         Jumlah:
                            //     </Col>
                            //     <Col style={{display:"flex"}}>
                            //         <Col>
                            //             <Button size="sm" onClick={() => this.btnDecrement(1)}>-</Button>
                            //         </Col>
                            //         <Col>
                            //             <p>{this.state.counter}</p>
                            //         </Col>
                            //         <Col>
                            //             <Button size="sm" onClick={() => this.btnIncrement(1)}>+</Button>
                            //         </Col>    
                                    
                            //     </Col>
                            // </Row>
//                             <Row>
//                             <Button color="warning">Add To Cart</Button>
//                             </Row>
//                         </div>
//                     </Col>
//                 </div>
//             </div>
//         })
//     }
//     render() {

//         return (
//             <Container style={{ margin: "15vh" }}>

//                 {this.printCart()}
//             </Container>

//         );

//     }

// }
// const mapToProps = ({ productsReducer }) => {
//     console.table(productsReducer.productsList)
//     return {
//         productsList: productsReducer.productsList
//     }
// }

// export default connect(mapToProps)(ProductDetail);

import axios from 'axios';
import React from 'react';
import { Button, Collapse, Input, Row, Col, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { API_URL } from '../helper';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            qty: 1,
            counter: 0,
            toastOpen: false,
            selectedType: {}
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log(response.data)
                this.setState({ detail: response.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded" src={item}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }

    btnIncrement = () => {
       if (this.state.selectedType.qty){
           if (this.state.counter < this.state.selectedType.qty) {
               this.setState({ counter: this.state.counter += 1 })
           } else {
               this.setState({toastOpen: !this.state.toastOpen})
           }
           
       }
    }

    btnDecrement = () => {
        if(this.state.counter > 1) {
            this.setState({counter: this.state.counter -= 1})
        }
    }
    


    

    render() {
        return (
            <div>
                <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", left:10 }}>
                        <ToastHeader icon="warning"
                            toggle={() => this.setState({ toastOpen: false })}>
                            Add to cart warning
                        </ToastHeader>
                        <ToastBody>
                            Stok produk tidak cukup
                        </ToastBody>
                    </Toast>
                </div>

            
            <div className="container row p-5 m-auto shadow bg-white rounded mt-4">
                {
                    this.state.detail.id &&
                    <>
                        <div className="col-md-1">
                            {this.renderImages()}
                        </div>
                        <div className="col-md-7 text-center">
                            <img className="shadow-sm bg-white rounded" src={this.state.detail.images[this.state.thumbnail]} width="80%" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h4>
                                <h6 className="text-mute">{this.state.detail.kategori}</h6>
                                <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.harga.toLocaleString()}</h2>
                            </div>
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <div
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ openType: !this.state.openType })}>
                                    Type: {this.state.selectedType.type}</div>
                                <Collapse isOpen={this.state.openType}>
                                    {
                                        this.state.detail.stock.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button outline color="secondary" size="sm"
                                                        style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                        onClick={() => this.setState({ selectedType: item, qty: 1 })}
                                                    > {item.type} : {item.qty}</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <p className="my-3" style={{textAlign:"justify"}}>
                                {this.state.detail.deskripsi}
                            </p>
                            {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons-outlined" style={{ cursor: 'pointer' }} onClick={this.btnDecrement}>
                                        remove
                                    </span>
                                    <Input size="sm" placeholder="qty" value={this.state.qty} style={{ width: "40%", display: 'inline-block' }} />
                                    <span className="material-icons-outlined" style={{ cursor: 'pointer' }} onClick={this.btnIncrement}>
                                        add
                                    </span>
                                </span>
                            </div> */}
                            <Row>
                                <Col>
                                    Jumlah:
                                </Col>
                                <Col style={{display:"flex"}}>
                                    <Col>
                                        <Button size="sm" onClick={() => this.btnDecrement(1)}>-</Button>
                                    </Col>
                                    <Col>
                                        <p>{this.state.counter}</p>
                                    </Col>
                                    <Col>
                                        <Button size="sm" onClick={() => this.btnIncrement(1)}>+</Button>
                                    </Col>    
                                    
                                </Col>
                            </Row>
                            <Button type="button" color="warning" style={{ width: '100%' }} onClick={this.onBtAddToCart}>Add to cart</Button>
                        </div>
                    </>
                }
            </div>
             </div>
        );
    }
}

export default ProductDetail;