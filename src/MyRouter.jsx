import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePage from '@/pages/CreatePage';

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/post'} element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
