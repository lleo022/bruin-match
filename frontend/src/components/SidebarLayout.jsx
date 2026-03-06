import Sidebar from './Sidebar';
import './SidebarLayout.css';

function SidebarLayout({ children }) {
  return (
    <div className="sidebar-layout">
      <Sidebar />
      <main className="sidebar-content">{children}</main>
    </div>
  );
}

export default SidebarLayout;
