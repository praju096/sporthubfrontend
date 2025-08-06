import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUserRole,
  deleteUser,
} from "../../redux/features/users/userSlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../../store";

const ManageUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (id: number, role: string) => {
    dispatch(updateUserRole({ id, role }));
    toast.success("Role updated successfully");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      toast.warn("Record deleted successfully");
    }
  };

  if (loading) return <div className="d-flex justify-content-center my-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <p className="alert alert-danger mt-3">{error}</p>;

  return (
    <div className="card shadow rounded-4 p-3 p-md-4">
      <h3 className="mb-3 mb-md-4">
        <i className="fas fa-user text-danger me-2"></i>Manage Users
      </h3>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="fas fa-trash-alt me-1 d-none d-md-inline"></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;