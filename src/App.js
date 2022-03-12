import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' exact component={About} />
      </Switch>
    </div>
  );
}

export default App;
