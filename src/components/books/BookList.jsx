import BookCard from './BookCard'
import '../../styles/BookList.css'

const BookList = ({ books }) => {
  if (books.length === 0) {
    return (
      <div className="book-list-empty">
        <p>No se encontraron libros con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>Catálogo de Libros</h2>
        <p className="book-count">{books.length} libro{books.length !== 1 ? 's' : ''} encontrado{books.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="book-list-grid">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookList

