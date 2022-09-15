const generateButton = document.getElementById("generate-btn");
generateButton.addEventListener("click", fetchMeal);

async function renderMeal(data) {
    [meal] = data.meals;

    console.log(meal);

    const ingredients = [];
    for(let i = 0; i < 15; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]} `);
        }
    }

    const mealHTML = `
        <div class="col">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p class="colored"><strong>Category:</strong> ${meal.strCategory}</p>
            <p class="colored"><strong>Area:</strong> ${meal.strArea}</p>

            <h2><strong>Ingredients:</strong></h2>
            <ul>
            ${ingredients.map((ingredient) =>
                `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>

        <div class="col">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strInstructions}</p>
            <h3>Video recipe</h3>
        <div class="video-container">
            <iframe src="https://www.youtube.com/embed/${(meal.strYoutube).slice(-11)}"></iframe>
        </div>
        </div>

    `
    const mealContainer = document.querySelector("div.meal-container");
    if(mealContainer) {
        console.log("exista deja");
        mealContainer.innerHTML = mealHTML
    } else {
        const newDiv = document.createElement("div");
        newDiv.className = "meal-container";
        newDiv.innerHTML = mealHTML;
        document.querySelector("form.form-generator").after(newDiv);
    }
}

async function fetchMeal() {
    console.log("sal");
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    if(!res.ok) {
        throw new Error("Fetch has failed with status: " + res.status);
    }

    const data = await res.json();
    console.log(data);
    await renderMeal(data);
}
