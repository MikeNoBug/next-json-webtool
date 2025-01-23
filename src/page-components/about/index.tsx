'use client';

import { Button } from 'antd';

const ClientAbout: React.FC = () => {
  return (
    <Button
      type='primary'
      onClick={() => {
        console.log('test');
      }}>
      test
    </Button>
  );
};

export default ClientAbout;
