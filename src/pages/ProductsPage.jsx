import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardBody, CardTitle, Input, Card, CardImg, Button, ButtonGroup, InputGroup, InputGroupText, Form, Col, Label, FormGroup } from "reactstrap"
import { getProductsAction } from '../redux/actions'

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    printProducts = () => {
        let { page } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-3">
                <Card className="shadow" style={{ border: "none" }}>
                    <Link to={`/products-detail?id=${value.id}`} style={{ textDecoration: "none" }}>
                        <CardImg top
                            src={value.images[0]}
                            top width="100%"
                            alt={`${value.nama}-${index}`}
                            className="shadow-sm"
                        />
                        <CardBody className="shadow" style={{ border: "none" }}>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder", color: "black" }}>{value.nama}</CardTitle>
                            <CardTitle tag="h6" style={{ fontWeight: "bold", color: "black" }}>Rp.{value.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / 8); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn
    }

    btSearch = () => {
        this.props.getProductsAction(this.inSearchName.value, this.inSearchMinimum.value, this.inSearchMaximum.value)
        this.setState({ page: 1 })
    }

    btReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = ""
        this.inSearchMinimum.value = null
        this.inSearchMaximum.value = null
    }

    btSort = () => {
       
        if(this.inSearchSort.value == "harga-asc"){

            this.props.getProductsAction({
                hargaAsc: this.inSearchSort.value
           
            })
        }else if (this.inSearchSort.value == "harga-desc"){
            this.props.getProductsAction({
                hargaDesc: this.inSearchSort.value
            
            })
         }else if (this.inSearchSort.value == "nama-asc"){
            this.props.getProductsAction({
                azAsc: this.inSearchSort.value
                
            })

        }else if (this.inSearchSort.value == "nama-desc"){
            this.props.getProductsAction({
                azDesc: this.inSearchSort.value
            })
        }else{
            this.props.getProductsAction()

        }

    }



    render() {
        return (

            <div className="pt-5">
                <div className="container">
                    <div className="p-5 shadow p-3 mb-5 bg-white rounded">
                        <div className="d-flex ">


                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input type="text" id="text" placeholder="Cari Produk"
                                    innerRef={(element) => this.inSearchName = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <div className="d-flex">
                                    <Input type="number" id="numb1" placeholder="Minimum"
                                        innerRef={(element) => this.inSearchMinimum = element} />
                                    <Input type="number" id="numb2" placeholder="Maksimum"
                                        innerRef={(element) => this.inSearchMaximum = element} />
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label>Sort</Label>
                                <Input type="select" style={{ width: "250px" }} innerRef={(element) => this.inSearchSort = element}>
                                    <option value="harga-asc">Harga Asc</option>
                                    <option value="harga-desc">Harga Desc</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                    <option value="id-asc">Reset</option>
                                </Input>
                                <InputGroupText style={{ cursor: "pointer" }} onClick={() => this.btSort()}>
                                    Sort
                                </InputGroupText>
                            </FormGroup>
                        </div>
                        <div style={{ float: "right", marginTop: "5px" }}>
                            <Button outline color="warning" onClick={() => this.btReset()}>Reset</Button>
                            <Button color="primary" onClick={() => this.btSearch()}>Filter</Button>
                        </div>
                    </div>
                    <div className="row">
                        {this.printProducts()}
                    </div>
                    <div className="my-5 text-center">
                        <ButtonGroup>
                            {this.printBtPagination()}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction })(ProductsPage);