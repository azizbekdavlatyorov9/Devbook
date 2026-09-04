import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../auth/AuthContext';
import styles from '../catalog.module.css';

export default function Books() {
  const location = useLocation();
  const [books, setBooks] = useState([]); const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('q') ?? ''); const [error, setError] = useState('');
  const { user, loading } = useAuth(); const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate('/login'); }, [user, loading, navigate]);
  useEffect(() => { if (!user) return; const endpoint = query ? `/book_search?searchingvalue=${encodeURIComponent(query)}` : '/get_all_books'; const timer = setTimeout(() => api(endpoint).then(setBooks).catch((e) => setError(e.message)), 250); return () => clearTimeout(timer); }, [query, user]);
  if (loading || !user) return null;
  return <section className={styles.page}><div className={styles.header}><h1>Kitoblar</h1><input className={styles.search} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Kitob nomi bo‘yicha qidiring" /></div>{error ? <p className={styles.notice}>{error}</p> : <div className={styles.grid}>{books.map((book) => <article className={styles.card} key={book._id}><div className={styles.content}><h2>{book.title}</h2><p>{book.author_info?.full_name ?? 'Muallif ko‘rsatilmagan'}</p><p>{book.published_year} · {book.pages} sahifa</p><p>{book.publisher}</p><span className={styles.tag}>{book.genres}</span></div></article>)}</div>}{!error && !books.length && <p className={styles.notice}>Kitoblar topilmadi.</p>}</section>;
}
