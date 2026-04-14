import styles from './ErrorState.module.css'

function ErrorState({ message, onRetry }) {
	return (
		<section className={styles.container} role="alert" aria-live="assertive">
			<svg
				className={styles.icon}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M12 3.5L21 20.5H3L12 3.5Z"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinejoin="round"
				/>
				<path d="M12 9V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				<circle cx="12" cy="17.2" r="1" fill="currentColor" />
			</svg>

			<h2 className={styles.title}>Something went wrong</h2>
			<p className={styles.message}>{message}</p>

			{onRetry && (
				<button type="button" className={styles.retryButton} onClick={onRetry}>
					Retry
				</button>
			)}
		</section>
	)
}

export default ErrorState