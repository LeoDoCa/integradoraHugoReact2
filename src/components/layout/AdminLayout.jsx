import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { IoDocumentSharp, IoDocumentsSharp } from "react-icons/io5";
import Logo from "../../assets/google-docs.png";
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "SIGNOUT" });
    navigate("/", {replace: true});
  };
  return (
    <>
      <header>
        <Navbar fluid rounded style={{ backgroundColor: "paleturquoise" }}>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Integradora Hugo
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://yt3.googleusercontent.com/D3BETNiOFmWFtmTQH5L-Y_rBSlb74iUcYzGePBapnR3Uo6HNxhOatMFA7NOvdkwztcUj4jzpyPA=s900-c-k-c0x00ffffff-no-rj"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">LeoDoCa</span>
                <span className="block truncate text-sm font-medium">
                  leodorcas12@gmail.com
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className="flex h-screen">
        <aside>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <li>
                  <Link
                    to={"upload"}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <IoDocumentSharp className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Subir archivo
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"docs"}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <IoDocumentsSharp className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Ver archivos
                    </span>
                  </Link>
                </li>
                
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable} onClick={handleLogout}>
                  Sign Out
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>
        <section className="w-full">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;
