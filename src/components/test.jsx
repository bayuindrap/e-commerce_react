import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input } from "reactstrap";

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Detail</Button>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Detail Product.</ModalHeader>
                    <ModalBody>

                        <div className="modal-body">

                            <FormGroup>
                                <Label for="exampleEmail">
                                    Nama Product
                                </Label>
                                <Input id="exampleEmail" name="produk" type="text" defaultValue={this.props.produk[this.props.selectedId].nama}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Deskripsi
                                </Label>
                                <Input id="exampleEmail" name="produk" type="text" defaultValue={this.props.produk[this.props.selectedId].deskripsi}
                                />
                            </FormGroup>

                            <FormGroup className="d-flex">
                                <FormGroup className="m-1">
                                    <Label for="brand-produk">Brand</Label>
                                    <Input type="text" id="brand-produk"  defaultValue={this.props.produk[this.props.selectedId].brand} onChange={(event) => this.handleInput(event.target.value, "brandProdukModal")} />
                                </FormGroup>
                                <FormGroup className="m-1">
                                    <Label for="kategori-produk">Category</Label>
                                    <Input type="text" id="kategori-produk"  defaultValue={this.props.produk[this.props.selectedId].kategori} onChange={(event) => this.handleInput(event.target.value, "kategoriProdukModal")} />
                                </FormGroup>
                            </FormGroup>

                           
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Harga
                                </Label>
                                <Input id="exampleEmail" name="produk" type="number" defaultValue={this.props.produk[this.props.selectedId].harga}
                                />
                            </FormGroup>

                            <Label>Stock</Label>
                            <FormGroup className="d-flex">
                                <FormGroup className="m-1">
                                    <Input type="number" id="harga-produk"  defaultValue={this.props.produk[this.props.selectedId].stock[0].type} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                                </FormGroup>
                                <FormGroup className="m-1">
                                    <Input type="number" id="harga-produk"  defaultValue={this.props.produk[this.props.selectedId].stock[1].type} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                                </FormGroup>
                                <FormGroup className="m-1">
                                    <Button>Delete</Button>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup className="d-flex">
                                <FormGroup className="m-1">
                                    <Input type="number" id="harga-produk"  defaultValue={this.props.produk[this.props.selectedId].stock[0].qty} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                                </FormGroup>
                                <FormGroup className="m-1">
                                    <Input type="number" id="harga-produk"  defaultValue={this.props.produk[this.props.selectedId].stock[1].qty} onChange={(event) => this.handleInput(event.target.value, "hargaProdukModal")} />
                                </FormGroup>
                                <FormGroup className="m-1">
                                    <Button>Delete</Button>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Images
                                </Label>
                                <Input id="exampleEmail" name="produk" type="text" defaultValue={this.props.prooducts[this.props.selectedIdx].images[0]}/>
                                <Input id="exampleEmail" name="produk" type="text" defaultValue={this.props.prooducts[this.props.selectedIdx].images[1]}/>
                            </FormGroup>



                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>Edit</Button>{' '}
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}



export default ModalDetail;