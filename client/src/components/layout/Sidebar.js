import React from 'react';
import StickyBox from 'react-sticky-box';
import { Segment } from 'semantic-ui-react';

const Sidebar = () => {
  return (
    <StickyBox
      offsetTop={250}
      offsetBottom={20}
      style={{ width: '100px', left: '20px' }}
    >
      <Segment textAlign='center'>Sidebar</Segment>
      <Segment textAlign='center'>Sidebar</Segment>
      <Segment textAlign='center'>Sidebar</Segment>
    </StickyBox>
  );
};

export default Sidebar;
