import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Category from "./Category";
import Navi from "./Navi";
import { Switch, Route } from "react-router-dom";

import Product from "./Product";
import NotFound from "./NotFound";
import CartList from "./CartList";
import alertify from "alertifyjs";
// import your route components too

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };
  componentDidMount() {
    this.getProducts();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCard = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart");
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " deleted from cart", 0.5);
  };
  render() {
    let categoryInfo = { title: "CategoryList" };
    let productInfo = { title: "ProductList" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <Category
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(...props) => (
                    <Product
                      {...props}
                      addToCard={this.addToCard}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      removeFromCart={this.removeFromCart}
                      cart={this.state.cart}
                    />
                  )}
                />
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
