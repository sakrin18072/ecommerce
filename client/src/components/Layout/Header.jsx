import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthorizationContext";
import toast from "react-hot-toast";
import SearchInput from "../SearchInput";
import { useCart } from "../../Contexts/CartContext";
const Header = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  };
  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap bg-blue-800 z-50 w-full text-sm relative ">
        <nav
          className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between "
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl font-semibold text-white"
              to="/"
            >
              Ecommerce
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-blue-800 text-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-collapse="#navbar-with-mega-menu"
                aria-controls="navbar-with-mega-menu"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden w-4 h-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden w-4 h-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-with-mega-menu"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5  sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <div className="font-medium m-auto">
                <SearchInput />
              </div>
              <Link
                className="font-medium text-blue-200"
                to="/"
                aria-current="page"
              >
                Home
              </Link>
              

              {!auth.user ? (
                <>
                  <NavLink
                    to="/register"
                    className="font-medium text-blue-200"
                    aria-current="page"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="font-medium text-blue-200"
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                  
                </>
              ) : (
                <>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="font-medium text-blue-200"
                    aria-current="page"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="font-medium text-blue-200"
                    aria-current="page"
                  >
                    Logout
                  </NavLink>
                  
                </>
              )}
              <NavLink
                    to="/cart"
                    className="font-medium text-blue-200"
                    aria-current="page"
                  >
                    Cart ({cart?.length})
                  </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;