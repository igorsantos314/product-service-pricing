import './App.css';
import CalculatePrice from './components/CalculatePrice';

function App() {
  return (
    <div>
      <CalculatePrice />
      <footer className="w-full bg-gray-800 text-white text-center py-4">
        <p>Developed by <a href="https://www.linkedin.com/in/igor-santos-8383941a6/" className="text-blue-400 hover:underline">Igor Santos</a></p>
        <p>Open Source Project - Helping others price products and services!</p>
      </footer>
    </div>
  );
}

export default App;
