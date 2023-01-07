import axios from "axios";
const BASE_URI = "http://localhost:8081";

export const recipesService = async () => {
    try {
        const res = await axios.get(`${BASE_URI}/recipes`);
        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const recipeService = async (recipeId) => {
    try {
        const res = await axios.get(`${BASE_URI}/recipes/${recipeId}`);
        // console.log(res);s
        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        console.log(error)
    }
}


export const addrecipeService = async (recipe) => {
    try {
        const res = await axios.post(`${BASE_URI}/recipes/`, recipe);
        // console.log(res);s
        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        console.log(error)
    }
}
