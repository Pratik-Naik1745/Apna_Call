//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Langdingpage from './pages/landing'
import VideoComponet from './pages/VideoMeet'
import Homecomponets from './pages/home'
import Auth from './pages/authecation'
import { AuthProvider } from './contexts/AuthContext';
import History from "./pages/history"

function App() {
  return (
    <>
    <Router>
    <AuthProvider>
    <Routes>
     <Route path='/' element={< Langdingpage/>} />
      <Route path='/auth' element={< Auth/>} />
      <Route path='/home' element={< Homecomponets/>} />
       <Route path='/history' element={< History/>} />
      <Route path='/:url' element={< VideoComponet/>} />
    </Routes>
    </AuthProvider>
    </Router>
    </>
  );
}

export default App;

// first page 1. landing page 
// second page 2.sign up sign in page
// third page 3.meeting id is generate 
// fourth page 4. username and join camera on this page


