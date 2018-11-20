import React from 'react';

import Button from '../atoms/button';
import Text from '../atoms/text';

const Layout = props => (
  <div>
    <Button label="足す" onClick={props.onClick} />
    <Text text={props.count} />
  </div>
);
export default Layout;
