import React from 'react';
import { Card, Flex } from 'antd';
const Skeleton = () => {
  const loading = true;
  return (
    <Flex gap="middle" align="start" vertical>
      <Card
        loading={loading}
        style={{
          minWidth: 800,
        }}
      >
        <Card.Meta/>
        </Card>
    </Flex>
  );
};
export default Skeleton;