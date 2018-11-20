export const COUNT_UP = '@@countUp/COUNT_UP';

export const onCountUp = () => (dispatch, getState) => {
  const { countup } = getState();
  const count = countup.count + 1;
  dispatch({
    type: COUNT_UP,
    payload: {
      count
    }
  });
};
