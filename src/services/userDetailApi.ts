import { userDetail } from "../types/userDetailTypes";
import API from "./axios";

const getUser = async (): Promise<userDetail[]> => {
    const res = await API.get("/api/userdetail");
    return res.data.data;
};

const addUser = async (data: userDetail): Promise<userDetail> => {
    const res = await API.post("/api/userdetail", data);
    return res.data.data;
};

const userDetailApi = {
    getUserDetail: getUser,
    addUserDetail: addUser,
}
export default userDetailApi;