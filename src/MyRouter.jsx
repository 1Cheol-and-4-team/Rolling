import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '@/pages/Landing';
import { Detail } from '@/pages/Detail';
import { Edit } from '@/pages/Edit';
import { NotFound } from '@/pages/NotFound';
import { ROUTER_PATH } from '@/stores';

const { LANDING_PATH, DETAIL_PATH, EDIT_PATH } = ROUTER_PATH;

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={LANDING_PATH} element={<Landing />} />
        <Route path={DETAIL_PATH} element={<Detail />} />
        <Route path={EDIT_PATH} element={<Edit />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MyRouter;
