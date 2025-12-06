import { useEffect, type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './config/supabase';
import { useAuthStore } from './stores/useAuthStore';
import { Loader2 } from 'lucide-react';
import Background from './components/layout/Background';

// Import các trang (Pages)
import LandingPage from './pages/LandingPage';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

// --- CÁC COMPONENT BẢO VỆ ROUTE (Route Guards) ---

// 1. ProtectedRoute: Chỉ cho phép User đã đăng nhập vào
// Ví dụ: Trang Dashboard, Trang học bài
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuthStore();

  // Khi đang kiểm tra xem user là ai, hiện màn hình loading
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Nếu không có user -> Đá về trang Login
  if (!user) return <Navigate to="/" replace />;

  return children;
};

// 2. PublicRoute: Chỉ cho phép User CHƯA đăng nhập vào
// Ví dụ: Trang Login, Register (Đã login rồi thì không cần vào đây nữa)
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return null; // Hoặc loading spinner nhỏ

  // Nếu đã có user -> Đá thẳng vào Dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

// --- TRANG DASHBOARD TẠM THỜI (Placeholder) ---
const Dashboard = () => {
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 Chào mừng quay trở lại, {user?.email}!
        </h1>
        <p className="text-gray-600 mb-6">
          Đây là khu vực Dashboard (sẽ phát triển sau). Bạn đã đăng nhập thành công.
        </p>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
          <h3 className="font-semibold text-indigo-700">Thông tin User từ Supabase:</h3>
          <pre className="text-xs text-gray-600 mt-2 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

// --- APP CHÍNH ---

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // 1. Kiểm tra session ngay khi F5 trang
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Lắng nghe sự thay đổi trạng thái (Đăng nhập, Đăng xuất)
    // AuthStateChange: 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED'...
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Dọn dẹp listener khi tắt app
    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Background />
      <Routes>
        {/* Route Công khai: Ai cũng xem được */}
        <Route path="/" element={<LandingPage />} />

        {/* Route Auth: Đã login thì không vào được nữa */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Route Bảo vệ: Phải login mới xem được */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Route 404: Nếu nhập linh tinh thì về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;