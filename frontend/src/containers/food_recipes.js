import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


import { Link, useNavigate } from "react-router-dom";

import { recipesService, addrecipeService } from "../services";

const FoodRecipes = () => {

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    recipesService().then(res => {
      console.log(res._recipes)
      setRecipes(res._recipes);
      setTempData(res._recipes);
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };


  const addRecipeRedirect = () => {
    navigate('/add-recipe');
  };


  return (<div className='content' >
    <div className="block-back">
      <img className="img-back" src="assets/images/2.jpg" alt="log img" />
    </div>

    <div className='content' style={{ overflow: 'auto', zIndex: '100', position: 'relative', background: '#fbfff078' }}>
      <div>
        <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>SEARCH & ADD RECIPES HERE !!</h3>
      </div>
      <div className='p-1 mt-3 d-flex justify-content-between '>
        <div>
          <Button variant="primary" onClick={addRecipeRedirect}>
            Add Recipe
          </Button>
        </div>
        <Form.Group className="mb-3" style={{ width: "350px" }} >
          <input className='form-control'
            type="text"
            value={recipe}
            onChange={(event) => {
              setRecipe(event.target.value)
              console.log(recipes.filter(item =>
                item.name?.toLowerCase().indexOf(event.target.value?.toLowerCase()) > -1
              ))
              setTempData(recipes.filter(item =>
                item.name?.toLowerCase()
                  .indexOf(event.target.value?.toLowerCase()) > -1
              ))
            }}
            placeholder="Enter Recipe"
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="button" onClick={logout} >
            Logout
          </Button>
        </div>
      </div>
      <div>
        <h4 style={{ marginLeft: '15px', fontWeight: 'bold' }}>RECIPES</h4>
        <div className='row p-0 m-0'>

          {
            tempData &&
            tempData.length > 0 &&
            Object.keys(tempData).map(item =>
              <div className='col-4 p-1 d-flex justify-content-center'>
                <div className="card" style={{ width: '18rem' }}>
                  <img className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} src={tempData[item].imageURL} alt={tempData[item].name} />
                  <div className="card-body">
                    <h5 className="card-title item-line">{tempData[item].name}</h5>
                    <Link to={`/details/${tempData[item]._id}`} >Checkout</Link>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  </div>
  )
}
export default FoodRecipes;