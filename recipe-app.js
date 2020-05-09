
const recipes = getSavedRecipes()

const filters = {
  searchText: ''
}


const addRecipeButton = document.querySelector('#add-recipe')
const filterRecipesBar = document.querySelector('#filter-recipes')

renderRecipes(recipes,filters)



//Event listeners for search/ adding new recipe

//Search


//Add new recipe button event
addRecipeButton.addEventListener('click', (e) => {
  addRecipe(recipes)
  saveRecipes(recipes)
  // generateIngredientDOM(recipe.ingredients)
  renderRecipes(recipes,filters)
  // location.assign('edit.html')
  
})

filterRecipesBar.addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderRecipes(recipes, filters)
})

