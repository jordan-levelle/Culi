let add_ingredients_btn = document.getElementById('add_ingredients_btn')
let list_of_ingredients = document.querySelector('.list_of_ingredients');
let ingredient_div = document.querySelectorAll('.ingredient_div')[0];

add_ingredients_btn.addEventListener('click', () => {
    let ingredients = ingredient_div.cloneNode(true);
    let input = ingredients.getElementsByTagName('input')[0];
    input.value = '';
    list_of_ingredients.appendChild(ingredients);
});
