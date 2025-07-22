import API from "./axios";

const getAllUser = async () => {
    const res = await API.get(`/api/users`);
    return res.data;
};

const updateUser = async (id: number, role: string) => {
    const res = await API.patch(`/api/users/${id}/role`, { role });
    return res.data;
};

const deleteUser = async (id: number) => {
    const res = await API.delete(`/api/users/${id}`);
    return res.data;
};

const userApi = {
    fetchUsers: getAllUser,
    updateUserRole: updateUser,
    deleteUser: deleteUser,
}
export default userApi;