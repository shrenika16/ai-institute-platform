import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="space-y-5">

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <Users size={20} />
          Users
        </Link>

        <Link
          to="/admin/courses"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <BookOpen size={20} />
          Courses
        </Link>

        <Link
          to="/admin/analytics"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

        <Link
          to="/admin/notifications"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <Bell size={20} />
          Notifications
        </Link>

      </nav>

    </div>
  );
}

export default AdminSidebar;