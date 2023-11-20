import {Routes, Route} from 'react-router-dom';
import Login from './routes/Login';

function App() {
  return (
    <Routes>
        <Route index element={<Login />} />
        <Route path='/authentication' element={<Login/>}/>
    </Routes>
);
}

export default App;
