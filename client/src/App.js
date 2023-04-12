import Login from './components/Login';
import Customer from './components/Customer';
import Employee1 from './components/Employee1';
import {Routes,Route} from 'react-router-dom';
import Employee2 from './components/Employee2';
import './App.css';

function App() {
  return (
    
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/customer" element={<Customer/>}/>
        <Route exact path="/employee1" element={<Employee1/>}/>
        <Route exact path="/employee2" element={<Employee2/>}/>
    </Routes>
    
  );
}

export default App;
