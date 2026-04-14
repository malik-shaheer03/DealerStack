import { useCallback, useEffect, useState } from 'react'
import {
	normalizeVehiclesResponse,
	VEHICLES_API_URL,
} from '../api/vehicles'

function getErrorMessage(error) {
	return error instanceof Error ? error.message : 'Something went wrong'
}

function useFetch(url) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchData = useCallback(async () => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`)
			}

			const json = await response.json()

			if (url === VEHICLES_API_URL) {
				setData(normalizeVehiclesResponse(json))
			} else {
				setData(json)
			}
		} catch (err) {
			setError(getErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}, [url])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return {
		data,
		loading,
		error,
		refetch: fetchData,
	}
}

export default useFetch