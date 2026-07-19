import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import CategoryList from './pages/CategoryList';
import OrderList from './pages/OrderList';
import ReviewList from './pages/ReviewList';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product" element={<ProductList />} />
        <Route path="product/new" element={<ProductEdit />} />
        <Route path="product/edit/:id" element={<ProductEdit />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="order" element={<OrderList />} />
        <Route path="review" element={<ReviewList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
