import React from 'react'
import {Link} from 'react-router-dom'
const AdminPanel = () => {
    return (
        <div className='class-2'>
            <h4>Admin Panel</h4>
            <ul className="list-group" >
                <Link to="/dashboard/admin/create-category" className="list-group-item class-1">Create Category</Link>
                <Link to="/dashboard/admin/create-product" className="list-group-item class-1">Create Product</Link>
                <Link to="/dashboard/admin/users" className="list-group-item class-1">Users</Link>
                <Link to="/dashboard/admin/products" className="list-group-item class-1">Products</Link>
            </ul>

        </div>
    )
}

export default AdminPanel