import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Title from './components/Title';
import './components/style.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Title />
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;