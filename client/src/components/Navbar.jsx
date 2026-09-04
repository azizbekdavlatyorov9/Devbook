import React from "react";
import style from './navbar.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';



const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = async () => { await logout(); navigate('/login'); };
  return (
    <>
    <div className={style.navbar_container}> 
    <h1 className={style.navbar_logo}>BADIIYAT</h1> 
    <div className={style.navbar_links}>
      <Link to="/">Bosh sahifa</Link>
      <Link to="/books">Kitoblar</Link>
      <Link to="/authors">Adiblar</Link>
      {user?.role === "admin" && <Link to="/add-book">Qo‘shish</Link>}
      {user ? <button className={style.login} onClick={signOut}>Chiqish</button> : <Link to="/login" className={style.login}>Kirish</Link>}
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
