import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
`;

const bestSellers = [
  { product: 'Apple', sales: 976 },
  { product: 'Orange', sales: 898 },
  // Add more best sellers as needed
];

const BestSeller = () => (
  <div>
    <h3>Best Seller</h3>
    <List>
      {bestSellers.map(bs => (
        <li key={bs.product}>
          <span>{bs.product}</span>
          <span>{bs.sales}</span>
        </li>
      ))}
    </List>
  </div>
);

export default BestSeller;
