import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import POS from "./components/POS";
import NavigationBar from "./components/widgets/NavigationBar";
import WelcomeModal from "./components/modals/WelcomeModal";
import Footer from "./components/widgets/Footer";
import Products from "./components/Products";
import SalesList from "./components/SalesList";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import ExpenseControl from "./components/ExpenseControl";

function App() {
  return (
    <Router>
      <WelcomeModal />

      <NavigationBar />

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sale-easy" element={<Home />} />
          <Route path="/sale-easy/pos" element={<POS />} />
          <Route path="/sale-easy/products" element={<Products />} />
          <Route path="/sale-easy/sales" element={<SalesList />} />
          <Route path="/sale-easy/expenses" element={<ExpenseControl />} />
          <Route path="/sale-easy/reports" element={<Reports />} />
          <Route path="/sale-easy/settings" element={<Settings />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
