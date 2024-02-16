import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import LandingView from './components/LandingView/LandingView';
import Footer from './components/Footer/Footer';
import WorkPlace from './components/WorkPlace/WorkPlace';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path='/' element={<LandingView/>}/>
          <Route path='/WorkPlace/:id/:PONumber/:PN' element={<WorkPlace/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
