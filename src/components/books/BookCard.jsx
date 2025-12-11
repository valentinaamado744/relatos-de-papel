import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../hooks/useCart'
import '../../styles/BookCard.css'

const BookCard = ({ book }) => {
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()

  const handleCardClick = () => {
    navigate(`/book/${book.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(book)
    openCart()
  }

  return (
    <div className="book-card" onClick={handleCardClick}>
      <div className="book-card-image">
        <img src={book.image} alt={book.title} />
        <div className="book-card-price-badge">
          ${book.price.toLocaleString('es-CO')}
        </div>
        <button
          className="book-card-cart-button"
          onClick={handleAddToCart}
          title="Agregar al carrito"
        >
          <FaShoppingCart />
        </button>
      </div>
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
      </div>
    </div>
  )
}

export default BookCard

