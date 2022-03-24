// import styles from "./productList.module.scss";
import Product from "./../../UI/Product/Product.lazy";
import React, { Component } from "react";
import { Fragment } from "react";
import http from "../../core/services/httpService";
import { connect } from "react-redux";
import { ActionsKey } from "../../common/constants/constants";
import centralStore from "./../../common/store/centralStore";
class ProductList extends Component {
  constructor() {
    super();
  }
  state = {
    products: [],
  };

  async componentDidMount() {
    centralStore.dispatch({
      type: ActionsKey.getCartItems,
    });
    console.log("props= ", this.props);
    console.log("state= ", this.state);

    this.getProducts();
    this.setState({ products: await this.getProducts() });
  }

  async getProducts() {
    const { data } = await http.get("/jsons/productList.json");
    console.log("response", data);
    return [...data.result];
  }
  render() {
    const products = [...this.state.products];
    return (
      <Fragment>
        <div className="row">
          {products &&
            products.map((product) => {
              return (
                <div className="col-lg-3" key={product.id}>
                  <Product productDetails={product} {...this.props}></Product>
                </div>
              );
            })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps)(ProductList);
