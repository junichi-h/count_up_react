/* @flow */
import React from 'react';
import styled from 'react-emotion';

const StyledButton = styled('button')`
  color: #ff00ff;
`;

const Button = props => (
  <StyledButton
    type="button"
    onClick={event => {
      event.preventDefault();
      console.log('a');
    }}
  >
    {props.label}
  </StyledButton>
);
export default Button;
