import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoMark from '../../assets/dealerstack-mark.svg'
import styles from './Navbar.module.css'

function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setIsScrolled(window.scrollY > 8)
		}

		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth > 700) {
				setIsMenuOpen(false)
			}
		}

		window.addEventListener('resize', onResize)
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header className={`${styles.navbar} navbar-shell ${isScrolled ? styles.scrolled : ''}`}>
			<div className={`${styles.inner} navbar-inner`}>
				<div className={styles.brand}>
					<img src={logoMark} alt="DealerStack logo" className={styles.logoMark} />
					<div className={styles.wordmarkWrap}>
						<span className={styles.wordmark}>DealerStack</span>
						<span className={styles.wordmarkTag}>Drive Better Deals</span>
					</div>
				</div>
				<button
					type="button"
					className={styles.menuButton}
					onClick={() => setIsMenuOpen((prev) => !prev)}
					aria-expanded={isMenuOpen}
					aria-controls="primary-nav"
					aria-label="Toggle navigation menu"
				>
					<span className={`${styles.menuIconLine} ${isMenuOpen ? styles.menuIconLineTopOpen : ''}`} />
					<span className={`${styles.menuIconLine} ${isMenuOpen ? styles.menuIconLineMiddleOpen : ''}`} />
					<span className={`${styles.menuIconLine} ${isMenuOpen ? styles.menuIconLineBottomOpen : ''}`} />
				</button>

				<nav
					id="primary-nav"
					className={`${styles.nav} navbar-nav ${isMenuOpen ? styles.navOpen : ''}`}
					aria-label="Primary navigation"
				>
					<NavLink
						to="/"
						end
						className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
						onClick={closeMenu}
					>
						Inventory
					</NavLink>
					<NavLink
						to="/saved"
						className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
						onClick={closeMenu}
					>
						Saved
					</NavLink>
					<NavLink
						to="/form"
						className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
						onClick={closeMenu}
					>
						Register
					</NavLink>
				</nav>
			</div>
		</header>
	)
}

export default Navbar