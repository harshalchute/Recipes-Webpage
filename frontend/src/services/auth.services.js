import axios from "axios";

const BASE_URI = "http://localhost:8081";

export const testConnection = () => {
    try {
        const res = axios.get(`${BASE_URI}/test-connection`)
        // console.log(res)
        res.then((_res) => {
            console.log(_res.data);
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginService = async (data) => {
    try {
        const res = await axios.post(`${BASE_URI}/login`, data);
        if (res.data.success) {
            console.log(res.data)
            alert(res.data.message);
            localStorage.setItem('user', JSON.stringify(res.data._details))
            return res.data;
        }
    } catch (error) {
        // console.log(error)
        // console.log(error.response.data.message)
        alert(error.response.data.message)
    }
}


export const registerService = async (data) => {
    try {
        const res = await axios.post(`${BASE_URI}/register`, data);
        // console.log(res)
        if (res.data.success) {
            // console.log(res.data)
            alert(res.data.message);
            localStorage.setItem('user', JSON.stringify(res.data._details))
            return res.data;
        }
    } catch (error) {
        alert(error.response.data.message)
    }
}

