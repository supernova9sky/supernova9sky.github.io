function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function create_welcome_text(date) {
    return (date.getHours() >= 18) ? "Dobry wieczór!" : "Dzień dobry!";
}

function toHome() {
    location.href = '/home?' + new URLSearchParams(window.location.search);
}

function log_in(password) {
    toHome();
}


document.querySelector(".welcome").innerHTML = create_welcome_text(new Date());

let password_element = document.querySelector(".password_input");
let dot = "•";
let uncensored_password = "";
let eye = document.querySelector(".eye");

password_element.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        log_in();
    }
})

password_element.addEventListener("input", () => {
    let password = password_element.value.toString();
    let password_lenght = password.length;
    let last_char_typed = password.at(-1);

    uncensored_password += last_char_typed;

    if (!eye.classList.contains("eye_close")) {
        let dots = dot.repeat(password_lenght - 1);
        password_element.value = dots + last_char_typed;
        delay(3000).then(() => {
            password_element.value = dot.repeat(password_element.value.toString().length);
        })
        //console.log(uncensored_password);
    }
})

document.querySelector(".login").addEventListener('click', () => {
    // verify login info (discord + custom set password by the customer)
    toHome();
});

eye.addEventListener('click', () => {
    var classlist = eye.classList;
    if (classlist.contains("eye_close")) {
        classlist.remove("eye_close");
        var dots = "";
        for (var i = 0; i < password_element.value.length - 1; i++) {
            dots = dots + dot
        }
        password_element.value = dots;
    } else {
        classlist.add("eye_close");
        password_element.value = uncensored_password;
    }
})
