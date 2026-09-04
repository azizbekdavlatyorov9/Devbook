import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import image from './pictures/Group 2.png';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const books = ['Dunyoning ishlari', 'Ikki eshik orasi', 'Tushda kechgan umrlar', 'Ajdarlarning tavbasi', 'Ulug‘bek xazinasi', 'Yulduzli tunlar', 'O‘tkan kunlar', 'Ruhlar isyoni', 'Yo‘q'];
  const search = (event) => { event.preventDefault(); navigate(`/books${query ? `?q=${encodeURIComponent(query)}` : ''}`); };
  return <section className={styles.home}>
    <div className={styles.banner}><img src={image} alt="Temuriylar davri adabiyoti" /><h1 className={styles.bannerText}>TEMURIYLAR<br />DAVRI<br />ADABIYOTI</h1></div>
    <form className={styles.searchBox} onSubmit={search}><h2>QIDIRISH</h2><div className={styles.search}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Adiblar, kitoblar, audiolar, maqolalar..." /><button><FaSearch /> Izlash</button></div></form>
    <div className={styles.category}><h2>ASOSIY KATEGORIYALAR</h2><div className={styles.categoryList}>{['Temuriylar davri', 'Jadid adabiyoti', 'Sovet davri', 'Mustaqillik davri'].map((category) => <button key={category} onClick={() => navigate('/books')}>{category}</button>)}</div></div>
    <div className={styles.preview}><aside className={styles.aside}><h3>Hozir o‘qilmoqda...</h3>{books.slice(0, 4).map((book) => <div className={styles.reading} key={book}><span className={styles.readingDot} />{book}</div>)}</aside><section className={styles.shelf}><h3 className={styles.shelfTitle}>Tavsiya etilgan kitoblar</h3><div className={styles.bookGrid}>{books.map((book) => <article className={styles.book} key={book}><div className={styles.cover}>{book}</div><p>{book}</p></article>)}</div></section></div>
  </section>;
}
