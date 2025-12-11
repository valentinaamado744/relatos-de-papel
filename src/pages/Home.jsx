import { useState, useMemo, useEffect, useRef } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Banner from '../components/layout/Banner'
import BookList from '../components/books/BookList'
import CartSidebar from '../components/cart/CartSidebar'
import { MOCK_BOOKS } from '../utils/constants'
import '../styles/Home.css'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Todos')
  const [priceFromInput, setPriceFromInput] = useState('')
  const [priceToInput, setPriceToInput] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [selectedPopularity, setSelectedPopularity] = useState('Ninguno')

  const priceFromTimeoutRef = useRef(null)
  const priceToTimeoutRef = useRef(null)

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre)
  }

  const handlePriceFromChange = (value) => {
    setPriceFromInput(value)

    if (priceFromTimeoutRef.current) {
      clearTimeout(priceFromTimeoutRef.current)
    }

    priceFromTimeoutRef.current = setTimeout(() => {
      setPriceFrom(value)
    }, 500)
  }

  const handlePriceToChange = (value) => {
    setPriceToInput(value)

    if (priceToTimeoutRef.current) {
      clearTimeout(priceToTimeoutRef.current)
    }

    priceToTimeoutRef.current = setTimeout(() => {
      setPriceTo(value)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (priceFromTimeoutRef.current) {
        clearTimeout(priceFromTimeoutRef.current)
      }
      if (priceToTimeoutRef.current) {
        clearTimeout(priceToTimeoutRef.current)
      }
    }
  }, [])

  const handlePopularityFilter = (popularity) => {
    setSelectedPopularity(popularity)
  }

  const handleClearFilters = () => {
    setSelectedGenre('Todos')
    setPriceFromInput('')
    setPriceToInput('')
    setPriceFrom('')
    setPriceTo('')
    setSelectedPopularity('Ninguno')

    // Limpiar timeouts
    if (priceFromTimeoutRef.current) {
      clearTimeout(priceFromTimeoutRef.current)
    }
    if (priceToTimeoutRef.current) {
      clearTimeout(priceToTimeoutRef.current)
    }
  }

  const filteredBooks = useMemo(() => {
    let books = [...MOCK_BOOKS]

    if (searchQuery) {
      books = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedGenre !== 'Todos') {
      books = books.filter(book => book.genre === selectedGenre)
    }

    if (priceFrom) {
      const fromValue = priceFrom.replace(/\./g, '')
      const from = parseFloat(fromValue)
      if (!isNaN(from)) {
        books = books.filter(book => book.price >= from)
      }
    }
    if (priceTo) {
      const toValue = priceTo.replace(/\./g, '')
      const to = parseFloat(toValue)
      if (!isNaN(to)) {
        books = books.filter(book => book.price <= to)
      }
    }

    // Ordenar por popularidad
    if (selectedPopularity === 'Más vendidos') {
      books.sort((a, b) => b.sales - a.sales)
    } else if (selectedPopularity === 'Menos vendidos') {
      books.sort((a, b) => a.sales - b.sales)
    }

    return books
  }, [searchQuery, selectedGenre, priceFrom, priceTo, selectedPopularity])

  return (
    <div className="home-container">
      <Header onSearch={handleSearch} />
      <Banner />
      <div className="home-content">
        <Sidebar
          selectedGenre={selectedGenre}
          priceFrom={priceFromInput}
          priceTo={priceToInput}
          selectedPopularity={selectedPopularity}
          onGenreFilter={handleGenreFilter}
          onPriceFromChange={handlePriceFromChange}
          onPriceToChange={handlePriceToChange}
          onPopularityFilter={handlePopularityFilter}
          onClearFilters={handleClearFilters}
        />
        <main className="main-content">
          <BookList books={filteredBooks} />
        </main>
      </div>
      <CartSidebar />
    </div>
  )
}

export default Home

