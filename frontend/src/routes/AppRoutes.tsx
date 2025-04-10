import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from '../pages/JobList';
import JobDetail from '../pages/JobDetail';
import JobForm from '../pages/JobForm';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/jobs/new" element={<JobForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;