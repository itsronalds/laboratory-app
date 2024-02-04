import { Route } from 'react-router-dom';
import AdminDashboard from './../routes/admin/Dashboard/Dashboard';

const Admin = () => (
  <Route path="/admin/dashboard">
    <AdminDashboard />
  </Route>
);

export default Admin;
