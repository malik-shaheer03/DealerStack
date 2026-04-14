import { useEffect, useState } from 'react'
import { formatPrice } from '../../api/vehicles'
import Badge from '../ui/Badge'
import styles from './VehicleCard.module.css'

function formatMileage(mileage) {
	if (typeof mileage !== 'number') {
		return '—'
	}

	return `${new Intl.NumberFormat('en-US').format(mileage)} mi`
}

function VehicleCard({
	vehicle,
	index = 0,
	onSelect,
	isSaved,
	onToggleSaved,
}) {
	const {
		year,
		make,
		model,
		price,
		mileage,
		color,
		fuel_type: fuelType,
		transmission,
		image,
		fallbackImage,
	} = vehicle

	const displayName = `${make ?? ''} ${model ?? ''}`.trim() || 'Unknown Vehicle'
	const imageAlt = `${year ?? ''} ${make ?? ''} ${model ?? ''}`.replace(/\s+/g, ' ').trim() || 'Vehicle image'
	const displayColor = color ? color : '—'
	const displayFuel = fuelType ? String(fuelType) : 'Unknown'
	const displayTransmission = transmission ? String(transmission) : 'Unknown'
	const [showImage, setShowImage] = useState(Boolean(image))

	useEffect(() => {
		setShowImage(Boolean(image))
	}, [image])

	const handleActivate = () => {
		onSelect?.(vehicle)
	}

	return (
		<article
			className={styles.card}
			style={{ animationDelay: `${index * 60}ms` }}
			onClick={handleActivate}
			onKeyDown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					handleActivate()
				}
			}}
			tabIndex={0}
			role="button"
			aria-label={`Open details for ${displayName}`}
		>
			<div className={styles.media}>
				{image && showImage ? (
					<img
						className={styles.image}
						src={image}
						alt={imageAlt}
						loading="lazy"
						decoding="async"
						fetchPriority={index < 4 ? 'high' : 'low'}
						onError={(event) => {
							if (fallbackImage && event.currentTarget.src !== fallbackImage) {
								event.currentTarget.src = fallbackImage
								return
							}

							setShowImage(false)
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

				<div className={styles.badges}>
					<Badge variant="default">{displayFuel}</Badge>
					<Badge variant="default">{displayTransmission}</Badge>
				</div>
			</div>

			<div className={styles.content}>
				<p className={styles.year}>{year ?? '—'}</p>
				<h3 className={styles.title}>{displayName}</h3>
				<div className={styles.divider} />

				<div className={styles.stats}>
					<div className={styles.stat}>
						<span className={styles.statLabel}>Mileage</span>
						<span className={styles.statValue}>{formatMileage(mileage)}</span>
					</div>
					<div className={styles.stat}>
						<span className={styles.statLabel}>Color</span>
						<span className={styles.statValue}>{displayColor}</span>
					</div>
				</div>

				<p className={styles.price}>{typeof price === 'number' ? formatPrice(price) : '—'}</p>

				<div className={styles.actionsRow}>
					<button
						type="button"
						className={`${styles.actionButton} ${isSaved ? styles.actionActive : ''}`}
						onClick={(event) => {
							event.stopPropagation()
							onToggleSaved?.(vehicle.id)
						}}
					>
						{isSaved ? 'Saved' : 'Save'}
					</button>
				</div>
			</div>
		</article>
	)
}

export default VehicleCard