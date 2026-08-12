import React from "react";
import style from './navbar.module.css'
// import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <>
    <div className={style.navbar_container}> 
    <h1 className={style.navbar_logo}>BADIIYAT</h1> 
    <div className={style.navbar_links}>
      <a href="/#" style={{textDecoration: 'none',}}>Bosh Sahifa</a>
      <a href="/about" style={{textDecoration: 'none',}}>Nasr</a>
      <a href="/projects" style={{textDecoration: 'none', }}>Nazm</a>
      <a href="/contact" style={{textDecoration: 'none', }}>Maqolalar</a>
      <a href="/login" className={style.login} style={{textDecoration: 'none',}}>Forum</a>
    </div>
    </div>
    </>
  );
};
{
}

export default Navbar;
  /* <Link to="/" style={{textDecoration: 'none', color: '#334155'}}>Bosh Sahifa</Link>
      <Link to="/nasr" style={{textDecoration: 'none', color: '#334155'}}>Nasr</Link>
      <Link to="/nazm" style={{textDecoration: 'none', color: '#334155'}}>Nazm</Link>
      <Link to="/maqolalar" style={{textDecoration: 'none', color: '#334155'}}>Maqolalar</Link>
      <Link to="/forum" className="" style={{textDecoration: 'none',  color: '#334155'}}>Forum</Link> */
