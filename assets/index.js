
let selector = document.querySelector(".selector_box");

selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")) {
        selector.classList.remove("selector_open")
    } else {
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

let sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

let upload = document.querySelector(".upload");

let imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    let input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

function check_date(date_arr) {
    let split_arr = date_arr.split(".");
    
    if (split_arr[0] > 31 || split_arr[0] < 1) {
        return false;
    }
    
    if (split_arr[1] > 12 || split_arr[1] < 1) {
        return false;
    }

    if (split_arr[2] < 1000 || split_arr[2] > 9999) {
        return false;
    }

    return true;
}

document.querySelector(".go").addEventListener('click', () => {

    let empty = [];

    let params = new URLSearchParams();

    params.set("sex", sex)

    let birthday = [];
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday.push(element.value.toString());
    })
    birthday = birthday.join(".");

    let issue_date = [];
    document.querySelectorAll(".issue_date_input").forEach((element) => {
        issue_date.push(element.value.toString());
    })
    issue_date = issue_date.join(".");

    let expiry_date = [];
    document.querySelectorAll(".expiry_date_input").forEach((element) => {
        expiry_date.push(element.value.toString());
    })
    expiry_date = expiry_date.join(".");

    if (birthday.length == 0 || check_date(birthday) == false) {
        let dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday)
    }

    if (issue_date.length == 0 || check_date(issue_date) == false) {
        let dateElement = document.querySelector(".date2");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("issue_date", birthday)
    }

    if (expiry_date.length == 0 || check_date(expiry_date) == false) {
        let dateElement = document.querySelector(".date3");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("expiry_date", birthday)
    }
    

    document.querySelectorAll(".input_holder").forEach((element) => {

        let input = element.querySelector(".input");

        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0) {
        empty[0].scrollIntoView();
    } else {
        forwardToId(params);
    }

});

function isEmpty(value) {

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(params) {

    location.href = "/id.html?" + params

}

let guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")) {
        guide.classList.remove("unfolded");
    } else {
        guide.classList.add("unfolded");
    }

})
