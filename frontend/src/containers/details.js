import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { recipeService } from "../services";

const Details = () => {

  const navigate = useNavigate();

  const params = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // console.log(match.params.recipeId)
    // console.log(params)
    recipeService(params.recipeId)
      .then(res => {
        console.log(res._details)
        setRecipe(res._details)
      })
  }, [])

  return (<div className='content' style={{ backgroundColor: 'lavender' }} >
    <div className='content' style={{ overflow: 'auto' }} >
      <div className='row m-0 p-0 d-flex justify-content-center'>
        <div className='col-9' style={{
          padding: '24px',
          borderRadius: '8px',
          backgroundColor: '#f0ffff78'
        }}>
          {recipe && <div>
            <div className="card mb-3" style={{ border: 'none' }}>
              <img className="card-img-top" style={{ height: "420px" }} src={recipe.imageURL} alt={recipe.name} />
              <div className="card-body">
                <h4>RECIPE NAME :</h4>
                <p className="card-title">{recipe.name}</p>
                <h4>CATEGORY :</h4>
                <p className="card-text">{recipe.category}</p>
                <h4>INGREDIENTS :</h4>
                <p className="card-text">{recipe.ingredients && Object.keys(recipe.ingredients).map(item => <div>
                  <h6 className='mt-3 mb-0'>Ingredients {+item + 1}:</h6>
                  <div>Name: {recipe.ingredients[item].name}</div>
                  <div>Type: {recipe.ingredients[item].type}</div>
                  <div>Quantity: {recipe.ingredients[item].quantity}</div>
                </div>)}</p>
                <h4>STEPS :</h4>
                <p className="card-text">{recipe.steps && Object.keys(recipe.steps).map(item => <div>
                  <h6 className='mt-3 mb-0'>Step {++item}:</h6>
                  <div>{recipe.steps[item]}</div>
                </div>)}</p>
                <a href={recipe.description} className="btn btn-primary">Checkout</a>
                &nbsp;&nbsp;
                <Button variant="primary" type="button" onClick={() => {
                  navigate('/food-recipes');
                }}>
                  Back
                </Button>
              </div>
            </div>
          </div>}

        </div>
      </div>

    </div>
  </div>)

}

export default Details;