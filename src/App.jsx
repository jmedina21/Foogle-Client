import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Search } from './pages/Search/Search'
import { Signup } from './pages/Signup/Signup'


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="search/:item" element={<Search />} />
                <Route path="favorites/" element={<h1>Your Favs</h1>} />
                <Route path="signin/" element={<Signup />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
