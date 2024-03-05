import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthWrapper';
import UserImg from './user.png';
import './navbarMobile.css'
import Cookies from 'universal-cookie';
const NavbarMobile = () => {
    const { user,logout } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const cookies = new Cookies();
    const FirstNameTH = cookies.get('FirstNameTH');
  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    setMenuOpen(false);
  };
  const handleLinkClick1 = () => {
    navigate('/Personal');
    setMenuOpen(false);
  };
    return (
        <>
            {/* <div className="navMobile">
                <div className="navContainer">
                    <Link to="/Home" className="headNav">ระบบฐานข้อมูลอาจารย์</Link>

                    <button className="btnNavbar" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <div className="menuIcon">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <span className="exitSide">X</span>
                        )}
                    </button>
                </div>
            </div> */}
            {/* <div className={`sideNav bg-Info ${isOpen ? 'sideClose' : 'sideOpen'}`}>
                <div className="sidebar">
                    <Link to="/Home">Home</Link>
                    {!user.isAuthenticated && <Link to="/Login">เข้าสู่ระบบ</Link>}
                    {user.isAuthenticated && (
                        <>
                            <Link to="/">
                                <img src={UserImg} alt="User" /> Account
                            </Link>
                            <div className="pageProfile">
                                <Link to="/Personal">ประวัติส่วนตัว</Link>
                                <Link to="/EducationBackground">ประวัติการศึกษา</Link>
                                <Link to="/Journal">งานวิชาการ</Link>
                                <Link to="/">โครงการวิจัย</Link>
                                <Link to="/">หนังสือ</Link>
                                <Link to="/">งานวิจัยที่สนใจ</Link>
                                <Link to="/">หลักสูตรที่เปิดสอน</Link>
                                <Link to="/">ประสบการณ์การทำงาน</Link>
                                <Link to="/">ประสบการณ์การฝึกงาน</Link>
                                <Link to="/">อาจารย์ที่ปรึกษา</Link>
                            </div>
                            <Link className='linkLogout' to="/Home" onClick={logout}>ออกจากระบบ</Link>
                        </>
                    )}
                </div>
            </div> */}
            <div className="navMobile">
                <div className="navContainer">
                    <Link to="/" className="headNav">ระบบฐานข้อมูลอาจารย์</Link>

                    <input type='checkbox' id='check' checked={isMenuOpen} onChange={() => setMenuOpen(!isMenuOpen)}></input>
                    <label className='iconMenu' for='check'>
                        <row className="menuIcon" id='menuIcon'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </row>
                        <row className="exitSide" id="closeMenuIcon" >X</row>
                    </label>

                    <nav className={`sideNav ${isMenuOpen ? 'open' : ''}`}>
                        <div className='inSideNav'>
                            <Link to="/SearchProfile" onClick={handleLinkClick}>Search</Link>
                            
                            {!user.isAuthenticated && <Link to="/Login" onClick={handleLinkClick}>เข้าสู่ระบบ</Link>}
                            {user.isAuthenticated && (
                                <>
                                    <div className='Name-navbar'>
                                        <Link to="/Personal">
                                        <img src={UserImg} alt="User" onClick={handleLinkClick1}/> {FirstNameTH} 
                                        </Link>

                                        <div className='export-cv'>
                                        <Link to="/getCV" className='exportToCV'>Export CV</Link>
                                        </div>
                                   
                                   </div>
                                    <div className="pageProfile">
                                        <Link to="/Personal"onClick={handleLinkClick}>ประวัติส่วนตัว</Link>
                                        <Link to="/EducationBackground"onClick={handleLinkClick}>ประวัติการศึกษา</Link>
                                        <Link to="/Journal"onClick={handleLinkClick}>งานวิชาการ</Link>
                                        <Link to="/"onClick={handleLinkClick}>โครงการวิจัย</Link>
                                        <Link to="/"onClick={handleLinkClick}>หนังสือ</Link>
                                        <Link to="/"onClick={handleLinkClick}>งานวิจัยที่สนใจ</Link>
                                        <Link to="/"onClick={handleLinkClick}>หลักสูตรที่เปิดสอน</Link>
                                        <Link to="/"onClick={handleLinkClick}>ประสบการณ์การทำงาน</Link>
                                        <Link to="/"onClick={handleLinkClick}>ประสบการณ์การฝึกงาน</Link>
                                        <Link to="/"onClick={handleLinkClick}>อาจารย์ที่ปรึกษา</Link>
                                    </div>
                                    <Link className='linkLogout' to="/" onClick={logout}>ออกจากระบบ</Link>
                                </>
                            )}
                            {/* <Link to="/">
                                    <img src={UserImg} alt="User" /> Account
                            </Link>
                            <div className="pageProfile">
                                    <Link to="/Personal">ประวัติส่วนตัว</Link>
                                    <Link to="/EducationBackground">ประวัติการศึกษา</Link>
                                    <Link to="/Journal">งานวิชาการ</Link>
                                    <Link to="/">โครงการวิจัย</Link>
                                    <Link to="/">หนังสือ</Link>
                                    <Link to="/">งานวิจัยที่สนใจ</Link>
                                    <Link to="/">หลักสูตรที่เปิดสอน</Link>
                                    <Link to="/">ประสบการณ์การทำงาน</Link>
                                    <Link to="/">ประสบการณ์การฝึกงาน</Link>
                                    <Link to="/">อาจารย์ที่ปรึกษา</Link>
                                </div>
                                <Link to="/" className='exportToCV'>Export CV</Link>
                                <Link className='linkLogout' to="/Home" onClick={logout}>ออกจากระบบ</Link> */}
                        </div>
                    </nav>

                    <div className='backgroundNav'></div>
                </div>
            </div>
        </>
    );
};

export default NavbarMobile;
