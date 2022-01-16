import React, { Component } from "react";
import { AppContext } from "../../store/context";
import CartItemCount from "./CartItemCount";
import SelectedAttributes from "../SelectedAttributes";
import { productQuery } from "../../store/queries";
import { clientClone } from "../../store/context";

const client = clientClone();

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      firstName: "",
      otherNames: "",
      productPrice: 0,
      currencyInUse: null,
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    // console.log("I mounted cartItems");
    this.setProduct();
    this.splitName(this.state.product);
    this.setState({ currencyInUse: null });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.product === null) return;
    if (prevState.currencyInUse !== this.context.currencyInUse) {
      this.setPriceInSelectedCurrency(this.state.product);
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
    if (prevState.product !== this.state.product) {
      this.splitName(this.state.product);
    }
  }

  setProduct = async () => {
    const response = await client.post(productQuery(this.props.productId));
    this.setState({ product: response.product });
  };

  splitName = (product) => {
    if (product === null) return;
    const splittedName = product.name.split(" ");
    this.setState({ firstName: splittedName.shift() });
    if (splittedName.length <= 0) return;
    this.setState({ otherNames: splittedName.join(" ") });
  };

  setPriceInSelectedCurrency = (product) => {
    if (product === null || this.state.currencyInUse === null) return;
    const priceInSelectedCurrency = product.prices.find(
      (price) => this.context.currencyInUse === price.currency.symbol
    ).amount;
    this.setState({ productPrice: priceInSelectedCurrency });
  };

  render() {
    return (
      <section>
        {this.state.product !== null && (
          <section
            className={
              this.props.mini ? "cart-item cart-item--mini" : "cart-item"
            }
          >
            <article className="cart-item__details">
              <h3 className={this.props.mini ? "firstname--mini" : "firstname"}>
                {this.state.firstName}
              </h3>
              <h5
                className={this.props.mini ? "othernames--mini" : "othernames"}
              >
                {this.state.otherNames}
              </h5>
              <h3
                className={
                  this.props.mini ? "price-value--mini" : "price-value"
                }
              >
                {this.context.currencyInUse}
                {this.state.productPrice}
              </h3>
              <SelectedAttributes
                productId={this.state.product.id}
                mini={this.props.mini}
              />
            </article>
            <CartItemCount
              gallery={this.state.product.gallery}
              name={this.state.product.name}
              productId={this.state.product.id}
              mini={this.props.mini}
            />
          </section>
        )}
      </section>
    );
  }
}

export default CartItem;
