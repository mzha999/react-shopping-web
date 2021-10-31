import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge } from "@mui/material";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./components/Item";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, items)=> ack+items.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType[]) => null;
  const handleRemoveFromCart = () =>{
    console.log('hello')
  };

  isLoading && <LinearProgress />;
  error && <div>Errors...</div>;
  return (
    <Wrapper className="App">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        Cart here
      </Drawer>
      <StyledButton onClick={() => setOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
