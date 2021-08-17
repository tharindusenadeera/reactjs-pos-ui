import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {

  // If user not authenticated render out to root

  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentDidMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/");
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.common.authenticated };
  }

  return connect(mapStateToProps)(withRouter(Authentication));
}