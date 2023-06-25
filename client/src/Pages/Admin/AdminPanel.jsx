import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <div className="sticky top-0 inset-x-0 z-20 border-y px-4 sm:px-6 md:px-8 lg:hidden">
        <div className="flex items-center py-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="w-5 h-5"
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
          </button>
          <ol className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
            <li className="flex items-center text-sm text-gray-800">
              {/* Breadcrumb Item */}
            </li>
            <li className="text-sm font-semibold text-gray-800 truncate" aria-current="page">
              <Link to={`/dashboard/admin`}>Dashboard</Link>
            </li>
          </ol>
        </div>
      </div>
      <div id="application-sidebar" className="bg-blue-800 text-base font-bold hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y">
        <div className="px-6">
          <Link className="flex-none text-xl font-semibold text-white" to="/" aria-label="Brand">
            Ecommerce
          </Link>
        </div>
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap text-white" data-hs-accordion-always-open>
          <ul className="space-y-1.5">
            <li>
              <Link to="/dashboard/admin/create-category" className="list-group-item py-2">
                Create Category
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/create-product" className="list-group-item py-2">
                Create Product
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/users" className="list-group-item py-2">
                Users
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/admin-orders" className="list-group-item py-2">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/products" className="list-group-item py-2">
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminPanel;
