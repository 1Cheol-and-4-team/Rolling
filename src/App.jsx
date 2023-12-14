import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaperList from '@/pages/PaperList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/list' element={<PaperList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
