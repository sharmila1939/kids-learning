import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Parentsidebar() {
  return (
    <div className="mt-20">
      {/* Sidebar */}
      <div className="bg-[#071645] w-52 h-screen fixed top-20 left-0 shadow-lg">
        {/* Profile */}
        <div className="flex flex-col items-center mt-8 mb-6">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
            alt="profile_img"
            className="w-16 h-16 rounded-full"
          />
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-1">
          <NavLink
            to="/ParentHome"
            className={({ isActive }) =>
              isActive
                ? 'bg-white py-3 text-center font-semibold text-[#4E84C1]'
                : 'py-3 text-center font-semibold text-[#4E84C1] hover:bg-white hover:text-[#4E84C1]'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/StudentProgress"
            className={({ isActive }) =>
              isActive
                ? 'bg-white py-3 text-center font-semibold text-[#4E84C1]'
                : 'py-3 text-center font-semibold text-[#4E84C1] hover:bg-white hover:text-[#4E84C1]'
            }
          >
            My Child Progress
          </NavLink>

          <NavLink
            to="/chatAppParent"
            className={({ isActive }) =>
              isActive
                ? 'bg-white py-3 text-center font-semibold text-[#4E84C1]'
                : 'py-3 text-center font-semibold text-[#4E84C1] hover:bg-white hover:text-[#4E84C1]'
            }
          >
            Parent to Teacher Chat
          </NavLink>
        </div>
      </div>
    </div>
  );
}
