const cardNumberInput = document.getElementById("card-number-input");
const cardNameInput = document.getElementById("card-name-input");
const monthInput = document.getElementById("exp-date-month");
const yearInput = document.getElementById("exp-date-year");
const dateInputs = document.querySelector(".date-inputs");
const cvcInput = document.getElementById("cvc");

dateInputs.addEventListener("keyup", (e) => {
    const cardDate = document.getElementById("card-date");

    if (e.target.id == "exp-date-month") {
        const year = cardDate.textContent.slice(cardDate.textContent.indexOf("/"));
        cardDate.textContent = e.target.value + year;

        if (e.target.value == "") {
            cardDate.textContent = "00" + year;
        }
    }

    if (e.target.id == "exp-date-year") {
        const month = cardDate.textContent.slice(0, cardDate.textContent.indexOf("/") + 1);
        cardDate.textContent = month + e.target.value;

        if (e.target.value == "") {
            cardDate.textContent = month + "00";
        }
    }
})

cvcInput.addEventListener("keyup", (e) => {
    const cardCVC = document.getElementById("card-cvc");
    cardCVC.textContent = e.target.value;
    if (e.target.value == "") {
        cardCVC.textContent = "000";
    }
})



console.log(cardNumberInput);

cardNameInput.addEventListener("input", (e) => {
    const cardName = document.getElementById("card-name");
    cardName.textContent = e.target.value;
})

cardNumberInput.addEventListener("input", (e) => {



    console.log("e target value: " + e.target.value);
    const cardNumber = document.getElementById("card-number");
    const oldText = cardNumber.textContent;

    if (e.target.value == "") {
        cardNumber.textContent = "0000 0000 0000 0000";
    } else {
        const deleteSpaces = e.target.value.replaceAll(' ', '');

        if (deleteSpaces.length > 16) {
            alert("Eroare");
            e.target.value = oldText;
        } else {
            if (deleteSpaces.length % 4 == 0 && deleteSpaces.length < 16) {
                e.target.value += " ";
            }

            cardNumber.textContent = e.target.value
        }
    }

})

// Delete added spaces in case of backspace
cardNumberInput.addEventListener("keydown", (e) => {
    const cardNumber = document.getElementById("card-number");
    const inputLength = cardNumberInput.value.length;

    if (e.key == "Backspace" && cardNumberInput.value.charAt(inputLength - 1) === " ") {
        cardNumberInput.value = cardNumberInput.value.slice(0, inputLength - 1);
    }
})

const form = document.getElementById("card-submit");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successForm = document.querySelector('form#success-form');
    const submitForm = document.querySelector('form#card-submit');
    successForm.style.display = 'flex';
    submitForm.style.display = 'none'
});