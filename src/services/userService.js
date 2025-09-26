import { userIndexApi } from "../api/user";

export const fetchAllUsers = async() => {
    return await userIndexApi();
};