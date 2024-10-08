import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NoteContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

 
function App() {
    return (

        <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>

        <div id="app">
            <NotesProvider>
                <NotesPage />
            </NotesProvider>
            
        </div>

    </Router>

        
    );
}

export default App
