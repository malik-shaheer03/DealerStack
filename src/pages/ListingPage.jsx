import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useDebounce from '../hooks/useDebounce'
import usePersistentIds from '../hooks/usePersistentIds'
import { VEHICLES_API_URL } from '../api/vehicles'
import SearchBar from '../components/listing/SearchBar'
import SortControl from '../components/listing/SortControl'
import VehicleGrid from '../components/listing/VehicleGrid'
import Pagination from '../components/listing/Pagination'
import VehicleDetailsModal from '../components/listing/VehicleDetailsModal'
import AdvancedFilters from '../components/listing/AdvancedFilters'
import PageWrapper from '../components/layout/PageWrapper'
import Badge from '../components/ui/Badge'
import styles from './ListingPage.module.css'

const ITEMS_PER_PAGE = 9
const SORT_VALUES = new Set(['', 'price_asc', 'price_desc', 'name_asc'])

function parsePage(rawValue) {
	const parsed = Number.parseInt(rawValue ?? '', 10)
	return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed
}

function normalizeSort(rawValue) {
	return SORT_VALUES.has(rawValue) ? rawValue : ''
}

function ListingPage() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
	const [sort, setSort] = useState(() => normalizeSort(searchParams.get('sort') ?? ''))
	const [currentPage, setCurrentPage] = useState(() => parsePage(searchParams.get('page')))
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [filters, setFilters] = useState(() => ({
		fuelType: searchParams.get('fuel') ?? '',
		transmission: searchParams.get('trans') ?? '',
		minPrice: searchParams.get('min') ?? '',
		maxPrice: searchParams.get('max') ?? '',
	}))
	const [selectedVehicle, setSelectedVehicle] = useState(null)
	const { ids: savedIds, toggleId: toggleSaved, isSelected: isSaved } = usePersistentIds('dealerstack-saved-ids')

	const { data, loading, error, refetch } = useFetch(VEHICLES_API_URL)
	const debouncedSearch = useDebounce(search, 400)
	const sourceVehicles = useMemo(() => (Array.isArray(data) ? data : []), [data])

	const filteredVehicles = useMemo(() => {
		const needle = debouncedSearch.trim().toLowerCase()
		const min = Number.parseFloat(filters.minPrice)
		const max = Number.parseFloat(filters.maxPrice)

		return sourceVehicles.filter((vehicle) => {
			const haystack = `${vehicle?.make ?? ''} ${vehicle?.model ?? ''}`.toLowerCase()
			const matchesSearch = !needle || haystack.includes(needle)
			const matchesFuel = !filters.fuelType || vehicle?.fuel_type === filters.fuelType
			const matchesTransmission = !filters.transmission || vehicle?.transmission === filters.transmission
			const vehiclePrice = Number(vehicle?.price ?? 0)
			const matchesMin = Number.isNaN(min) || vehiclePrice >= min
			const matchesMax = Number.isNaN(max) || vehiclePrice <= max

			return matchesSearch && matchesFuel && matchesTransmission && matchesMin && matchesMax
		})
	}, [sourceVehicles, debouncedSearch, filters])

	const fuelOptions = useMemo(() => {
		return Array.from(new Set(sourceVehicles.map((vehicle) => vehicle?.fuel_type).filter(Boolean))).sort()
	}, [sourceVehicles])

	const transmissionOptions = useMemo(() => {
		return Array.from(new Set(sourceVehicles.map((vehicle) => vehicle?.transmission).filter(Boolean))).sort()
	}, [sourceVehicles])

	const sortedVehicles = useMemo(() => {
		const list = [...filteredVehicles]

		switch (sort) {
			case 'price_asc':
				return list.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0))
			case 'price_desc':
				return list.sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0))
			case 'name_asc':
				return list.sort((a, b) => {
					const aName = `${a?.make ?? ''} ${a?.model ?? ''}`.trim()
					const bName = `${b?.make ?? ''} ${b?.model ?? ''}`.trim()
					return aName.localeCompare(bName)
				})
			default:
				return list
		}
	}, [filteredVehicles, sort])

	const totalPages = useMemo(
		() => Math.ceil(sortedVehicles.length / ITEMS_PER_PAGE),
		[sortedVehicles.length],
	)

	const activePage = useMemo(() => {
		if (totalPages === 0) {
			return 1
		}

		return Math.min(currentPage, totalPages)
	}, [currentPage, totalPages])

	const paginatedVehicles = useMemo(() => {
		const startIndex = (activePage - 1) * ITEMS_PER_PAGE
		const endIndex = activePage * ITEMS_PER_PAGE
		return sortedVehicles.slice(startIndex, endIndex)
	}, [sortedVehicles, activePage])

	useEffect(() => {
		const params = new URLSearchParams()

		if (search.trim()) {
			params.set('q', search.trim())
		}

		if (sort) {
			params.set('sort', sort)
		}

		if (activePage > 1) {
			params.set('page', String(activePage))
		}

		if (filters.fuelType) {
			params.set('fuel', filters.fuelType)
		}

		if (filters.transmission) {
			params.set('trans', filters.transmission)
		}

		if (filters.minPrice) {
			params.set('min', filters.minPrice)
		}

		if (filters.maxPrice) {
			params.set('max', filters.maxPrice)
		}

		if (params.toString() !== searchParams.toString()) {
			setSearchParams(params, { replace: true })
		}
	}, [search, sort, activePage, filters, setSearchParams, searchParams])

	const handleSearchChange = (value) => {
		setSearch(value)
		setCurrentPage(1)
	}

	const handleSortChange = (value) => {
		setSort(value)
		setCurrentPage(1)
	}

	const handleClearFilters = () => {
		setSearch('')
		setSort('')
		setFilters({ fuelType: '', transmission: '', minPrice: '', maxPrice: '' })
		setCurrentPage(1)
	}

	const handleFilterChange = (field, value) => {
		setFilters((prev) => ({ ...prev, [field]: value }))
		setCurrentPage(1)
	}

	const handleFilterReset = () => {
		setFilters({ fuelType: '', transmission: '', minPrice: '', maxPrice: '' })
		setCurrentPage(1)
	}

	const handlePageChange = (page) => {
		const safeMax = Math.max(totalPages, 1)
		const nextPage = Math.min(Math.max(page, 1), safeMax)
		setCurrentPage(nextPage)
	}

	return (
		<PageWrapper
			title="Vehicle Inventory"
			subtitle={`${sortedVehicles.length} vehicles available`}
		>
			<div className={`${styles.controlsRow} listing-controls`}>
				<div className={`${styles.searchSlot} listing-search`}>
					<SearchBar value={search} onChange={handleSearchChange} />
				</div>
				<div className={`${styles.sortSlot} listing-sort`}>
					<Badge variant="default">{`${sortedVehicles.length} results`}</Badge>
					<SortControl value={sort} onChange={handleSortChange} />
					<button
						type="button"
						className={styles.filterButton}
						onClick={() => setFiltersOpen((prev) => !prev)}
						aria-expanded={filtersOpen}
						aria-controls="advanced-filters-panel"
					>
						Filters
					</button>
					<Link to="/saved" className={styles.savedLink}>
						Saved ({savedIds.length})
					</Link>
				</div>
			</div>

			<VehicleGrid
				vehicles={paginatedVehicles}
				loading={loading}
				error={error}
				onRetry={refetch}
				onSelectVehicle={setSelectedVehicle}
				onClearFilters={handleClearFilters}
				savedLookup={isSaved}
				onToggleSaved={toggleSaved}
			/>

			<Pagination
				currentPage={activePage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>

			{selectedVehicle ? (
				<VehicleDetailsModal
					key={selectedVehicle.id}
					vehicle={selectedVehicle}
					onClose={() => setSelectedVehicle(null)}
				/>
			) : null}

			<AdvancedFilters
				open={filtersOpen}
				onClose={() => setFiltersOpen(false)}
				filters={filters}
				onChange={handleFilterChange}
				onReset={handleFilterReset}
				fuelOptions={fuelOptions}
				transmissionOptions={transmissionOptions}
			/>
		</PageWrapper>
	)
}

export default ListingPage