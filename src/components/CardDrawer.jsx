// src/components/CartDrawer.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartDrawer = ({ cart, drawerOpen, setDrawerOpen, updateQuantity, removeFromCart }) => {
  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const discount = subtotal * 0.10;
    const total = subtotal + tax - discount;
    return { subtotal, tax, discount, total };
  };

  const totals = calculateTotal();

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.name} - $${item.price} x ${item.quantity}`} />
            <IconButton onClick={() => updateQuantity(item.id, 1)}><AddIcon /></IconButton>
            <IconButton onClick={() => updateQuantity(item.id, -1)}><RemoveIcon /></IconButton>
            <IconButton onClick={() => removeFromCart(item.id)}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Subtotal: ${totals.subtotal.toFixed(2)}</Typography>
      <Typography variant="h6">Tax: ${totals.tax.toFixed(2)}</Typography>
      <Typography variant="h6">Discount: ${totals.discount.toFixed(2)}</Typography>
      <Typography variant="h6">Total: ${totals.total.toFixed(2)}</Typography>
      <ButtonGroup variant="contained">
        <Button>Cash</Button>
        <Button>Card</Button>
        <Button>Wallet</Button>
      </ButtonGroup>
    </Drawer>
  );
};

export default CartDrawer;