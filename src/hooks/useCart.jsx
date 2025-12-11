import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (book) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === book.id)

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prevItems, { ...book, quantity: 1 }]
        })
    }

    const removeFromCart = (bookId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== bookId))
    }

    const updateQuantity = (bookId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(bookId)
            return
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === bookId
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const openCart = () => {
        setIsCartOpen(true)
    }

    const closeCart = () => {
        setIsCartOpen(false)
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotalPrice,
                getTotalItems,
                openCart,
                closeCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider')
    }
    return context
}

