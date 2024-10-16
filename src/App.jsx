import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NoteContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PrivateRoutes from "./utils/PrivateRouts";
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

          <Route element={<PrivateRoutes/>}>
          <Route path="/" element={
             <NotesProvider>
                <NotesPage></NotesPage>
            </NotesProvider>}/>
          <Route path="/profile" element={<Profile/>}/>
          </Route>

        </Routes>

      {/* <div id="app">
            <NotesProvider>
                <NotesPage />
            </NotesProvider>
            
        </div>*/}

    </Router>
    

        
    );
}

export default App
