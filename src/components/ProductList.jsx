import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductList = ({ products, addToCart }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
              <Button variant="contained" onClick={() => addToCart(product)}>Add</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
