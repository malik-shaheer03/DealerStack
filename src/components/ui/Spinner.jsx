import styles from './Spinner.module.css'

function Spinner({ size = 40 }) {
	return (
		<div className={styles.spinnerWrap} role="status" aria-live="polite" aria-label="Loading">
			<svg
				className={styles.spinner}
				width={size}
				height={size}
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					className={styles.track}
					cx="20"
					cy="20"
					r="16"
					strokeWidth="4"
				/>
				<circle
					className={styles.arc}
					cx="20"
					cy="20"
					r="16"
					strokeWidth="4"
					strokeLinecap="round"
					strokeDasharray="70 120"
				/>
			</svg>
		</div>
	)
}

export default Spinner