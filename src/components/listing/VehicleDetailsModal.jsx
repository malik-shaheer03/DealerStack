import { useCallback, useEffect, useState } from 'react'
import { formatPrice, getVehicleGallery } from '../../api/vehicles'
import Badge from '../ui/Badge'
import styles from './VehicleDetailsModal.module.css'

const CLOSE_ANIMATION_MS = 240

function formatMileage(mileage) {
	if (typeof mileage !== 'number') {
		return '—'
	}

	return `${new Intl.NumberFormat('en-US').format(mileage)} mi`
}

function VehicleDetailsModal({ vehicle, onClose }) {
	const [activeIndex, setActiveIndex] = useState(0)
	const [hiddenImages, setHiddenImages] = useState({})
	const [isClosing, setIsClosing] = useState(false)
	const gallery = getVehicleGallery(vehicle)
	const activeImage = gallery[activeIndex]
	const hasMultipleImages = gallery.length > 1

	const requestClose = useCallback(() => {
		if (isClosing) {
			return
		}

		setIsClosing(true)
	}, [isClosing])

	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key === 'Escape') {
				requestClose()
			}
		}

		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKeyDown)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [requestClose])

	useEffect(() => {
		if (!isClosing) {
			return undefined
		}

		const closeTimer = window.setTimeout(() => {
			onClose()
		}, CLOSE_ANIMATION_MS)

		return () => {
			window.clearTimeout(closeTimer)
		}
	}, [isClosing, onClose])

	const imageAlt = `${vehicle?.year ?? ''} ${vehicle?.make ?? ''} ${vehicle?.model ?? ''}`.replace(/\s+/g, ' ').trim() || 'Vehicle image'

	const handleImageError = (index) => {
		setHiddenImages((prev) => ({ ...prev, [index]: true }))
	}

	const getNextIndex = (direction) => {
		if (gallery.length <= 1) {
			return activeIndex
		}

		for (let step = 1; step <= gallery.length; step += 1) {
			const candidate = (activeIndex + direction * step + gallery.length) % gallery.length

			if (!hiddenImages[candidate]) {
				return candidate
			}
		}

		return activeIndex
	}

	return (
		<div
			className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
			onClick={requestClose}
			role="presentation"
		>
			<div
				className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}
				role="dialog"
				aria-modal="true"
				aria-label="Vehicle details"
				onClick={(event) => event.stopPropagation()}
			>
				<button type="button" className={styles.closeButton} onClick={requestClose} aria-label="Close vehicle details">
					×
				</button>

				<div className={styles.media}>
					{hasMultipleImages ? (
						<>
							<button
								type="button"
								className={`${styles.navArrow} ${styles.prevArrow}`}
								onClick={() => setActiveIndex(getNextIndex(-1))}
								aria-label="Previous image"
							>
								‹
							</button>
							<button
								type="button"
								className={`${styles.navArrow} ${styles.nextArrow}`}
								onClick={() => setActiveIndex(getNextIndex(1))}
								aria-label="Next image"
							>
								›
							</button>
						</>
					) : null}

					{activeImage && !hiddenImages[activeIndex] ? (
						<img
							className={styles.image}
							src={activeImage}
							alt={imageAlt}
							loading="eager"
							decoding="async"
							fetchPriority="high"
							onError={() => {
								handleImageError(activeIndex)
								setActiveIndex(getNextIndex(1))
							}}
						/>
					) : (
						<div className={styles.imagePlaceholder} aria-hidden="true">
							<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M10 40h44M18 40l4-11h20l8 11M17 40a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm30 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					)}
				</div>

				<div className={styles.thumbRow}>
					{gallery.map((image, index) => {
						if (!image || hiddenImages[index]) {
							return null
						}

						return (
							<button
								type="button"
								key={`${vehicle?.id}-${index}`}
								className={`${styles.thumbButton} ${activeIndex === index ? styles.thumbActive : ''}`}
								onClick={() => setActiveIndex(index)}
							>
								<img
									src={image}
									alt={`${imageAlt} view ${index + 1}`}
									loading="lazy"
									decoding="async"
									onError={() => handleImageError(index)}
								/>
							</button>
						)
					})}
				</div>

				<div className={styles.content}>
					<div className={styles.badgeRow}>
						<Badge variant="default">{vehicle?.fuel_type ?? 'Unknown'}</Badge>
						<Badge variant="default">{vehicle?.transmission ?? 'Unknown'}</Badge>
					</div>
					<p className={styles.year}>{vehicle?.year ?? '—'}</p>
					<h2 className={styles.title}>{`${vehicle?.make ?? ''} ${vehicle?.model ?? ''}`.trim() || 'Unknown Vehicle'}</h2>
					<p className={styles.price}>{typeof vehicle?.price === 'number' ? formatPrice(vehicle.price) : '—'}</p>

					<div className={styles.detailsGrid}>
						<div>
							<p className={styles.detailLabel}>Mileage</p>
							<p className={styles.detailValue}>{formatMileage(vehicle?.mileage)}</p>
						</div>
						<div>
							<p className={styles.detailLabel}>Color</p>
							<p className={styles.detailValue}>{vehicle?.color ?? '—'}</p>
						</div>
						<div>
							<p className={styles.detailLabel}>Fuel Type</p>
							<p className={styles.detailValue}>{vehicle?.fuel_type ?? '—'}</p>
						</div>
						<div>
							<p className={styles.detailLabel}>Transmission</p>
							<p className={styles.detailValue}>{vehicle?.transmission ?? '—'}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VehicleDetailsModal
