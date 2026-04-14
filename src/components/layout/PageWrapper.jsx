import styles from './PageWrapper.module.css'

function PageWrapper({ children, title, subtitle }) {
	return (
		<main className={styles.main}>
			{title && (
				<header className={styles.pageHeader}>
					<h1 className={styles.title}>{title}</h1>
					{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
					<hr className={styles.rule} />
				</header>
			)}

			{children}
		</main>
	)
}

export default PageWrapper