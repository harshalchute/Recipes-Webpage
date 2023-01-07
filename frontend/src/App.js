import { React, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from "./containers/login";
import FoodRecipes from './containers/food_recipes';
import AddRecipe from './containers/add_recipe';
import Details from "./containers/details";
import Register from './containers/signup';

import { testConnection } from "./services";

const App = () => {

  useEffect(() => {
    // testConnection();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/food-recipes' element={<FoodRecipes />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/details/:recipeId' element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
