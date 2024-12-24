import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product-service-pricing" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
