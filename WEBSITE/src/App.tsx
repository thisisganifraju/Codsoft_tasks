import { useState, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'landing' | 'listing' | 'categories' | 'product' | 'cart' | 'checkout' | 'success' | 'login'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  category: string
  badge?: string
  inStock: boolean
}

interface CartItem extends Product {
  quantity: number
  color: string
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1, name: 'Sony WH-1000XM5', brand: 'Sony', price: 24999, originalPrice: 29999, rating: 4.8, reviews: 2341, image: 'https://images.unsplash.com/photo-1583305727488-61f82c7eae4b?w=400&h=400&fit=crop&auto=format', category: 'Electronics', badge: 'Best Seller', inStock: true },
  { id: 2, name: 'Samsung Galaxy Watch 6', brand: 'Samsung', price: 19999, originalPrice: 24999, rating: 4.6, reviews: 1872, image: 'https://images.unsplash.com/photo-1680113727062-8a118574b782?w=400&h=400&fit=crop&auto=format', category: 'Electronics', badge: 'New', inStock: true },
  { id: 3, name: 'Nike Air Max 270', brand: 'Nike', price: 8499, originalPrice: 11999, rating: 4.5, reviews: 3210, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&auto=format', category: 'Fashion', inStock: true },
  { id: 4, name: 'Apple AirPods Pro', brand: 'Apple', price: 14999, originalPrice: 17999, rating: 4.9, reviews: 5421, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&auto=format', category: 'Electronics', badge: 'Top Rated', inStock: true },
  { id: 5, name: 'Logitech MX Master 3', brand: 'Logitech', price: 6999, originalPrice: 8999, rating: 4.7, reviews: 1203, image: 'https://images.unsplash.com/photo-1648756834527-b6ea7e3fa2b8?w=400&h=400&fit=crop&auto=format', category: 'Electronics', inStock: true },
  { id: 6, name: "Levi's 511 Slim Jeans", brand: "Levi's", price: 3499, originalPrice: 4999, rating: 4.3, reviews: 892, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format', category: 'Fashion', inStock: true },
  { id: 7, name: 'Philips Hue Starter Kit', brand: 'Philips', price: 7499, originalPrice: 9999, rating: 4.4, reviews: 654, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format', category: 'Home & Living', inStock: false },
  { id: 8, name: 'Ray-Ban Aviator Classic', brand: 'Ray-Ban', price: 9999, originalPrice: 12999, rating: 4.6, reviews: 2100, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&auto=format', category: 'Accessories', inStock: true },
  { id: 9, name: 'JBL Flip 6 Speaker', brand: 'JBL', price: 8999, originalPrice: 10999, rating: 4.5, reviews: 1456, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format', category: 'Electronics', inStock: true },
  { id: 10, name: 'IKEA Poäng Armchair', brand: 'IKEA', price: 12999, originalPrice: 14999, rating: 4.2, reviews: 734, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&auto=format', category: 'Home & Living', inStock: true },
  { id: 11, name: 'Fossil Gen 6 Smartwatch', brand: 'Fossil', price: 17999, originalPrice: 21999, rating: 4.3, reviews: 567, image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=400&h=400&fit=crop&auto=format', category: 'Accessories', inStock: true },
  { id: 12, name: 'Adidas Ultraboost 22', brand: 'Adidas', price: 11999, originalPrice: 14999, rating: 4.7, reviews: 1890, image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=400&fit=crop&auto=format', category: 'Fashion', badge: 'Popular', inStock: true },
]

const CATEGORIES = [
  { name: 'Electronics', count: 1240, icon: '💻', image: 'https://images.unsplash.com/photo-1783408355139-7c9390d3f26f?w=400&h=280&fit=crop&auto=format' },
  { name: 'Fashion', count: 3580, icon: '👗', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=280&fit=crop&auto=format' },
  { name: 'Home & Living', count: 890, icon: '🏠', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=280&fit=crop&auto=format' },
  { name: 'Beauty', count: 1560, icon: '✨', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=280&fit=crop&auto=format' },
  { name: 'Sports', count: 720, icon: '⚽', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=280&fit=crop&auto=format' },
  { name: 'Accessories', count: 2100, icon: '👜', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=280&fit=crop&auto=format' },
]

const PROMO_CODES: Record<string, number> = {
  GURU20: 2000,
  SAVE500: 500,
  FIRST10: 1000,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`
const disc = (p: Product) => Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= Math.round(rating) ? '#F59E0B' : '#E5E7EB'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Toast System ─────────────────────────────────────────────────────────────

function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-500 pointer-events-auto transition-all ${
            t.type === 'success' ? 'bg-[#111827] text-white' :
            t.type === 'error' ? 'bg-red-600 text-white' :
            'bg-[#2563EB] text-white'
          }`}
          style={{ fontWeight: 500 }}
        >
          <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
          <span>{t.message}</span>
          <button onClick={() => remove(t.id)} className="ml-2 opacity-60 hover:opacity-100 text-xs">✕</button>
        </div>
      ))}
    </div>
  )
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [counter, setCounter] = useState(0)

  const show = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev.slice(-3), { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [counter])

  return { toasts, show, remove }
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  screen,
  navigate,
  cartCount,
  wishlistCount,
  onSearch,
}: {
  screen: Screen
  navigate: (s: Screen, p?: Product, cat?: string) => void
  cartCount: number
  wishlistCount: number
  onSearch: (q: string) => void
}) {
  const [searchVal, setSearchVal] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', screen: 'landing' as Screen },
    { label: 'Categories', screen: 'categories' as Screen },
    { label: 'Deals', screen: 'listing' as Screen },
    { label: 'New Arrivals', screen: 'listing' as Screen },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchVal.trim()) {
      onSearch(searchVal.trim())
      navigate('listing')
      setSearchOpen(false)
    }
  }

  const clearSearch = () => {
    setSearchVal('')
    onSearch('')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 sm:gap-8">
        {/* Logo */}
        <button onClick={() => { clearSearch(); navigate('landing') }} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <span className="text-xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>Cart<span className="text-[#2563EB]">Guru</span></span>
        </button>

        {/* Nav Links – desktop */}
        <nav className="hidden md:flex items-center gap-6 shrink-0">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => navigate(l.screen)}
              className={`text-sm font-500 transition-colors ${screen === l.screen && l.label === 'Home' ? 'text-[#2563EB]' : 'text-[#64748B] hover:text-[#111827]'}`}
              style={{ fontWeight: 500 }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block">
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2 focus-within:border-[#2563EB] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="flex-1 bg-transparent text-sm outline-none text-[#111827] placeholder-[#94A3B8]"
              placeholder="Search products, brands..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            {searchVal && (
              <button type="button" onClick={clearSearch} className="text-[#64748B] hover:text-[#111827] text-xs">✕</button>
            )}
          </div>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto md:ml-0">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden p-2 text-[#64748B] hover:text-[#111827] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            onClick={() => navigate('listing')}
            className="relative p-2 text-[#64748B] hover:text-[#111827] transition-colors"
            title="Wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-700" style={{ fontWeight: 700 }}>{wishlistCount}</span>
            )}
          </button>

          <button
            onClick={() => navigate('cart')}
            className="relative p-2 text-[#64748B] hover:text-[#111827] transition-colors"
            title="Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2563EB] text-white text-[10px] rounded-full flex items-center justify-center font-700" style={{ fontWeight: 700 }}>{cartCount}</span>
            )}
          </button>

          <button onClick={() => navigate('login')} className="p-2 text-[#64748B] hover:text-[#111827] transition-colors" title="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#64748B] hover:text-[#111827]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="sm:hidden border-t border-[#E5E7EB] px-4 py-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2 focus-within:border-[#2563EB] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input autoFocus className="flex-1 bg-transparent text-sm outline-none text-[#111827] placeholder-[#94A3B8]" placeholder="Search products..." value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
            {searchVal && <button type="button" onClick={clearSearch} className="text-[#64748B] text-xs">✕</button>}
          </form>
        </div>
      )}

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => { navigate(l.screen); setMobileMenuOpen(false) }}
              className="block w-full text-left px-6 py-3 text-sm font-500 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#111827] border-b border-[#F1F5F9]"
              style={{ fontWeight: 500 }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onNavigate,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: {
  product: Product
  onNavigate: (s: Screen, p?: Product) => void
  onAddToCart: (p: Product) => void
  isWishlisted: boolean
  onToggleWishlist: (id: number) => void
}) {
  return (
    <div
      onClick={() => onNavigate('product', product)}
      className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="relative bg-[#F8FAFC] overflow-hidden h-52">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#2563EB] text-white text-[11px] font-600 px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>{product.badge}</span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-white text-[#64748B] text-xs font-500 px-3 py-1.5 rounded-full shadow" style={{ fontWeight: 500 }}>Out of Stock</span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id) }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-[#64748B] hover:text-red-500'}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        <span className="absolute bottom-3 left-3 bg-green-100 text-green-700 text-[11px] font-600 px-2 py-0.5 rounded" style={{ fontWeight: 600 }}>{disc(product)}% OFF</span>
      </div>
      <div className="p-4">
        <p className="text-[11px] text-[#64748B] font-500 uppercase tracking-wide mb-1" style={{ fontWeight: 500 }}>{product.brand}</p>
        <h3 className="text-sm font-600 text-[#111827] leading-snug mb-2 line-clamp-2" style={{ fontWeight: 600 }}>{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-[#64748B]">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-700 text-[#111827]" style={{ fontWeight: 700 }}>{fmt(product.price)}</span>
          <span className="text-xs text-[#64748B] line-through">{fmt(product.originalPrice)}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); if (product.inStock) onAddToCart(product) }}
          disabled={!product.inStock}
          className={`w-full py-2 rounded-lg text-sm font-600 transition-all ${product.inStock ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] active:scale-95' : 'bg-[#F1F5F9] text-[#64748B] cursor-not-allowed'}`}
          style={{ fontWeight: 600 }}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

// ─── Screen: Landing ──────────────────────────────────────────────────────────

function LandingScreen({
  navigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: {
  navigate: (s: Screen, p?: Product, cat?: string) => void
  onAddToCart: (p: Product) => void
  wishlist: number[]
  onToggleWishlist: (id: number) => void
}) {
  const trending = PRODUCTS.slice(0, 4)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#EFF6FF] text-[#2563EB] text-xs font-600 px-3 py-1.5 rounded-full mb-5" style={{ fontWeight: 600 }}>
              🛍 New Arrivals Just Dropped
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-800 text-[#111827] leading-tight mb-5" style={{ fontWeight: 800 }}>
              Shop Smarter.<br />
              <span className="text-[#2563EB]">Live Better.</span>
            </h1>
            <p className="text-lg text-[#64748B] mb-7 leading-relaxed max-w-md">
              Discover products you'll love at prices you'll appreciate. From electronics to fashion — all in one place.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('listing')}
                className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3.5 rounded-xl font-600 hover:bg-[#1d4ed8] active:scale-95 transition-all shadow-lg shadow-blue-200"
                style={{ fontWeight: 600 }}
              >
                Shop Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                onClick={() => navigate('categories')}
                className="px-6 py-3.5 rounded-xl font-600 border border-[#E5E7EB] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] active:scale-95 transition-all bg-white"
                style={{ fontWeight: 600 }}
              >
                Browse Categories
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-8">
              {['Free Delivery', 'Easy Returns', '24/7 Support'].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl" />
            <img
              src="https://images.unsplash.com/photo-1783408355139-7c9390d3f26f?w=700&h=560&fit=crop&auto=format"
              alt="Modern electronics display"
              className="relative rounded-3xl w-full object-cover h-80 lg:h-[460px]"
            />
            <div className="absolute bottom-5 left-5 bg-white rounded-xl shadow-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#EFF6FF] rounded-lg flex items-center justify-center text-[#2563EB]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-[#64748B]">This month</p>
                <p className="text-sm font-700 text-[#111827]" style={{ fontWeight: 700 }}>50K+ Orders Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>Shop by Category</h2>
            <p className="text-sm text-[#64748B] mt-0.5">Find exactly what you're looking for</p>
          </div>
          <button onClick={() => navigate('categories')} className="text-sm text-[#2563EB] font-600 hover:underline" style={{ fontWeight: 600 }}>View All →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate('listing', undefined, cat.name)}
              className="group bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-md active:scale-95 transition-all hover:-translate-y-0.5 text-left"
            >
              <div className="h-28 sm:h-32 overflow-hidden bg-[#F8FAFC]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="font-600 text-[#111827] text-sm" style={{ fontWeight: 600 }}>{cat.name}</p>
                <p className="text-xs text-[#64748B]">{cat.count.toLocaleString()} items</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>Trending Products</h2>
            <p className="text-sm text-[#64748B] mt-0.5">Most loved by our customers</p>
          </div>
          <button onClick={() => navigate('listing')} className="text-sm text-[#2563EB] font-600 hover:underline" style={{ fontWeight: 600 }}>View All →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} onNavigate={(s, prod) => navigate(s, prod)} onAddToCart={onAddToCart} isWishlisted={wishlist.includes(p.id)} onToggleWishlist={onToggleWishlist} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-r from-[#1e40af] to-[#2563EB] rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-blue-200 text-sm font-500 mb-1" style={{ fontWeight: 500 }}>Limited Time Offer</p>
            <h3 className="text-xl sm:text-2xl font-700 text-white mb-1" style={{ fontWeight: 700 }}>Get ₹2,000 off your first order</h3>
            <p className="text-blue-100 text-sm">Use code <span className="font-700 text-white bg-white/20 px-2 py-0.5 rounded" style={{ fontWeight: 700 }}>GURU20</span> at checkout</p>
          </div>
          <button onClick={() => navigate('listing')} className="shrink-0 bg-white text-[#2563EB] px-6 py-3 rounded-xl font-600 hover:shadow-lg active:scale-95 transition-all" style={{ fontWeight: 600 }}>
            Claim Offer →
          </button>
        </div>
      </section>
    </div>
  )
}

// ─── Screen: Product Listing ───────────────────────────────────────────────────

function ListingScreen({
  navigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  initialCategory,
  searchQuery,
}: {
  navigate: (s: Screen, p?: Product, cat?: string) => void
  onAddToCart: (p: Product) => void
  wishlist: number[]
  onToggleWishlist: (id: number) => void
  initialCategory: string
  searchQuery: string
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All')
  const [sortBy, setSortBy] = useState('popular')
  const [maxPrice, setMaxPrice] = useState(30000)
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    setActiveCategory(initialCategory || 'All')
  }, [initialCategory])

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories']

  const filtered = PRODUCTS
    .filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      }
      return activeCategory === 'All' || p.category === activeCategory
    })
    .filter((p) => p.price <= maxPrice)
    .filter((p) => p.rating >= minRating)
    .filter((p) => !inStockOnly || p.inStock)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })

  const clearFilters = () => {
    setActiveCategory('All')
    setMaxPrice(30000)
    setMinRating(0)
    setInStockOnly(false)
  }

  const hasActiveFilters = activeCategory !== 'All' || maxPrice !== 30000 || minRating !== 0 || inStockOnly

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-5">
          {searchQuery ? (
            <div>
              <h1 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>
                Search results for "<span className="text-[#2563EB]">{searchQuery}</span>"
              </h1>
              <p className="text-sm text-[#64748B] mt-1">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
          ) : (
            <div>
              <h1 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>Explore Products</h1>
              <p className="text-sm text-[#64748B] mt-1">{filtered.length} products available</p>
            </div>
          )}
        </div>

        {/* Category pills – hidden when searching */}
        {!searchQuery && (
          <div className="flex gap-2 flex-wrap mb-5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-500 border transition-all ${activeCategory === c ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E5E7EB] hover:border-[#2563EB] hover:text-[#2563EB]'}`}
                style={{ fontWeight: 500 }}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-700 text-[#111827]" style={{ fontWeight: 700 }}>Filters</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-[#2563EB] hover:underline font-500" style={{ fontWeight: 500 }}>Clear all</button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <p className="text-xs font-600 text-[#64748B] uppercase tracking-wide mb-3" style={{ fontWeight: 600 }}>Max Price: {fmt(maxPrice)}</p>
                <input
                  type="range"
                  min={1000}
                  max={30000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
                <div className="flex justify-between text-xs text-[#64748B] mt-1">
                  <span>₹1K</span><span>₹30K</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-5">
                <p className="text-xs font-600 text-[#64748B] uppercase tracking-wide mb-3" style={{ fontWeight: 600 }}>Min Rating</p>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-[#2563EB]" />
                      <div className="flex items-center gap-1">
                        {r === 0 ? <span className="text-sm text-[#64748B]">All ratings</span> : (
                          <><Stars rating={r} size={12} /><span className="text-xs text-[#64748B]">{r}+</span></>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs font-600 text-[#64748B] uppercase tracking-wide mb-3" style={{ fontWeight: 600 }}>Availability</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#2563EB] w-4 h-4 rounded"
                  />
                  <span className="text-sm text-[#64748B]">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#64748B]">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white text-[#111827] outline-none focus:border-[#2563EB]"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-[#111827] font-600 text-lg" style={{ fontWeight: 600 }}>No products found</p>
                <p className="text-sm text-[#64748B] mt-1 mb-4">Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="text-sm text-[#2563EB] border border-[#2563EB] px-4 py-2 rounded-lg hover:bg-[#EFF6FF] transition-colors">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onNavigate={(s, prod) => navigate(s, prod)} onAddToCart={onAddToCart} isWishlisted={wishlist.includes(p.id)} onToggleWishlist={onToggleWishlist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Categories ───────────────────────────────────────────────────────

function CategoriesScreen({ navigate }: { navigate: (s: Screen, p?: Product, cat?: string) => void }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>All Categories</h1>
          <p className="text-sm text-[#64748B] mt-1">Browse our wide selection of product categories</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate('listing', undefined, cat.name)}
              className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl active:scale-95 transition-all duration-200 hover:-translate-y-1 text-left"
            >
              <div className="relative h-44 overflow-hidden bg-[#F8FAFC]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-700 text-lg" style={{ fontWeight: 700 }}>{cat.name}</p>
                  <p className="text-white/80 text-sm">{cat.count.toLocaleString()} products</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-sm font-600 text-[#64748B]" style={{ fontWeight: 600 }}>Shop {cat.name}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Product Detail ────────────────────────────────────────────────────

function ProductDetailScreen({
  product,
  navigate,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: {
  product: Product
  navigate: (s: Screen, p?: Product) => void
  onAddToCart: (p: Product, qty: number, color: string) => void
  isWishlisted: boolean
  onToggleWishlist: (id: number) => void
}) {
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState('Midnight Black')
  const [activeTab, setActiveTab] = useState('description')
  const [activeThumb, setActiveThumb] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  // Reset on product change
  useEffect(() => {
    setQty(1)
    setColor('Midnight Black')
    setActiveTab('description')
    setActiveThumb(0)
    setAddedToCart(false)
  }, [product.id])

  const thumbs = [
    product.image,
    'https://images.unsplash.com/photo-1548378329-437e1ef34263?w=120&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1641048930621-ab5d225ae5b0?w=120&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=120&h=120&fit=crop&auto=format',
  ]

  const colors = ['Midnight Black', 'Platinum Silver', 'Midnight Blue']

  const reviews = [
    { name: 'Arjun Mehta', rating: 5, text: 'Absolutely stunning sound quality. The noise cancellation is top-tier — I use it daily for work calls and music.', date: '2 weeks ago' },
    { name: 'Priya Sharma', rating: 5, text: 'Worth every rupee. Build quality is excellent, ear cushions are super comfortable for long sessions.', date: '1 month ago' },
    { name: 'Rahul Gupta', rating: 4, text: 'Great headphones overall. Battery life is impressive. Minor complaint: the touch controls take some getting used to.', date: '1 month ago' },
  ]

  const specs = [
    ['Driver Size', '30mm'], ['Frequency Response', '4 Hz – 40 kHz'], ['Battery Life', '30 hours (ANC on)'],
    ['Charging', 'USB-C, 3-min quick charge'], ['Connectivity', 'Bluetooth 5.2, multipoint'], ['Weight', '250g'],
    ['Noise Cancellation', 'Industry-leading ANC'], ['Warranty', '1 Year'],
  ]

  const handleAddToCart = () => {
    onAddToCart(product, qty, color)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#64748B] mb-7 flex-wrap">
          <button onClick={() => navigate('landing')} className="hover:text-[#2563EB]">Home</button>
          <span>/</span>
          <button onClick={() => navigate('listing')} className="hover:text-[#2563EB]">{product.category}</button>
          <span>/</span>
          <span className="text-[#111827] truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          {/* Images */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              {thumbs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-14 h-14 rounded-lg border-2 overflow-hidden bg-[#F8FAFC] transition-all ${activeThumb === i ? 'border-[#2563EB] shadow-sm' : 'border-[#E5E7EB] hover:border-[#93C5FD]'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
              <img src={thumbs[activeThumb]} alt={product.name} className="w-full h-72 sm:h-96 lg:h-[440px] object-cover transition-all duration-200" />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-[#2563EB] font-600 mb-1" style={{ fontWeight: 600 }}>{product.brand}</p>
                <h1 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>{product.name}</h1>
              </div>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition-colors ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-[#E5E7EB] text-[#64748B] hover:border-red-200 hover:text-red-500'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Stars rating={product.rating} size={16} />
              <span className="font-600 text-[#111827] text-sm" style={{ fontWeight: 600 }}>{product.rating}</span>
              <span className="text-sm text-[#64748B]">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl sm:text-3xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>{fmt(product.price)}</span>
              <span className="text-base text-[#64748B] line-through">{fmt(product.originalPrice)}</span>
              <span className="bg-green-100 text-green-700 text-sm font-600 px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>{disc(product)}% OFF</span>
            </div>

            <p className="text-[#64748B] text-sm leading-relaxed mb-5">
              Experience industry-leading noise cancellation with exceptional sound quality. Multipoint Bluetooth connectivity and up to 30 hours of battery life.
            </p>

            {/* Color */}
            <div className="mb-5">
              <p className="text-sm font-600 text-[#111827] mb-2" style={{ fontWeight: 600 }}>
                Color: <span className="text-[#64748B] font-400">{color}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${color === c ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] font-600' : 'border-[#E5E7EB] text-[#64748B] hover:border-[#2563EB]'}`}
                    style={{ fontWeight: color === c ? 600 : 400 }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-600 text-[#111827] mb-2" style={{ fontWeight: 600 }}>Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-lg border border-[#E5E7EB] text-[#111827] hover:border-[#2563EB] flex items-center justify-center font-700 transition-colors"
                  style={{ fontWeight: 700 }}
                >
                  −
                </button>
                <span className="w-10 text-center font-600 text-[#111827] text-lg" style={{ fontWeight: 600 }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 rounded-lg border border-[#E5E7EB] text-[#111827] hover:border-[#2563EB] flex items-center justify-center font-700 transition-colors"
                  style={{ fontWeight: 700 }}
                >
                  +
                </button>
                <span className="text-sm text-[#64748B]">Total: <span className="font-600 text-[#111827]" style={{ fontWeight: 600 }}>{fmt(product.price * qty)}</span></span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 rounded-xl font-600 transition-all active:scale-95 ${product.inStock ? (addedToCart ? 'bg-green-500 text-white' : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-200') : 'bg-[#F1F5F9] text-[#64748B] cursor-not-allowed'}`}
                style={{ fontWeight: 600 }}
              >
                {addedToCart ? '✓ Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => { onAddToCart(product, qty, color); navigate('checkout') }}
                disabled={!product.inStock}
                className="flex-1 bg-[#111827] text-white py-3.5 rounded-xl font-600 hover:bg-[#1f2937] active:scale-95 transition-all disabled:opacity-40"
                style={{ fontWeight: 600 }}
              >
                Buy Now
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
              {['Free Delivery', 'Easy 30-day returns', '1 Year Warranty'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="text-green-500">✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="flex border-b border-[#E5E7EB] overflow-x-auto">
            {[
              { key: 'description', label: 'Description' },
              { key: 'specifications', label: 'Specifications' },
              { key: 'reviews', label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 sm:px-6 py-4 text-sm font-600 border-b-2 transition-colors shrink-0 ${activeTab === tab.key ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#111827]'}`}
                style={{ fontWeight: 600 }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-5 sm:p-6">
            {activeTab === 'description' && (
              <div className="text-[#64748B] text-sm leading-relaxed space-y-3">
                <p>The Sony WH-1000XM5 wireless headphones represent the pinnacle of audio technology. Building on the legendary XM4 series, Sony has refined every aspect to deliver an even more immersive listening experience.</p>
                <p>With 8 microphones and two processors, the XM5 analyzes ambient sound 400 times per second for unparalleled noise cancellation. The Integrated Processor V1 combined with the HD Noise Canceling Processor QN1 work in perfect harmony.</p>
                <p>Multipoint connection lets you stay connected to two Bluetooth devices simultaneously — perfect for switching between your laptop and phone without missing a beat.</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {specs.map(([key, value]) => (
                  <div key={key} className="flex gap-3 py-2.5 border-b border-[#F1F5F9]">
                    <span className="text-sm font-500 text-[#64748B] w-36 shrink-0" style={{ fontWeight: 500 }}>{key}</span>
                    <span className="text-sm text-[#111827]">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                <div className="flex items-center gap-5 mb-5 pb-5 border-b border-[#F1F5F9]">
                  <div className="text-center">
                    <p className="text-5xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>{product.rating}</p>
                    <Stars rating={product.rating} size={16} />
                    <p className="text-xs text-[#64748B] mt-1">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <div key={r} className="flex items-center gap-2">
                        <span className="text-xs text-[#64748B] w-2">{r}</span>
                        <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${r === 5 ? 68 : r === 4 ? 22 : r === 3 ? 7 : 2}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {reviews.map((r, i) => (
                  <div key={i} className="border-b border-[#F1F5F9] pb-5 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-[#EFF6FF] rounded-full flex items-center justify-center text-[#2563EB] text-sm font-700" style={{ fontWeight: 700 }}>{r.name[0]}</div>
                        <div>
                          <p className="text-sm font-600 text-[#111827]" style={{ fontWeight: 600 }}>{r.name}</p>
                          <Stars rating={r.rating} size={12} />
                        </div>
                      </div>
                      <span className="text-xs text-[#64748B] shrink-0">{r.date}</span>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Cart ─────────────────────────────────────────────────────────────

function CartScreen({
  cart,
  navigate,
  onUpdateQty,
  onRemove,
  showToast,
}: {
  cart: CartItem[]
  navigate: (s: Screen) => void
  onUpdateQty: (id: number, qty: number) => void
  onRemove: (id: number) => void
  showToast: (msg: string, type?: Toast['type']) => void
}) {
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>('GURU20')
  const [promoError, setPromoError] = useState('')

  const promoDiscount = appliedPromo ? (PROMO_CODES[appliedPromo] ?? 0) : 0
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = subtotal > 10000 ? 0 : 499
  const total = Math.max(0, subtotal - promoDiscount + delivery)

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code] !== undefined) {
      setAppliedPromo(code)
      setPromoError('')
      setPromoInput('')
      showToast(`Promo code "${code}" applied! You save ${fmt(PROMO_CODES[code])}`, 'success')
    } else {
      setPromoError('Invalid promo code. Try GURU20, SAVE500, or FIRST10.')
    }
  }

  const removePromo = () => {
    setAppliedPromo(null)
    showToast('Promo code removed', 'info')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-7xl">🛒</div>
        <h2 className="text-xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>Your cart is empty</h2>
        <p className="text-[#64748B] text-center">Add some products to get started</p>
        <button onClick={() => navigate('listing')} className="bg-[#2563EB] text-white px-6 py-3 rounded-xl font-600 hover:bg-[#1d4ed8] active:scale-95 transition-all" style={{ fontWeight: 600 }}>
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>
            Your Cart <span className="text-base font-500 text-[#64748B]">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
          </h1>
          <button onClick={() => navigate('listing')} className="text-sm text-[#2563EB] hover:underline font-500" style={{ fontWeight: 500 }}>Continue Shopping</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="bg-white rounded-xl border border-[#E5E7EB] p-4 flex gap-4">
                <button onClick={() => navigate('product')} className="w-20 sm:w-24 h-20 sm:h-24 bg-[#F8FAFC] rounded-lg overflow-hidden shrink-0 hover:opacity-90 transition-opacity">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-[#64748B] font-500" style={{ fontWeight: 500 }}>{item.brand}</p>
                      <h3 className="text-sm font-600 text-[#111827] mt-0.5 truncate" style={{ fontWeight: 600 }}>{item.name}</h3>
                      <p className="text-xs text-[#64748B] mt-0.5">Color: {item.color}</p>
                    </div>
                    <button
                      onClick={() => { onRemove(item.id); showToast(`${item.name} removed from cart`) }}
                      className="text-[#64748B] hover:text-red-500 transition-colors shrink-0 p-1"
                      title="Remove"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 rounded-lg border border-[#E5E7EB] text-sm flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] transition-colors font-700"
                        style={{ fontWeight: 700 }}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-600 text-[#111827]" style={{ fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-[#E5E7EB] text-sm flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] transition-colors font-700"
                        style={{ fontWeight: 700 }}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-700 text-[#111827]" style={{ fontWeight: 700 }}>{fmt(item.price * item.quantity)}</span>
                      {item.quantity > 1 && <p className="text-xs text-[#64748B]">{fmt(item.price)} each</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sticky top-24">
              <h3 className="font-700 text-[#111827] mb-5" style={{ fontWeight: 700 }}>Order Summary</h3>

              {/* Promo code */}
              {appliedPromo ? (
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-600 text-green-700" style={{ fontWeight: 600 }}>🎉 {appliedPromo} applied</p>
                    <p className="text-xs text-green-600">You save {fmt(promoDiscount)}!</p>
                  </div>
                  <button onClick={removePromo} className="text-green-600 hover:text-green-800 text-xs font-600" style={{ fontWeight: 600 }}>✕ Remove</button>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder-[#94A3B8] ${promoError ? 'border-red-300 focus:border-red-400' : 'border-[#E5E7EB] focus:border-[#2563EB]'}`}
                      placeholder="Enter promo code"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                      onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    />
                    <button
                      onClick={applyPromo}
                      className="px-3 py-2 text-sm bg-[#EFF6FF] text-[#2563EB] rounded-lg font-600 hover:bg-[#DBEAFE] transition-colors shrink-0"
                      style={{ fontWeight: 600 }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                  <p className="text-xs text-[#64748B] mt-1.5">Try: GURU20, SAVE500, FIRST10</p>
                </div>
              )}

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="text-[#111827]">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-600' : 'text-[#111827]'} style={{ fontWeight: delivery === 0 ? 600 : 400 }}>
                    {delivery === 0 ? 'FREE' : fmt(delivery)}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Discount ({appliedPromo})</span>
                    <span className="text-green-600 font-600" style={{ fontWeight: 600 }}>−{fmt(promoDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#E5E7EB] pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="font-700 text-[#111827]" style={{ fontWeight: 700 }}>Total</span>
                  <span className="font-700 text-[#111827] text-lg" style={{ fontWeight: 700 }}>{fmt(total)}</span>
                </div>
                {promoDiscount > 0 && (
                  <p className="text-xs text-green-600 mt-1">You save {fmt(promoDiscount + (delivery === 0 && subtotal > 10000 ? 499 : 0))} on this order!</p>
                )}
              </div>

              <button
                onClick={() => navigate('checkout')}
                className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-600 hover:bg-[#1d4ed8] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                style={{ fontWeight: 600 }}
              >
                Proceed to Checkout
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Checkout ─────────────────────────────────────────────────────────

function CheckoutScreen({
  cart,
  navigate,
  showToast,
}: {
  cart: CartItem[]
  navigate: (s: Screen) => void
  showToast: (msg: string, type?: Toast['type']) => void
}) {
  const [payMethod, setPayMethod] = useState('upi')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', state: '', pin: '',
    upi: '', cardNumber: '', expiry: '', cvv: '',
  })

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = Math.max(0, subtotal - 2000)

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone)) e.phone = 'Valid phone number required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!form.pin.trim() || !/^\d{6}$/.test(form.pin)) e.pin = '6-digit PIN code required'
    if (payMethod === 'upi' && !form.upi.trim()) e.upi = 'UPI ID is required'
    if (payMethod === 'card') {
      if (!form.cardNumber.trim()) e.cardNumber = 'Card number required'
      if (!form.expiry.trim()) e.expiry = 'Expiry required'
      if (!form.cvv.trim()) e.cvv = 'CVV required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = () => {
    if (validate()) {
      navigate('success')
    } else {
      showToast('Please fill all required fields correctly', 'error')
    }
  }

  const payMethods = [
    { id: 'upi', label: 'UPI', icon: '📱', desc: 'Pay via Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
  ]

  const Field = ({ id, label, placeholder, type = 'text', span = 1 }: { id: string; label: string; placeholder: string; type?: string; span?: number }) => (
    <div className={span === 2 ? 'col-span-2' : 'col-span-1'}>
      <label className="block text-xs font-600 text-[#64748B] mb-1.5" style={{ fontWeight: 600 }}>{label}</label>
      <input
        type={type}
        value={form[id as keyof typeof form]}
        onChange={(e) => set(id, e.target.value)}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors text-[#111827] placeholder-[#94A3B8] ${errors[id] ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-[#E5E7EB] focus:border-[#2563EB]'}`}
        placeholder={placeholder}
      />
      {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-7">
          <button onClick={() => navigate('cart')} className="text-[#64748B] hover:text-[#111827] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-xl sm:text-2xl font-700 text-[#111827]" style={{ fontWeight: 700 }}>Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-8">
          {['Cart', 'Delivery', 'Payment', 'Confirm'].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center gap-1.5 ${i < 3 ? 'text-[#2563EB]' : 'text-[#64748B]'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 ${i < 3 ? 'bg-[#2563EB] text-white' : 'bg-[#E5E7EB] text-[#64748B]'}`} style={{ fontWeight: 700 }}>
                  {i < 2 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-500 hidden sm:block" style={{ fontWeight: 500 }}>{step}</span>
              </div>
              {i < 3 && <div className={`w-8 sm:w-20 h-px mx-1.5 ${i < 2 ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Delivery address */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sm:p-6">
              <h2 className="font-700 text-[#111827] mb-5 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 bg-[#EFF6FF] rounded-full flex items-center justify-center text-[#2563EB] text-xs font-700" style={{ fontWeight: 700 }}>1</span>
                Delivery Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field id="name" label="Full Name *" placeholder="Arjun Mehta" />
                <Field id="phone" label="Phone Number *" placeholder="+91 98765 43210" type="tel" />
                <Field id="address" label="Address *" placeholder="42, MG Road, Apartment 4B" span={2} />
                <Field id="city" label="City *" placeholder="Bengaluru" />
                <Field id="state" label="State *" placeholder="Karnataka" />
                <Field id="pin" label="PIN Code *" placeholder="560001" />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sm:p-6">
              <h2 className="font-700 text-[#111827] mb-5 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 bg-[#EFF6FF] rounded-full flex items-center justify-center text-[#2563EB] text-xs font-700" style={{ fontWeight: 700 }}>2</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {payMethods.map((m) => (
                  <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === m.id ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-[#E5E7EB] hover:border-[#93C5FD]'}`}>
                    <input type="radio" name="payment" checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="accent-[#2563EB]" />
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <p className="text-sm font-600 text-[#111827]" style={{ fontWeight: 600 }}>{m.label}</p>
                      <p className="text-xs text-[#64748B]">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {payMethod === 'upi' && (
                <div className="mt-4">
                  <Field id="upi" label="UPI ID *" placeholder="yourname@upi" />
                </div>
              )}
              {payMethod === 'card' && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2"><Field id="cardNumber" label="Card Number *" placeholder="1234 5678 9012 3456" span={2} /></div>
                  <Field id="expiry" label="Expiry *" placeholder="MM/YY" />
                  <Field id="cvv" label="CVV *" placeholder="•••" type="password" />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sticky top-24">
              <h3 className="font-700 text-[#111827] mb-4" style={{ fontWeight: 700 }}>Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-11 h-11 bg-[#F8FAFC] rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-500 text-[#111827] truncate" style={{ fontWeight: 500 }}>{item.name}</p>
                      <p className="text-xs text-[#64748B]">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-600 text-[#111827] shrink-0" style={{ fontWeight: 600 }}>{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E5E7EB] pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Delivery</span>
                  <span className="text-green-600 font-600" style={{ fontWeight: 600 }}>FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Discount</span>
                  <span className="text-green-600 font-600" style={{ fontWeight: 600 }}>−₹2,000</span>
                </div>
                <div className="flex justify-between font-700 text-[#111827] pt-2 border-t border-[#E5E7EB]" style={{ fontWeight: 700 }}>
                  <span>Total</span><span>{fmt(total)}</span>
                </div>
              </div>
              <button
                onClick={placeOrder}
                className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-600 hover:bg-[#1d4ed8] active:scale-95 transition-all shadow-lg shadow-blue-200"
                style={{ fontWeight: 600 }}
              >
                Place Order →
              </button>
              <p className="text-xs text-[#64748B] text-center mt-3 flex items-center justify-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Secured by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Order Success ────────────────────────────────────────────────────

function OrderSuccessScreen({ navigate, clearCart }: { navigate: (s: Screen) => void; clearCart: () => void }) {
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            {[
              'top-0 right-6 bg-blue-400', 'top-3 left-3 bg-yellow-400',
              'bottom-3 right-0 bg-pink-400', 'bottom-0 left-6 bg-purple-400',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-3 h-3 rounded-full ${cls}`} />
            ))}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-700 text-[#111827] mb-3" style={{ fontWeight: 700 }}>Order Placed Successfully!</h1>
        <p className="text-[#64748B] mb-7">Thank you for shopping with CartGuru. Your order is confirmed and will be delivered soon.</p>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 mb-5 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[#64748B]">Order ID</p>
              <p className="font-700 text-[#111827] text-lg" style={{ fontWeight: 700 }}>#CG458921</p>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-600 px-3 py-1.5 rounded-full" style={{ fontWeight: 600 }}>✓ Confirmed</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Est. Delivery', value: '3–5 days' },
              { label: 'Payment', value: 'Completed' },
              { label: 'Updates via', value: 'Email & SMS' },
            ].map((d) => (
              <div key={d.label} className="bg-[#F8FAFC] rounded-xl p-3">
                <p className="text-xs text-[#64748B]">{d.label}</p>
                <p className="text-sm font-600 text-[#111827] mt-0.5" style={{ fontWeight: 600 }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 mb-7">
          <p className="text-sm font-600 text-[#111827] mb-4 text-left" style={{ fontWeight: 600 }}>Delivery Progress</p>
          <div className="flex items-start justify-between relative">
            <div className="absolute top-3.5 left-0 right-0 h-px bg-[#E5E7EB]" />
            {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 border-2 ${i === 0 ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'bg-white border-[#E5E7EB] text-[#64748B]'}`} style={{ fontWeight: 700 }}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <p className="text-[10px] text-center text-[#64748B] w-16">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate('listing')} className="flex-1 border border-[#E5E7EB] bg-white text-[#111827] py-3.5 rounded-xl font-600 hover:border-[#2563EB] hover:text-[#2563EB] active:scale-95 transition-all" style={{ fontWeight: 600 }}>
            Continue Shopping
          </button>
          <button className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl font-600 hover:bg-[#1d4ed8] active:scale-95 transition-all" style={{ fontWeight: 600 }}>
            Track Order
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Login ────────────────────────────────────────────────────────────

function LoginScreen({ navigate, showToast }: { navigate: (s: Screen) => void; showToast: (msg: string, type?: Toast['type']) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!isLogin && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      showToast(isLogin ? 'Welcome back! 👋' : 'Account created successfully! 🎉', 'success')
      setTimeout(() => navigate('landing'), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e40af] to-[#2563EB] flex-col justify-between p-12">
        <button onClick={() => navigate('landing')} className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <span className="text-xl font-700 text-white" style={{ fontWeight: 700 }}>CartGuru</span>
        </button>
        <div>
          <h2 className="text-4xl font-700 text-white mb-4 leading-tight" style={{ fontWeight: 700 }}>
            Your one-stop shop for everything
          </h2>
          <p className="text-blue-100 mb-8">Join 2 million+ happy shoppers who trust CartGuru for their everyday needs.</p>
          <div className="grid grid-cols-2 gap-4">
            {[{ n: '2M+', l: 'Happy Customers' }, { n: '50K+', l: 'Products' }, { n: '100+', l: 'Brands' }, { n: '4.9★', l: 'App Rating' }].map((s) => (
              <div key={s.l} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-700 text-white" style={{ fontWeight: 700 }}>{s.n}</p>
                <p className="text-sm text-blue-100">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-blue-200 text-sm">© 2026 CartGuru. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-7">
            <button onClick={() => navigate('landing')} className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <span className="text-lg font-700 text-[#111827]" style={{ fontWeight: 700 }}>Cart<span className="text-[#2563EB]">Guru</span></span>
            </button>
            <h1 className="text-2xl font-700 text-[#111827] mb-1" style={{ fontWeight: 700 }}>
              {isLogin ? 'Welcome Back 👋' : 'Create Account'}
            </h1>
            <p className="text-sm text-[#64748B]">
              {isLogin ? 'Sign in to your CartGuru account' : 'Join CartGuru to start shopping'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {!isLogin && (
              <div>
                <label className="block text-xs font-600 text-[#64748B] mb-1.5" style={{ fontWeight: 600 }}>Full Name</label>
                <input
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-[#94A3B8] ${errors.name ? 'border-red-300 bg-red-50' : 'border-[#E5E7EB] focus:border-[#2563EB]'}`}
                  placeholder="Arjun Mehta"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-600 text-[#64748B] mb-1.5" style={{ fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-[#94A3B8] ${errors.email ? 'border-red-300 bg-red-50' : 'border-[#E5E7EB] focus:border-[#2563EB]'}`}
                placeholder="arjun@example.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-600 text-[#64748B] mb-1.5" style={{ fontWeight: 600 }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className={`w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none transition-colors placeholder-[#94A3B8] ${errors.password ? 'border-red-300 bg-red-50' : 'border-[#E5E7EB] focus:border-[#2563EB]'}`}
                  placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#111827]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPass ? (
                      <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                    ) : (
                      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              {isLogin && <button type="button" className="text-xs text-[#2563EB] mt-1.5 hover:underline">Forgot Password?</button>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-600 hover:bg-[#1d4ed8] active:scale-95 transition-all shadow-lg shadow-blue-200"
              style={{ fontWeight: 600 }}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="text-xs text-[#64748B]">or</span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            <button
              type="button"
              className="w-full border border-[#E5E7EB] py-3 rounded-xl text-sm font-500 text-[#111827] hover:bg-[#F8FAFC] active:scale-95 transition-all flex items-center justify-center gap-3"
              style={{ fontWeight: 500 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm text-[#64748B] mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setIsLogin(!isLogin); setErrors({}) }} className="text-[#2563EB] font-600 hover:underline" style={{ fontWeight: 600 }}>
              {isLogin ? 'Create Account' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0])
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { toasts, show: showToast, remove: removeToast } = useToast()

  const navigate = (s: Screen, product?: Product, cat?: string) => {
    if (product) setSelectedProduct(product)
    if (cat) { setFilterCategory(cat); setSearchQuery('') }
    if (s === 'listing' && !cat) setFilterCategory('All')
    setScreen(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    setFilterCategory('All')
  }

  const addToCart = (product: Product, qty = 1, color = 'Default') => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.color === color)
      if (existing) {
        showToast(`${product.name} quantity updated`)
        return prev.map((i) => i.id === product.id && i.color === color ? { ...i, quantity: i.quantity + qty } : i)
      }
      showToast(`${product.name} added to cart 🛒`)
      return [...prev, { ...product, quantity: qty, color }]
    })
  }

  const updateQty = (id: number, qty: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (id: number) => {
    const product = PRODUCTS.find((p) => p.id === id)
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from wishlist')
        return prev.filter((i) => i !== id)
      }
      showToast(`${product?.name} saved to wishlist ❤️`)
      return [...prev, id]
    })
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const noHeader = screen === 'login' || screen === 'success'

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {!noHeader && (
        <Header
          screen={screen}
          navigate={navigate}
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          onSearch={(q) => { handleSearch(q); setScreen('listing') }}
        />
      )}

      {screen === 'landing' && <LandingScreen navigate={navigate} onAddToCart={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} />}
      {screen === 'listing' && <ListingScreen navigate={navigate} onAddToCart={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} initialCategory={filterCategory} searchQuery={searchQuery} />}
      {screen === 'categories' && <CategoriesScreen navigate={navigate} />}
      {screen === 'product' && <ProductDetailScreen product={selectedProduct} navigate={navigate} onAddToCart={addToCart} isWishlisted={wishlist.includes(selectedProduct.id)} onToggleWishlist={toggleWishlist} />}
      {screen === 'cart' && <CartScreen cart={cart} navigate={navigate} onUpdateQty={updateQty} onRemove={removeFromCart} showToast={showToast} />}
      {screen === 'checkout' && <CheckoutScreen cart={cart} navigate={navigate} showToast={showToast} />}
      {screen === 'success' && <OrderSuccessScreen navigate={navigate} clearCart={clearCart} />}
      {screen === 'login' && <LoginScreen navigate={navigate} showToast={showToast} />}

      <ToastContainer toasts={toasts} remove={removeToast} />
    </div>
  )
}
