
function set_data(id, value) {
  document.getElementById(id).innerHTML = value;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function generate_pesel(year, month, day, sex) {
  
}

let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

// if (localStorage.getItem("update") == null) {
//   localStorage.setItem("update", "16.04.2025")
// }

let date = new Date();

let updateText = document.querySelector(".last_refresh_holder .value");
updateText.innerHTML = date.toLocaleDateString("pl-PL", options);

let update = document.querySelector(".update");
update.addEventListener('click', () => {
  scroll(0, 0)
});

function set_clock(elem) {
  date = new Date()
  elem.innerHTML = "Czas: " + date.toLocaleTimeString('pl-PL', { hour12: false }) + " " + date.toLocaleDateString("pl-PL", options);
}

setInterval(set_clock, 1000, document.getElementById("time"));

let unfold = document.querySelector(".additional_document_info");
document.querySelector(".header_holder").addEventListener('click', () => {
  if (unfold.classList.contains("unfolded")) {
    unfold.classList.remove("unfolded");
  } else {
    unfold.classList.add("unfolded");
  }
})

let data = {};

let parameter_object = new URLSearchParams(window.location.search);
for (let key of parameter_object.keys()) {
  data[key] = parameter_object.get(key);
}

document.querySelector(".user_image").style.backgroundImage = `url(${data['image']})`;

let birthday = data['birthday'];
let home_date = data['home_date'];

let birthdaySplit = birthday.split(".");
let home_date_split = home_date.split(".");

let birth_day = parseInt(birthdaySplit[0]);
let birth_month = parseInt(birthdaySplit[1]);
let birth_year = parseInt(birthdaySplit[2]);

let home_day = parseInt(home_date_split[0]);
let home_month = parseInt(home_date_split[1]);
let home_year = parseInt(home_date_split[2]);

let birthdayDate = new Date();
birthdayDate.setDate(birth_day);
birthdayDate.setMonth(birth_month - 1);
birthdayDate.setFullYear(birth_year);

let home_date_obj = new Date();
home_date_obj.setDate(home_day);
home_date_obj.setMonth(home_month - 1);
home_date_obj.setFullYear(home_year);

birthday = birthdayDate.toLocaleDateString("pl-PL", options);
document.querySelector(".home_date").innerHTML = home_date_obj.toLocaleDateString("pl-PL", options);


// if (birth_day < 9) {
//   birthday = "0" + birthday;
// }

// if (home_day < 9) {
//   document.querySelector(".home_date").innerHTML = "0" + document.querySelector(".home_date").innerHTML;
// }

let sex = data['sex'];

if (sex === "m") {
  sex = "Mężczyzna"
} else if (sex === "k") {
  sex = "Kobieta"
}

let pesel = generate_pesel();

set_data("name", data['name'].toUpperCase());
set_data("surname", data['surname'].toUpperCase());
set_data("nationality", data['nationality'].toUpperCase());
set_data("birthday", birthday);
set_data("familyName", data['familyName']);
set_data("sex", sex);
set_data("fathersFamilyName", data['fathersFamilyName']);
set_data("mothersFamilyName", data['mothersFamilyName']);
set_data("birthPlace", data['birthPlace']);
set_data("countryOfBirth", data['countryOfBirth']);
set_data("adress", "ul. " + data['adress1'] + "<br>" + data['adress2'] + " " + data['city']);
set_data("serial_number", "MWYC " + data["serial_number"]);
set_data("expiry_date", data["expiry_date"]);
set_data("issue_date", data["issue_date"]);
set_data("father_name", data["father_name"].toUpperCase());
set_data("mother_name", data["mother_name"].toUpperCase());
set_data("pesel", pesel);

// setData("issuing_authority", data["issuing_authority"].toUpperCase());
// setData("issuing_authority2", data["issuing_authority"].toUpperCase());
// setData("expiry_date2", data["expiry_date"]);


// if (parseInt(year) >= 2000) {
//   month = 20 + month;
// }

// let later;

// if (sex.toLowerCase() === "mężczyzna") {
//   later = "0295"
// } else {
//   later = "0382"
// }

// if (day < 10) {
//   day = "0" + day
// }

// if (month < 10) {
//   month = "0" + month
// }

// let pesel = year.toString().substring(2) + month + day + later + "7";
// setData("pesel", pesel)

// function getRandom(min, max) {
//   return parseInt(Math.random() * (max - min) + min);
// }
