import React from 'react';
import { Button } from 'semantic-ui-react';

const Pages = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
