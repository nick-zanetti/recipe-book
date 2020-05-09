
//Retrieve recipes from local storage
const getSavedRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')

  if (recipesJSON !== null) {
    return JSON.parse(recipesJSON)
  } else {
    return []
  }
}

//Save recipes to local storage
const saveRecipes = (recipes) => {
  const recipesJSON = JSON.stringify(recipes)
  localStorage.setItem('recipes', recipesJSON)
}

//Add a new recipe to the array
const addRecipe = (recipes) => {
    const id = uuidv4()
    recipes.push({
      id: id,
      title: '',
      instructions: '',
      ingredients: []

    })
    saveRecipes(recipes)
    location.assign(`edit.html#${id}`)
}


//Set up DOM elements for recipes 
const generateRecipeDOM = (recipe) => {
  const ownedIngredients = recipe.ingredients.filter((ingredient) => {
    return ingredient.haveStatus === true
    })
        
  const ingredientSummaryDOM = (ownedIngredients) => {
  const summary = document.createElement('p')
  if (ownedIngredients.length === 0) {
    summary.textContent = 'You have none of the ingredients'
  } else if (ownedIngredients.length < recipe.ingredients.length) {
    summary.textContent = 'You have some of the ingredients'
  } else {
    summary.textContent = 'You have all the ingredients'
  }
  return summary
}

    

    const recipeEl = document.createElement('div')
    const recipeTextEl = document.createElement('p')
    const summaryTextEl = ingredientSummaryDOM(ownedIngredients)

    //Setup the recipe text
    if (recipe.title.length > 0) {
      recipeTextEl.textContent = recipe.title
    } else {
      recipeTextEl.textContent = 'Unnamed Recipe'
    }
    
    // recipeTextEl.setAttribute('href', `edit.html#${recipe.id}`)
    recipeEl.appendChild(recipeTextEl)

    //Setup the summary text element
    
    recipeEl.appendChild(summaryTextEl)

    return recipeEl  
}


//Render recipes to the screen
const renderRecipes = (recipes, filters) => {
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  document.querySelector('#recipes').innerHTML = ''

  filteredRecipes.forEach((recipe) => {
    const recipeEl = generateRecipeDOM(recipe)
    document.querySelector('#recipes').appendChild(recipeEl)
    recipeEl.classList.add('individual-recipe')
    recipeEl.addEventListener('click', () => {
      location.assign(`edit.html#${recipe.id}`)
    })
  })
}

//Remove a recipe from the list
const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => {
    return recipe.id === id
  })
  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
  }
}


//** *///** *///** *///** *///** *///** *///** *///** */






