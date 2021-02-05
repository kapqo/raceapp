import React from 'react';
import { Advertisement } from 'semantic-ui-react';

const Ad = () => {
  return (
    <div className='advertisement hide-sm'>
      <Advertisement
        unit='wide skyscraper'
        test='This could be your advertisement'
      />
    </div>
  );
};

export default Ad;
