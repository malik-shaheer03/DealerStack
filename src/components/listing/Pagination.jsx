import styles from './Pagination.module.css'

function getVisiblePages(currentPage, totalPages) {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, index) => index + 1)
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, 'ellipsis-right', totalPages]
	}

	if (currentPage >= totalPages - 2) {
		return [1, 'ellipsis-left', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
	}

	return [1, 'ellipsis-left', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-right', totalPages]
}

function Pagination({ currentPage, totalPages, onPageChange }) {
	if (totalPages <= 1) {
		return null
	}

	const pages = getVisiblePages(currentPage, totalPages)

	return (
		<nav className={styles.pagination} aria-label="Pagination">
			<button
				type="button"
				className={styles.pageButton}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label="Previous page"
			>
				‹
			</button>

			{pages.map((item, index) => {
				if (typeof item !== 'number') {
					return (
						<span key={`${item}-${index}`} className={styles.ellipsis} aria-hidden="true">
							…
						</span>
					)
				}

				const isActive = item === currentPage

				return (
					<button
						type="button"
						key={item}
						className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
						onClick={() => onPageChange(item)}
						aria-current={isActive ? 'page' : undefined}
					>
						{item}
					</button>
				)
			})}

			<button
				type="button"
				className={styles.pageButton}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label="Next page"
			>
				›
			</button>
		</nav>
	)
}

export default Pagination