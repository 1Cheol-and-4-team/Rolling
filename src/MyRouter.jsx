import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { StyleGuide } from '@/pages/StyleGuide';
import { AddPaper } from '@/pages/AddPaper';

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<StyleGuide />} /> */}
        <Route path='/post/:id/message' element={<AddPaper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
