import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';

const Pages = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      {pageNumbers.map(number => (
        <Button.Group key={number}>
          <Button circular onClick={() => paginate(number)}>
            {number}
          </Button>
        </Button.Group>
      ))}
    </div>
  );
};

export default Pages;
