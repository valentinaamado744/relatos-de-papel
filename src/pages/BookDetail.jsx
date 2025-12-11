import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_BOOKS } from '../utils/constants'
import { useCart } from '../hooks/useCart'
import Header from '../components/layout/Header'
import CartSidebar from '../components/cart/CartSidebar'
import '../styles/BookDetail.css'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()
  const book = MOCK_BOOKS.find(b => b.id === id)

  const handleAddToCart = () => {
    if (book) {
      addToCart(book)
      openCart()
    }
  }

  if (!book) {
    return (
      <div className="book-detail-container">
        <Header />
        <div className="book-not-found">
          <h2>Libro no encontrado</h2>
          <button onClick={() => navigate('/home')}>Volver al inicio</button>
        </div>
      </div>
    )
  }

  return (
    <div className="book-detail-container">
      <Header />
      <div className="book-detail-content">
        <button className="back-button" onClick={() => navigate('/home')}>
          ← Volver
        </button>

        <div className="book-detail-grid">
          <div className="book-detail-image">
            <img src={book.image} alt={book.title} />
          </div>

          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">por {book.author}</p>

            <div className="book-detail-meta">
              <span className="book-meta-item">Género: {book.genre}</span>
              <span className="book-meta-item">Idioma: {book.language}</span>
              <span className="book-meta-item">Páginas: {book.pages}</span>
            </div>

            <div className="book-detail-price">
              <span className="price-label">Precio:</span>
              <span className="price-value">${book.price.toLocaleString('es-CO')}</span>
            </div>

            <div className="book-detail-description">
              <h3>Descripción</h3>
              <p>{book.description}</p>
            </div>

            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <CartSidebar />
    </div>
  )
}

export default BookDetail

