const searchBtn = document.querySelector('.search-btn');


searchBtn.addEventListener('click', recipeList);

function recipeList (){
    let recipeSearch = document.querySelector('.userSearch').ariaValueMax.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    TouchEvent(response)
}