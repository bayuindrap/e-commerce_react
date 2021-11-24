import React from "react";
import axios from "axios";
import { Table, Button } from 'reactstrap';
import ModalDetail from "../components/ModalDetal";


class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: "",
            dekripsi: "",
            brand: "",
            harga: "",
            stockType: "",
            stockQty: "",
            url1: "",
            url2: "",
            modal: false,
            products: [],
            selectedIdx: null

        }
    }


    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get("http://localhost:2000/products")
            .then((response) => {
                this.setState({ products: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    toggle = (idx) => {
        this.setState({
            selectedIdx: idx,
            modal: !this.state.modal
        })
    }

    render() {
        const { products = [] } = this.state;
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Product
                            </th>
                            <th>
                                Nama
                            </th>
                            <th>
                                Brand
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Harga
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ?
                            products.map((products, idx) => (
                                <tr>
                                    <td>{products.id}</td>
                                    <td><img alt="..." width="200px" src={products.images[idx]} /></td>
                                    <td>{products.nama}</td>
                                    <td>{products.brand}</td>
                                    <td>{products.kategori}</td>
                                    <td>{products.harga}</td>
                                    <td> <Button type="button" color="primary" className="m-2" onClick={() => this.toggle(idx)}>Detail</Button>
                                        {
                                            this.state.products.length > 0 && this.state.selectedIdx != null ?
                                                <ModalDetail
                                                    produk={this.state.products}
                                                    selectedId={this.state.selectedIdx}
                                                    toggle={this.toggle}
                                                    modal={this.state.modal}
                                                    handleInput={this.state.handleInput} />
                                                : null

                                        }
                                        <Button color="danger">
                                            Delete
                                        </Button></td>
                                </tr>
                            ))
                            :
                            (<tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductManagement;