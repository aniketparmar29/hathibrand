import React from 'react'
import UsersList from './UsersList'
import SideBar from './components/Sidebar'
function Users() {
  window.document.title="Admin-Users"
  return (
    <div>
        <div>
         <SideBar title="Users" />
        </div>
        <UsersList/>
    </div>
  )
}

export default Users