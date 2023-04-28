import './App.css'
import Carousel from './components/carousel';
import Navbar from "./components/navbar";
import Home from "./pages/home";

function App() {

  return (
    <div>
      <Navbar />
      <Carousel />
      <Home />
    </div>
  );
}

export default App
