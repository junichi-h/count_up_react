import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// 普通のRedux内からstateを取得するときはコメントアウト
import { createStructuredSelector } from 'reselect';

import Layout from './molecules/layout';
import { onCountUp, onReset } from '../actions/countup';
// 普通のRedux内からstateを取得するときはコメントアウト
import { makeSelectCount } from '../reselect';

class App extends Component {
  /**
   * 今のpropsと次に変わるであろうprops（nextProps）を比べて変更がある場合のみにview側にrenderするようにする
   * @param nextProps
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

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
          onReset={this.props.onReset}
        />
      </div>
    );
  }
}

// relsectからRedux内のstateを取る（理想）差分検知をreselectが自動でやってくれる。
const mapStateToProps = createStructuredSelector({
  count: makeSelectCount()
});
// 普通のReduxからstateを取るとき。
/* const mapStateToProps = state => ({
  count: state.countup.count
}); */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ onCountUp, onReset }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
