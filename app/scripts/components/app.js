import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import Button from './atoms/button';
import Layout from './molecules/layout';
import { onCountUp } from '../actions/countup';

class App extends Component {
  render() {
    console.log(this.props);
    // const { onCountUp } = this.props;
    return (
      <div>
        <h1>unko</h1>
        <Layout
          label="unko"
          count={this.props.count}
          onClick={this.props.onCountUp}
        />
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({});
const mapStateToProps = state => ({
  count: state.countup.count
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ onCountUp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
