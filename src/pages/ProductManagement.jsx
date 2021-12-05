import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, ButtonGroup, Input, FormGroup, Label, Row, Col, InputGroup } from 'reactstrap';
import ModalEditProduct from '../component/ModalEditProduct';
import { connect } from "react-redux"
import ModalAdd from '../component/ModalAdd';
import { API_URL } from '../helper';
import { getProductsAction, getProductsSort } from '../redux/actions'


class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            modalEditOpen: false,
            detailProduk: {},
            modalAddOpen: false,
            thumbnailIdx: 0,
            modalOpen: false,
            selectedIndex: null,
            page: 1,
            handle: 2,
            harga: null,
            selectedImage: null,
            limit: 4

        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                console.log("RESPON DATA==.", res.data)
                this.setState({ productList: res.data })
                // this.props.dataAction(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })
    }

    printProduk = () => {
        let { page, limit } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * limit : page - 1, page * limit).map((item, index) => {
            return <tr>
                <td>{page > 1 ? (page - 1) * limit + index + 1 : index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    {
                        this.state.selectedIdx == index ?
                            < img src={item.images[this.state.thumbnailIdx]} width="80%" alt={item.nama + index} />
                            :
                            <img src={item.images[0]} width="80%" alt={item.nama + index} />
                    }

                    <div>
                        {item.images.map((val, idx) => {
                            return <img src={val} width="20%" alt={item.nama + index}
                                onClick={() => this.setState({ thumbnailIdx: idx, selectedIdx: index })} />
                        })}
                    </div>
                </td>
                <td>{item.nama}</td>
                <td>{item.brand}</td>
                <td>{item.kategori}</td>
                <td>Rp. {item.harga.toLocaleString()}</td>
                <td><Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: item, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                    <Button size="sm" color="danger" onClick={() => this.onBtDelete(item.id)}>Delete</Button></td>
            </tr>
        })
    }

    onBtDelete = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                this.props.getProductsAction()
            }).catch((err) => {
                console.log(err)
            })
    }
    btnCancel = () => {
        this.setState({
            selectedIdx: null,
            modal: false
        })
    }


    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / this.state.limit); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn
    }

    handlePage = (e) => {
        this.setState({ handle: parseInt(e.target.value) })
        console.log("tst value", e.target.value)
    }

    handleSort = (e) => {
        this.props.getProductsSort({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
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




    render() {
        return (
            <div className="container p-3">
                <h3 className="text-center">Produk Management</h3>
                
                <ModalAdd
                    getData={this.getData}
                    btClose={() => this.setState({ modalOpen: !this.state.modalOpen })}
                    modalOpen={this.state.modalOpen}
                />
                <ModalEditProduct
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />
                
                <div className="row">
                    <div className="col-md-3 p-1">
                        <div className="p-4 shadow mb-5 bg-white rounded">
                            <Button type="button" color="success" style={{ width: "100%" }} onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add</Button>
                            <div className="d-flex d-md-block mt-4">
                                <FormGroup>
                                    <Label>Nama</Label>
                                    <Input type="text" id="text" placeholder="Cari produk"
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
                                    <Input type="select" onChange={this.handleSort}>
                                        <option value="harga-asc">Harga Asc</option>
                                        <option value="harga-desc">Harga Desc</option>
                                        <option value="nama-asc">A-Z</option>
                                        <option value="nama-desc">Z-A</option>
                                        <option value="id-asc">Reset</option>
                                    </Input>
                                </FormGroup>

                            </div>
                            <div className="pt-2" style={{ textAlign: "end" }}>
                                <Button color="warning" onClick={this.btReset}>Reset</Button>
                                <Button style={{ marginLeft: 16 }} color="primary" onClick={this.btSearch}>Filter</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Nama</th>
                                    <th>Brand</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printProduk()}
                            </tbody>
                        </Table>
                        <div className="my-5 d-flex justify-content-center">
                            <Input type="select" value={this.state.limit} style={{ width: 75, marginRight: 10 }}
                                onChange={(e) => this.setState({ limit: parseInt(e.target.value) })}>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="12">12</option>
                                <option value="16">16</option>
                            </Input>
                            <ButtonGroup>
                                {
                                    this.printBtPagination()
                                }
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        productsList: state.productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction, getProductsSort })(ProductManagement);