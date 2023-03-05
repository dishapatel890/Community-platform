import { useRef } from "react";
import styles from '../Styles/Navbar.module.css';
import { FaBars, FaHome, FaTimes, FaUsers } from "react-icons/fa";
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { RiUserSettingsFill } from 'react-icons/ri';
import logo from '../Images/logo.png';
import { NavLink } from "react-router-dom";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(styles.responsive_nav);
	};

	return (
		<header>
			<img src={logo} alt="logo" className={styles.img_icon} />
			<nav ref={navRef}>
				<NavLink to='/home' className={({ isActive }) => (isActive ? styles.link_active : styles.link)}><FaHome /> Home</NavLink>

				<NavLink className={({ isActive }) => (isActive ? styles.link_active : styles.link)} to='/community'><FaUsers /> Community</NavLink>

				<NavLink className={({ isActive }) => (isActive ? styles.link_active : styles.link)} to='/chat'><BsFillChatSquareTextFill /> Friends</NavLink>

				<NavLink className={({ isActive }) => (isActive ? styles.link_active : styles.link)} to='/profile'><RiUserSettingsFill /> Profile </NavLink>
				
				<button
					className={`${styles.nav_btn} ${styles.nav_close_btn}`}
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className={styles.nav_btn} onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;