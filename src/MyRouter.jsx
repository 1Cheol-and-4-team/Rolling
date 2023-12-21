import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { PaperList } from '@/pages/PaperList';
import { Detail } from '@/pages/Detail';
import { Edit } from '@/pages/Edit';
import { CreatePage } from '@/pages/CreatePage';
import { AddPaper } from '@/pages/AddPaper';
import { NotFound } from '@/pages/NotFound';
import { ROUTER_PATH } from '@/stores';

const {
  LANDING_PATH,
  LIST_PATH,
  DETAIL_PATH,
  EDIT_PATH,
  POST_PATH,
  POST_MESSAGE_PATH,
} = ROUTER_PATH;

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={LANDING_PATH} element={<HomePage />} />
        <Route path={LIST_PATH} element={<PaperList />} />
        <Route path={DETAIL_PATH} element={<Detail />} />
        <Route path={EDIT_PATH} element={<Edit />} />
        <Route path={POST_PATH} element={<CreatePage />} />
        <Route path={POST_MESSAGE_PATH} element={<AddPaper />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default MyRouter;
