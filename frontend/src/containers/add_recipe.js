import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useNavigate } from "react-router-dom";

import { recipesService, addrecipeService } from "../services";

const AddRecipe = () => {

    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const [recipeForm, setRecipeForm] = useState({
        name: '',
        category: '',
        description: '',
        step: '',
        ingredients: [{
            quantity: '',
            name: '',
            type: ''
        }],
        imageURL: '',
    });


    const [steps, setSteps] = useState([]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipeForm((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSteps([...steps, recipeForm.step]);
            setRecipeForm((prevProps) => ({
                ...prevProps,
                ['step']: ''
            }));
        }
    }

    const handleSubmitRecipe = (event) => {
        event.preventDefault();
        console.log(recipeForm);
        if (recipeForm.name !== '' &&
            recipeForm.category !== '' &&
            recipeForm.description !== '' &&
            recipeForm.imageURL !== '' &&
            steps.length > 1
        ) {
            console.log(steps);
            const recipeData = {
                name: recipeForm.name,
                category: recipeForm.category,
                description: recipeForm.description,
                steps: steps,
                ingredients: recipeForm.ingredients,
                imageURL: recipeForm.imageURL,
            }
            addrecipeService(recipeData).then(res => {
                console.log(res)
                navigate('/food-recipes')
            })
        }
    };

    const addInputIngredients = event => {
        event.preventDefault();
        setRecipeForm({
            ...recipeForm,
            ingredients: [
                ...recipeForm.ingredients,
                {
                    quantity: '',
                    name: '',
                    type: ''
                }
            ]
        })
    }


    const handleIngredientInputChange = (event) => {
        const { id, name, value } = event.target;
        let ingredients = [...recipeForm.ingredients];
        ingredients[id][name] = value;
        setRecipeForm((prevProps) => ({
            ...prevProps,
            ingredients
        }));
    };

    const handleSubmit = () => {
        console.log(recipeForm);
    }

    const removeIngredient = (index) => {
        recipeForm.ingredients.splice(index, 1);
        setRecipeForm((prevProps) => ({
            ...prevProps
        }));
    }



    return (<div className='content' >
        <div className="block-back">
            <img className="img-back" src="assets/images/2.jpg" alt="log img" />
        </div>

        <div className='content' style={{ overflow: 'auto', zIndex: '100', position: 'relative', background: '#fbfff078' }}>
            <div className='my-4'>
                <Button variant="primary" type="button" onClick={() => {
                    navigate('/food-recipes');
                }}>
                    Back
                </Button>
                <h3 className='my-4 text-center'>Add New Recipe</h3>
                <div className='row m-0 p-0 d-flex justify-content-center'>
                    <div className='col-9' style={{
                        padding: '24px',
                        borderRadius: '8px',
                        backgroundColor: '#f0ffff78'
                    }}>
                        <Form >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Recipe name</Form.Label>
                                <Form.Control type="text" placeholder="Enter recipe name" name="name"
                                    value={recipeForm.name}
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" placeholder="Enter recipe category" name="category"
                                    value={recipeForm.category}
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <hr />
                            <div className='d-flex'>
                                <Form.Label>Ingredients</Form.Label>
                                &nbsp;&nbsp;
                                <Button variant="primary" className='btn-sm' type="button" onClick={addInputIngredients}>
                                    <i className="fa fa-plus"></i>
                                </Button>
                            </div>

                            {recipeForm.ingredients && recipeForm.ingredients.map((ingredient, index) => <div key={index}>

                                <div className='row m-0 p-0'>
                                    <div className='col-5 p-1'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Name</Form.Label>
                                            <input type="text" className='form-control' id={index}
                                                placeholder='Ingredient Name'
                                                name='name'
                                                value={ingredient.name}
                                                onChange={handleIngredientInputChange}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-4 p-1'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Quantity</Form.Label>
                                            <input type="text" className='form-control' id={index}
                                                placeholder='Quantity'
                                                name='quantity'
                                                value={ingredient.quantity}
                                                onChange={handleIngredientInputChange}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-2 p-1'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Type</Form.Label>
                                            <input type="text" className='form-control' id={index}
                                                placeholder='Type'
                                                name='type'
                                                value={ingredient.type}
                                                onChange={handleIngredientInputChange}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-1 p-1 d-flex align-items-center'>
                                        {index && index > 0 ? <div>
                                            <Button variant="primary" className='btn-sm' type="button" onClick={() => removeIngredient(index)}>
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </div> : ''}
                                    </div>
                                </div>
                            </div>)
                            }
                            <hr />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Steps</Form.Label>
                                <Form.Control type="text" placeholder="Enter recipe steps" name="step"
                                    value={recipeForm.step}
                                    onChange={handleInputChange}
                                    onKeyDown={_handleKeyDown}
                                />
                                <Form.Text className="text-warning">
                                    Press Enter After Every Step !!
                                </Form.Text>
                            </Form.Group>

                            <ul>
                                {steps && steps.map((item, index) => <li key={index}>Step {index + 1}: {item}</li>)}
                            </ul>
                            <hr />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter recipe description" name="description"
                                    value={recipeForm.description}
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control type="text" placeholder="Enter recipe image url" name="imageURL"
                                    value={recipeForm.imageURL}
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <hr />
                            <Button variant="primary" type="button" onClick={handleSubmitRecipe}>
                                Submit
                            </Button>
                        </Form>

                    </div>
                </div>

            </div>
        </div>
    </div>)
}

export default AddRecipe;
