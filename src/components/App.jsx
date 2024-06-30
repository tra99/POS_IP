import React, { useState } from 'react';
import { Grid, Container, Drawer, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentMethods from './PaymentMethods';
import ProductList from './ProductList';

const products = [
    { id: 1, name: 'Apple', price: 8.90, image: 'apple.png' },
    { id: 2, name: 'Grape', price: 10.80, image: 'grape.png' },
    { id: 3, name: 'Pineapple', price: 3.00, image: 'pineapple.png' },
    // Add more products as needed
];

const App = () => {
    const [cart, setCart] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setDrawerOpen(true);
    };

    const updateQuantity = (productId, delta) => {
        setCart(cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        ).filter(item => item.quantity > 0));
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <ProductList products={products} addToCart={addToCart} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={() => setDrawerOpen(true)}>View Cart</Button>
                </Grid>
            </Grid>

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
                <PaymentMethods />
            </Drawer>
        </Container>
    );
};

export default App;