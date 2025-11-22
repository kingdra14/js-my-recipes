const express = require('express')
const router = express.Router()

const recipes = require('../../../data/recipes.json')

const data = recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    prepTime: recipe.prepTime,
    difficulty: recipe.difficulty
}))



const getNextId = (items) => {
  const ids = items
    .map(r => Number(r.id))
    .filter(Number.isFinite);
  return ids.length ? Math.max(...ids) + 1 : 1
}



// GET /api/v1/recipes - Retrieve all recipes
router.get('/', (request, response) => {
    response.json(data)
})

// Post /api/v1/recipes 
router.post('/recipe/add', (request, response) => {
    const {id,title,image,description,ingredients,instructions,prepTime,difficulty} = request.body;
    const found = recipes.find(recipe => recipe.id === id);
    if(found) response.send({message: 'Recipe with this ID already exists'});
    else {
        const newId = getNextId(recipes);
        const newRecipe = {id:newId,title,image,description,ingredients,instructions,prepTime,difficulty};
        recipes.push(newRecipe);
        response.send({message: 'Recipe added successfully', recipe: newRecipe});
    }
   
})

// GET /api/v1/recipes/:id 
router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(r => r.id === parseInt(id))
    if (found) response.send(found)
    else response.send({ message: `Recipe with this ID ${id} not found` })
})

module.exports = router