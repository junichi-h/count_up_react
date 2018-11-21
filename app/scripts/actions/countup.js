export const COUNT_UP = '@@countUp/COUNT_UP';
export const RESET = '@@countUp/RESET';

/**
 * カウントアップしていく
 * @returns {Function}
 */
export const onCountUp = () => (dispatch, getState) => {
  // 今現在のcountを取得
  const { countup } = getState();
  // それを+1していく
  const count = countup.count + 1;
  dispatch({
    type: COUNT_UP,
    payload: {
      count
    }
  });
};

/**
 * リセットさせる
 * @returns {Function}
 */
export const onReset = () => dispatch => {
  dispatch({
    type: RESET,
    payload: {
      // countを0に
      count: 0
    }
  });
};
