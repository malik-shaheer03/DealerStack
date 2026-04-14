import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
	return (
		<div className={styles.wrapper}>
			<svg
				className={styles.icon}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M11 4.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm8.5 14.5-3.7-3.7"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search by make or model"
				className={styles.input}
				aria-label="Search vehicles"
			/>

			{value ? (
				<button
					type="button"
					className={styles.clearButton}
					onClick={() => onChange('')}
					aria-label="Clear search"
				>
					×
				</button>
			) : null}
		</div>
	)
}

export default SearchBar