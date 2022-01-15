import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { categoryQuery } from "../store/queries";

const client = clientClone();

export class Tech extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tech: [],
      categories: [],
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setState({ categories: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.categories !== this.context.categories) {
      this.setState({ categories: this.context.categories });
      this.setTech(this.context.categories[2]);
    }
  }

  setTech = async (category) => {
    const response = await client.post(categoryQuery(category));
    this.setState({ tech: response.category.products });
  };

  render() {
    return (
      <div>
        {this.state.tech !== null && (
          <section className="category">
            <h1 className="category__name">{this.context.categories[2]}</h1>
            <section className="category__products">
              {this.state.tech.map((product) => {
                return <ProductTile key={product.id} product={product} />;
              })}
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default Tech;
