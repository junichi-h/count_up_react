import React from 'react';
import styled from 'react-emotion';

import Button from '../atoms/button';
import Text from '../atoms/text';

const Container = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const TextInner = styled('div')`
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  color: #3f3f3f;
`;

const Layout = props => (
  <Container>
    <Button label="足す" onClick={props.onClick} />
    <TextInner>
      <Text text={props.count} />
    </TextInner>
    <Button label="リセット" onClick={props.onReset} />
  </Container>
);
export default Layout;
