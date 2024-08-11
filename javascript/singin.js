const emailInput = document.querySelector('#singinInputEmail');
const nameInput = document.querySelector('#singinInputName');
const remmember = document.querySelector('#singinInputRemember');
const singin = document.querySelector('.btn-sign-in');

singin.onclick = () => {

    if (remmember.checked) {
        localStorage.setItem("emailInput", emailInput.value);
        localStorage.setItem("nameInput", nameInput.value);
        sessionStorage.setItem("emailInput", emailInput.value);
        sessionStorage.setItem("nameInput", nameInput.value);
    }
    else {
        sessionStorage.setItem("emailInput", emailInput.value);
        sessionStorage.setItem("nameInput", nameInput.value);
    }
}

