import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginScreen/>}/>
            <Route path='/home' element={<HomePage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
