import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    var today = new Date();
    var year = today.getFullYear();
    return (
      <React.Fragment>
        <span>
          <a href="https://caracol.com.vc">Caracol App</a> &copy; {year} Caracol
          App.
        </span>
        <span className="ml-auto">
          Desenvolvido por <a href="https://caracol.com.vc">Caracol</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
