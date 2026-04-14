import styles from './Badge.module.css'

function Badge({ children, variant = 'default' }) {
	const variantClass = styles[variant] || styles.default

	return <span className={`${styles.badge} ${variantClass}`}>{children}</span>
}

export default Badge