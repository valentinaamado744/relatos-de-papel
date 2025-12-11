import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'
import { FaTimes } from 'react-icons/fa'
import '../../styles/CartSidebar.css'

const CartSidebar = () => {
  const { isCartOpen, closeCart, cartItems, getTotalPrice } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2 className="cart-title">Carrito de Compras</h2>
          <button className="cart-close-button" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span className="total-label">Total:</span>
                  <span className="total-value">${getTotalPrice().toLocaleString('es-CO')}</span>
                </div>
                <button className="checkout-button">
                  Proceder al pago
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CartSidebar

