const spans = document.getElementsByTagName("span")
const input = document.getElementsByTagName("input")
const form = document.getElementsByTagName("form")[0];
const form2 = document.getElementsByTagName("form")[1];

const emailRegex = /^[a-zA-Z0-9._%+-]{1,14}@(hotmail|gmail|outlook)\.com$/;
const telRegex = /(\d{2})-(\d{2})-(\d{9})/;
const passwordRegex = /^.{7,30}$/;

const primaryTemplate = document.querySelector(".primaryTemplate");
const secondTemplate = document.querySelector(".secondTemplate");

console.log(input, spans, form, form2)


form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    checkForm1();
});

form2.addEventListener("submit", (event) => {
    event.preventDefault()
    checkForm2();
})

// Função auxiliar para remover as classes de animação
function resetAnimationClasses() {
    primaryTemplate.classList.remove("slide-out-left", "slide-in-left");
    secondTemplate.classList.remove("slide-out-right", "slide-in-right");
}

function showSignUp() {
    resetAnimationClasses();

    // Aplica a animação de saída ao primaryTemplate e entrada ao secondTemplate
    primaryTemplate.classList.add("slide-out-left");
    primaryTemplate.style.display = "none";
    secondTemplate.style.display = "flex";
    secondTemplate.classList.add("slide-in-right");

    // Remove a animação após a transição para preparar para o próximo clique
    setTimeout(() => {
        resetAnimationClasses();
    }, 1000); // Tempo da animação em milissegundos
}

function showSignIn() {
    // Reinicia as classes de animação para evitar problemas de transição
    resetAnimationClasses();

    // Aplica a animação de saída ao secondTemplate e entrada ao primaryTemplate
    secondTemplate.classList.add("slide-out-right");
    secondTemplate.style.display = "none";
    primaryTemplate.style.display = "flex";
    primaryTemplate.classList.add("slide-in-left");

    // Remove a animação após a transição para preparar para o próximo clique
    setTimeout(() => {
        resetAnimationClasses();
    }, 1000); // Tempo da animação em milissegundos
}

function setError(index) {
    input[index].style.border = '2px solid #ff0000';
    spans[index].style.display = 'block';
    input[index].classList.remove("formValidate")
    input[index].classList.add("formError")
}

function removeError(index) {
    input[index].style.border = 'none';
    spans[index].style.display = 'none';
    input[index].classList.remove("formError")
    input[index].classList.add("formValidate")
}

function emailValidate(index) {
    const validateEmail = emailRegex.test(input[index].value)
    if (!validateEmail) {
        setError(index);
    }
    else {
        removeError(index);
    }
}

function passwordValidate(index) {
    const validatePassword = passwordRegex.test(input[index].value)
    if (!validatePassword) {
        setTimeout(() => {
            setError(index);
        }, 1250);

        input[index+1].style.display = 'none';
    }
    else {
        setTimeout(() => {
            removeError(index);     
        }, 1250);
        input[index+1].style.display = 'block';
}
}

function repeatPasswordValidate(index) {
    if (input[index].value == input[index-1].value) {
        setTimeout(() => {
            removeError(index)
        }, 1250);
    }
    else {
        setTimeout(() => {
            setError(index)

        }, 1250);
    }
}

function usernameValidate(index) {
    const usernameValidate = input[index].value.length

    if (usernameValidate < 8 || usernameValidate > 30) {
        setError(index);
    }
    else {
        removeError(index);
    }
}

function phoneValidate(index) {
    const phoneValidate = telRegex.test(input[index].value)

    if (!phoneValidate) {
        setError(index);
    }
    else {
        removeError(index);
    }
}

function checkForm1() {
    emailValidate(0);
    passwordValidate(1);
    repeatPasswordValidate(2);

    const isValid = [...input].slice(0, 2).every((items) => {
        return items.classList.contains("formValidate")
    })

    if (isValid) {
        alert("Formulário enviado com sucesso!!")
        console.log(isValid)
        form.submit()
    }
}

function checkForm2() {
    usernameValidate(3);
    emailValidate(4);
    passwordValidate(5);
    repeatPasswordValidate(6);
    phoneValidate(7);

    const isValid = [...input].slice(3, 7).every((items) => {
        return items.classList.contains("formValidate")
    })

    if (isValid) {
        alert("Formulário enviado com sucesso!!")
        console.log(isValid)
        form2.submit()
    }
}