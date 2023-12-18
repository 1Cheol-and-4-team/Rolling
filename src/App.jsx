import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PaperList } from '@/pages/PaperList';
import { MyRouter } from '@/MyRouter';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/list' element={<PaperList />} />
        <Route path='/guide' element={<MyRouter />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
