import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const addToCart = (product) => {
        const existingItemIndex = cart.findIndex(
            (item) => item.product.product_id === product.product_id,
        );

        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    const incrementQuantity = (productId) => {
        const updatedCart = cart.map((item) => {
            if (item.product.product_id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const decrementQuantity = (productId) => {
        const updatedCart = cart.map((item) => {
            if (item.product.product_id === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(
            (item) => item.product.product_id !== productId,
        );
        setCart(updatedCart);
    };

    const toggleCartDrawer = () => {
        setCartDrawerOpen(!cartDrawerOpen);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                cartDrawerOpen,
                toggleCartDrawer,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
