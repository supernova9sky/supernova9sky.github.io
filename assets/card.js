
function set_data(id, value) {
  document.getElementById(id).innerHTML = value;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function generate_random_integers(lenght, max, min) {
  let result = [];

  for (let i = 0; i < lenght; ++i) {
    result.push(Math.floor(Math.random() * max) + min);
  }

  return result.join('');
}

function get_pesel_month(year, month) {
  if ((year >= 1900) && (year <= 1999)) {
    return ++month;
  } else if ((year >= 2000) && (year <= 2099)) {
    if (month > 9) {
      return 30 + (10 - ++month);
    }
    return 20 + ++month;
  }
}

function add_checksum(almost_full_pesel) {
  if (almost_full_pesel.lenght > 10) {
    return "ERR: TOO LONG PESEL";
  }

  const sum = (...args) => args.reduce((curr, prev) => curr + prev);

  let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let calculated = [];
  
  for (let i = 0; i < 10; ++i) {
    calculated.push(parseInt((parseInt(almost_full_pesel[i]) * weights[i]).toString().slice(-1)));
  }

  let summed = calculated.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  let moduloed = summed % 10;
  let control = moduloed === 0 ? 0 : 10 - moduloed;

  return almost_full_pesel + control.toString();
}

function generate_pesel(day, month, year, sex) {
  const year_last_two_nums = year.toString().substring(2, 4);
  const calculated_month = get_pesel_month(year, month); 
  let random_num = generate_random_integers(3, 9, 0);
  if (sex === "Mężczyzna") {
    random_num += "5";
  } else {
    random_num += "0";
  }

  return add_checksum(`${year_last_two_nums}${calculated_month}${day}${random_num}`);
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

let sex = data['sex'];

if (sex === "m") {
  sex = "Mężczyzna"
} else if (sex === "k") {
  sex = "Kobieta"
}

let pesel = localStorage.getItem("pesel");
if (pesel == null) {
  pesel = generate_pesel(birth_day, birth_month - 1, birth_year, sex);
  localStorage.setItem("pesel", pesel);
}


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
