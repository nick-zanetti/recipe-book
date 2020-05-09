const recipeTitleField = document.querySelector('#edit-title')
const recipeInstructionsField = document.querySelector('#edit-instructions')
const deleteButton = document.querySelector('#delete-button')
const addIngredientText = document.querySelector('#add-ingredient-text')
const addIngredientForm = document.querySelector('#add-ingredient')


const recipeId = location.hash.substring(1) //recipeId = c1c3ce69-fd0a-4ef3-8412-e6b6f454d882
const recipes = getSavedRecipes()
const recipe = recipes.find((recipe) => {
  return recipe.id === recipeId
})

if (recipe === undefined) {
  location.assign('index.html')
}

 //This makes your previous text stay in the field
recipeTitleField.value = recipe.title
recipeInstructionsField.value = recipe.instructions


recipeTitleField.addEventListener('input', (e) => {
  recipe.title = e.target.value
  saveRecipes(recipes)
})

recipeInstructionsField.addEventListener('input', (e) => {
  recipe.instructions = e.target.value
  saveRecipes(recipes)
})

//Delete the recipe
deleteButton.addEventListener('click', (e) => {
  removeRecipe(recipe.id)
  saveRecipes(recipes)
  location.assign('index.html')
})

/////////////////INGREDIENTS FUNCTIONS/////////

//Add a new ingredient to local storage
const addIngredient = (ingredients) => { ///We have access to individual ingredient id INSIDE of this
  const id = uuidv4()
  ingredients.push({
    id: id,
    text: addIngredientText.value,
    haveStatus: false
  })
  saveRecipes(recipes)
  
}

//Remove an ingredient from the list 
const removeIngredient = (id) => {
  const ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
    return ingredient.id === id
  })
  if (ingredientIndex > -1) {
    recipe.ingredients.splice(ingredientIndex, 1)
  }
}

//Toggle ingredient have status
const toggleIngredient = (id) => {
  const ingredient = recipe.ingredients.find((ingredient) => {
    return ingredient.id === id
  })
  if (ingredient !== undefined) {
    ingredient.haveStatus = !ingredient.haveStatus
  }
}

//Set up DOM elements for ingredients
const generateIngredientDOM = (ingredient) => {
  const checkbox = document.createElement('input')
  const ingredientEl = document.createElement('div')
  const ingredientTextEl = document.createElement('span')
  const button = document.createElement('button')

  //Setup ingredient checkbox
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = ingredient.haveStatus
  
  ingredientEl.appendChild(checkbox)
  //need to add checkbox listener
  checkbox.addEventListener('change', () => {
    toggleIngredient(ingredient.id)
    saveRecipes(recipes)
    renderIngredients(recipe.ingredients)
  })

  //Setup the ingredient text
  if (ingredient.text.length > 0) {
    ingredientTextEl.textContent = ingredient.text
  } else {
    ingredientTextEl.textContent = 'Unnamed Ingredient'
  }

  ingredientEl.appendChild(ingredientTextEl)

  //Setup the remove button
  button.textContent = 'x'
  button.classList.add('remove-ingredient-button')
  ingredientEl.appendChild(button)
  button.addEventListener('click', () => {
    removeIngredient(ingredient.id) //Need to create
    saveRecipes(recipes)
    renderIngredients(recipe.ingredients) //Need to create - NOTE: WHENEVER THE FUNCTIONS ARE CALLED YOU USE RECIPE.INGREDIENTS NOT JUST INGREDIENTS
  })

  return ingredientEl

}






//Render Ingredients to screen
const renderIngredients = (ingredients) => {
  document.querySelector('#ingredients').innerHTML = ''
  ingredients.forEach((ingredient) => {
    const ingredientEl = generateIngredientDOM(ingredient)
    ingredientEl.classList.add('individual-ingredient')
    document.querySelector('#ingredients').appendChild(ingredientEl)
  })
}

renderIngredients(recipe.ingredients)

addIngredientForm.addEventListener('submit', (e) => {
  addIngredient(recipe.ingredients)
  saveRecipes(recipes),
  renderIngredients(recipe.ingredients)
  addIngredientText.value = ''
})