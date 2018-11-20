export const COUNT_UP = '@@countUp/COUNT_UP';

export const onCountUp = () => dispatch => {
  dispatch({
    type: COUNT_UP,
    payload: {
      count: 0
    }
  });
};
