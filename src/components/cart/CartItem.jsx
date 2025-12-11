import { useCart } from '../../hooks/useCart'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import '../../styles/CartItem.css'

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart()

    const handleIncrease = () => {
        updateQuantity(item.id, item.quantity + 1)
    }

    const handleDecrease = () => {
        updateQuantity(item.id, item.quantity - 1)
    }

    const handleRemove = () => {
        removeFromCart(item.id)
    }

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
            </div>

            <div className="cart-item-info">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-author">{item.author}</p>
                <p className="cart-item-price">${item.price.toLocaleString('es-CO')}</p>
            </div>

            <div className="cart-item-actions">
                <div className="quantity-controls">
                    <button
                        className="quantity-button"
                        onClick={handleDecrease}
                        aria-label="Disminuir cantidad"
                    >
                        <FaMinus />
                    </button>
                    <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 0
                            updateQuantity(item.id, value)
                        }}
                        min="1"
                    />
                    <button
                        className="quantity-button"
                        onClick={handleIncrease}
                        aria-label="Aumentar cantidad"
                    >
                        <FaPlus />
                    </button>
                </div>

                <button
                    className="remove-button"
                    onClick={handleRemove}
                    title="Eliminar del carrito"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default CartItem

