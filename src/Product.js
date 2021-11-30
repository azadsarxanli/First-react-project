import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class Product extends Component {
  render() {
    return (
      <div>
        <h2>
          {this.props.info.title} - {this.props.currentCategory}
        </h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th colSpan="2">Product Name</th>
              <th>Unit Price</th>
              <th>quantityPerUnit</th>
              <th>Unit in Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td colSpan="2">{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  {" "}
                  <Button
                    onClick={() => this.props.addToCard(product)}
                    color="info"
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
