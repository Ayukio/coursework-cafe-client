import axios from "axios";

const API_URL = "http://localhost:8082/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getDishes = () => {
    return axios.get("http://localhost:8082/api/dish")
        .then(response => JSON.stringify(response.data))
        .then(data => this.setState({orders: data.data, isLoading: false}));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    logout,
    getCurrentUser,
    getDishes
};