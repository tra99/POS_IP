import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('Cash');

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {['Cash', 'Card', 'Wallet'].map((method) => (
        <Button 
          key={method} 
          onClick={() => setSelectedMethod(method)}
          color={selectedMethod === method ? 'primary' : 'default'}
        >
          {method}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default PaymentMethods;