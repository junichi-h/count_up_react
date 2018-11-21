/* @flow */
import React from 'react';
import styled from 'react-emotion';

const StyledButton = styled('button')`
  outline: none;
  height: 40px;
  text-align: center;
  width: 130px;
  border-radius: 40px;
  background: #fff;
  border: 2px solid #1ecd97;
  color: #1ecd97;
  letter-spacing: 1px;
  text-shadow: 0;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color: #fff;
    background: #1ecd97;
  }
  &:active {
    letter-spacing: 2px;
  }
`;

const Button = props => (
  <StyledButton
    type="button"
    onClick={event => {
      event.preventDefault();
      props.onClick();
    }}
  >
    {props.label}
  </StyledButton>
);
export default Button;
