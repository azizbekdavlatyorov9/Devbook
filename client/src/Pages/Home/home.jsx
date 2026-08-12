import React from "react";
import styles from "./home.module.css";
import { FaSearch } from "react-icons/fa";
import image from "./pictures/Group 2.png"

const Home = ({ banner }) => {
  return (
    <section className={styles.home}>
      {/* Banner */}
      <div className={styles.banner}>
        <img src={image} alt="Banner" />
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <h2>QIDIRISH</h2>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
          />

          <button>
            <FaSearch />
            Izlash
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.category}>
        <h2>ASOSIY KATEGORIYALAR</h2>

        <div className={styles.categoryList}>
          <button>Temuriylar davri</button>
          <button>Jadid adabiyoti</button>
          <button>Sovet davri</button>
          <button>Mustaqillik davri</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
