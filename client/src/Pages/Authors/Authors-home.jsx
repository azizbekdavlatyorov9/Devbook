import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, api } from '../../api';
import { useAuth } from '../../auth/AuthContext';
import styles from '../catalog.module.css';

export default function Authors() {
  const [authors, setAuthors] = useState([]); const [query, setQuery] = useState(''); const [error, setError] = useState('');
  const { user, loading } = useAuth(); const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate('/login'); }, [user, loading, navigate]);
  useEffect(() => { if (!user) return; const timer = setTimeout(() => api(`/author_search?searchingvalue=${encodeURIComponent(query)}`).then(setAuthors).catch((e) => setError(e.message)), 250); return () => clearTimeout(timer); }, [query, user]);
  if (loading || !user) return null;
  const pictureUrl = (picture) => picture?.replace('http://localhost:4001/images/', `${API_URL}/uploads/`);
  return <section className={styles.page}><div className={styles.header}><h1>Adiblar</h1><input className={styles.search} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Adib nomi bo‘yicha qidiring" /></div>{error ? <p className={styles.notice}>{error}</p> : <div className={styles.grid}>{authors.map((author) => <article className={styles.card} key={author._id}>{author.picture ? <img className={styles.image} src={pictureUrl(author.picture)} alt={author.full_name} /> : <div className={styles.notice}>{author.full_name}</div>}<div className={styles.content}><h2>{author.full_name}</h2><p>{author.birth_year} — {author.death_year}</p><p>{author.work}</p><span className={styles.tag}>{author.period}</span></div></article>)}</div>}{!error && !authors.length && <p className={styles.notice}>Mualliflar topilmadi.</p>}</section>;
}
