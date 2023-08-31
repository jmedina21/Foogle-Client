import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Search } from './pages/Search'


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
