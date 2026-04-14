import { getVehicleMappedImage } from './vehicleImageMap'

export const VEHICLES_API_URL = '/mock/vehicles.json'

const MAX_VEHICLES = 15
const WIKIMEDIA_FILE_PATH_MARKER = '/wiki/Special:FilePath/'

function toNumber(value, fallback = 0) {
	const parsed = Number(value)
	return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeImageUrl(value) {
	if (typeof value !== 'string') {
		return ''
	}

	const trimmed = value.trim()

	if (!trimmed) {
		return ''
	}

	if (trimmed.startsWith(WIKIMEDIA_FILE_PATH_MARKER)) {
		const fileName = trimmed.slice(WIKIMEDIA_FILE_PATH_MARKER.length)
		if (!fileName) {
			return ''
		}

		return `https://commons.wikimedia.org${WIKIMEDIA_FILE_PATH_MARKER}${encodeURIComponent(fileName)}`
	}

	try {
		const parsed = new URL(trimmed)

		if (parsed.hostname === 'commons.wikimedia.org' && parsed.pathname.includes(WIKIMEDIA_FILE_PATH_MARKER)) {
			const [prefix, fileName = ''] = parsed.pathname.split(WIKIMEDIA_FILE_PATH_MARKER)

			if (!fileName) {
				return trimmed
			}

			parsed.pathname = `${prefix}${WIKIMEDIA_FILE_PATH_MARKER}${encodeURIComponent(decodeURIComponent(fileName))}`
			parsed.search = ''
			return parsed.toString()
		}

		return parsed.toString()
	} catch {
		return ''
	}
}

function toSafeLabel(value, fallback) {
	const label = String(value ?? '').trim()
	return label || fallback
}

function createVehicleFallbackImage(make, model, year) {
	const title = `${year} ${make} ${model}`.replace(/\s+/g, ' ').trim()
	const subtitle = 'Image unavailable'
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
			<defs>
				<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="#0f172a" />
					<stop offset="100%" stop-color="#1e293b" />
				</linearGradient>
			</defs>
			<rect width="1200" height="800" fill="url(#bg)" />
			<g fill="none" stroke="#94a3b8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.7">
				<path d="M260 470h680M360 470l60-140h320l120 140M350 470a46 46 0 1 0 0 92 46 46 0 0 0 0-92Zm500 0a46 46 0 1 0 0 92 46 46 0 0 0 0-92Z"/>
			</g>
			<text x="600" y="650" font-family="Arial, Helvetica, sans-serif" font-size="52" text-anchor="middle" fill="#f8fafc">${title}</text>
			<text x="600" y="700" font-family="Arial, Helvetica, sans-serif" font-size="34" text-anchor="middle" fill="#cbd5e1">${subtitle}</text>
		</svg>
	`

	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function normalizeVehiclesResponse(payload) {
	if (!Array.isArray(payload)) {
		return []
	}

	return payload.slice(0, MAX_VEHICLES).map((item, index) => {
		const make = toSafeLabel(item?.make, 'Vehicle')
		const model = toSafeLabel(item?.model, 'Model')
		const year = toNumber(item?.year, 2024)
		const mappedImage = normalizeImageUrl(getVehicleMappedImage(make, model, year))
		const generatedFallbackImage = createVehicleFallbackImage(make, model, year)
		const directImage = normalizeImageUrl(item?.image)
		const images = Array.isArray(item?.images)
			? item.images.map(normalizeImageUrl).filter(Boolean)
			: []
		const fallbackImage = generatedFallbackImage
		const image = mappedImage || directImage || images[0] || fallbackImage
		const mergedImages = [mappedImage, directImage, ...images, fallbackImage].filter(Boolean)

		return {
			id: toNumber(item?.id, index + 1),
			make,
			model,
			year,
			price: toNumber(item?.price, 30000),
			mileage: toNumber(item?.mileage, 5000),
			color: String(item?.color ?? '—').trim(),
			fuel_type: String(item?.fuel_type ?? 'Unknown').trim(),
			transmission: String(item?.transmission ?? 'Unknown').trim(),
			image,
			fallbackImage,
			images: mergedImages,
		}
	})
}

export function formatPrice(price) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(price)
}

export function getVehicleGallery(vehicle) {
	const images = Array.isArray(vehicle?.images) ? vehicle.images.filter(Boolean) : []
	const fallbackImage = typeof vehicle?.fallbackImage === 'string' ? vehicle.fallbackImage : ''

	if (images.length >= 4) {
		return images.slice(0, 4)
	}

	if (images.length > 0) {
		const fill = images[images.length - 1]
		const gallery = [...images, ...Array.from({ length: 4 - images.length }, () => fill)]
		return fallbackImage && !gallery.includes(fallbackImage)
			? [gallery[0], fallbackImage, ...gallery.slice(1, 4)]
			: gallery
	}

	if (vehicle?.image) {
		const gallery = Array.from({ length: 4 }, () => vehicle.image)
		return fallbackImage && fallbackImage !== vehicle.image
			? [vehicle.image, fallbackImage, ...gallery.slice(2)]
			: gallery
	}

	if (fallbackImage) {
		return Array.from({ length: 4 }, () => fallbackImage)
	}

	return []
}