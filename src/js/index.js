/* eslint-disable no-unused-vars */
let addButton = document.getElementsByClassName('add-button')[0];
let form = document.getElementsByClassName('form-container')[0];
let saveButton = document.getElementsByClassName('save-button')[0];
let table = document.getElementsByClassName('table')[0];
let cancelButton = document.getElementsByClassName('cancel-button')[0];
let nameInput = document.getElementsByClassName('item-name')[0];
let priceInput = document.getElementsByClassName('item-price')[0];
let hintForDeletion = document.getElementsByClassName('deletion-hint')[0];
let hintText = document.getElementsByClassName('deletion-text')[0];
let deleteItemButton = document.getElementsByClassName('deletion-hint-button')[0];
let cancelDelbutton = document.getElementsByClassName('cancel-deletion-button')[0];
let nameLabelEl = document.getElementsByClassName('name-label')[0];
let priceLabelEl = document.getElementsByClassName('price-label')[0];


let formVisible = (e) => {
    form.classList.remove('invisible');
}

let hintActivate = (e) => {
    event.preventDefault();
    let activeEl = event.target;
    let trParent = activeEl.closest('tr');
    trParent.classList.add('for-delete');
    let tdArray = trParent.children;
    let text = tdArray[0].textContent;
    hintForDeletion.classList.remove('invisible');
    hintText.textContent = `Удаляем товар ${text}?`;
}

  
let correctAction = (e) => {
    event.preventDefault();
    saveButton.classList.add('not-adding');
    let activeEl = event.target;
    form.classList.remove('invisible');
    let nameInput = document.getElementsByClassName('item-name')[0];
    let priceInput = document.getElementsByClassName('item-price')[0];
    // eslint-disable-next-line no-unused-vars
    let correctButton = document.getElementsByClassName('correct-button');
    correctButton = [...correctButton];
    let trParent = activeEl.closest('tr');
    trParent.classList.add('mark');
    let tdArray = trParent.children;
    tdArray = [...tdArray];
    let name = tdArray[0].textContent;
    let price = tdArray[1].textContent;
    nameInput.value = name;
    priceInput.value = price;
}

let deletion = (e) => {
    let elForDelete = document.getElementsByClassName('for-delete')[0];
    elForDelete.remove();
    hintForDeletion.classList.add('invisible');
}

let hintRemove = (e) => {
    hintForDeletion.classList.add('invisible');
}

let namePriceInputVal = (e) => {
    let itemsForCorrect = document.getElementsByClassName('not-adding');
    event.preventDefault();
    if(Number(priceInput.value) > 0 && nameInput.value) {
        let nameValue = nameInput.value;
        let priceValue = priceInput.value;
        if (itemsForCorrect.length === 0) {
            let tr = document.createElement('tr');
            tr.classList.add('tr-added');
            table.appendChild(tr);
            let nameTd = document.createElement('td');
            let priceTd = document.createElement('td');
            let correctTd = document.createElement('td');
            nameTd.textContent = nameValue;
            tr.appendChild(nameTd);
            priceTd.textContent = priceValue;
            tr.appendChild(priceTd);
            tr.appendChild(correctTd);
            let divContButton = document.createElement('div');
            divContButton.classList.add('buttons-container');
            correctTd.appendChild(divContButton);
            let correctButton = document.createElement('button');
            let deleteButton = document.createElement('button');
            divContButton.appendChild(correctButton);
            divContButton.appendChild(deleteButton);
            correctButton.classList.add('correct-button');
            correctButton.addEventListener('click', correctAction);
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', hintActivate);
            let img = document.createElement('img');
            img.src = './src/image/pencil.png';
            img.width = 30;
            correctButton.appendChild(img);
            deleteButton.innerHTML = '<p>+</p>';
        } else {
            let trTarget = document.getElementsByClassName('mark')[0];
            let tdArray = trTarget.children;
            tdArray = [...tdArray];
            tdArray[0].textContent = nameValue;
            tdArray[1].textContent = priceValue;
            trTarget.classList.remove('mark');
            saveButton.classList.remove('not-adding');
        }
        nameInput.value = null;
        priceInput.value = null;
        form.classList.add('invisible');
    } else if (!nameInput.value || !priceInput.value) {
        let inputs = document.getElementsByTagName('input');
        inputs = [...inputs];
        let emptyInput = inputs.filter((item) => {
            return !item.value;
        })[0];
        emptyInput.focus();
        let errorMessage = document.createElement('div');
        let parentLabel = emptyInput.parentNode;
        parentLabel.appendChild(errorMessage);
        let errorPelement = document.createElement('p');
        errorMessage.classList.add('form-error');
        errorMessage.appendChild(errorPelement);
        errorPelement.textContent = `Поле "${emptyInput.placeholder}" обязательно для заполнения`;
    } else if (isNaN(Number(priceInput.value)) || Number(priceInput.value) <= 0) {
        priceInput.focus();
        let errorMessage = document.createElement('div');
        priceLabelEl.appendChild(errorMessage);
        let errorPelement = document.createElement('p');
        errorMessage.classList.add('form-error');
        errorMessage.appendChild(errorPelement);
        errorPelement.textContent = "Введите число больше нуля";
    } 
}

let cancelAction = (e) => {
    form.classList.add('invisible');
}

let errorRemove = (e) => {
    let formErrors = document.getElementsByClassName('form-error');
    formErrors = [...formErrors];
    if (formErrors.length > 0) {
        for(let i=0; i < formErrors.length; i++) {
            formErrors[i].remove();
        }
    }
}

addButton.addEventListener('click', formVisible);
saveButton.addEventListener('click', namePriceInputVal);
cancelButton.addEventListener('click', cancelAction);
deleteItemButton.addEventListener('click', deletion);
cancelDelbutton.addEventListener('click', hintRemove);
cancelButton.addEventListener('click', errorRemove);
nameInput.addEventListener('input', errorRemove);
priceInput.addEventListener('input', errorRemove);
