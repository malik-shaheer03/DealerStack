import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ListingPage from './pages/ListingPage'
import FormPage from './pages/FormPage'
import SavedPage from './pages/SavedPage'

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<ListingPage />} />
				<Route path="/saved" element={<SavedPage />} />
				<Route path="/form" element={<FormPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
