function closePage(){
  clearClassList();
}

function openPage(page){
  clearClassList();
  let classList = document.querySelector(".confirm").classList;
  classList.add("page_open");
  classList.add("page_" + page + "_open");
}

function clearClassList(){
  let classList2 = document.querySelector(".confirm").classList;
  classList2.remove("page_open");
  classList2.remove("page_1_open");
  classList2.remove("page_2_open");
  classList2.remove("page_3_open");
}

let time = document.getElementById("time");
let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

if (localStorage.getItem("update") == null){
  localStorage.setItem("update", "16.04.2025")
}

let date = new Date();

let updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = date.toLocaleDateString("pl-PL", options);

let update = document.querySelector(".update");
update.addEventListener('click', () => {
  scroll(0, 0)
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock(){
    date = new Date()
    time.innerHTML = "Czas: " + date.toLocaleTimeString() + " " + date.toLocaleDateString("pl-PL", options);    
    delay(1000).then(() => {
        setClock();
    })
}

let unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {

  if (unfold.classList.contains("unfolded")){
    unfold.classList.remove("unfolded");
  }else{
    unfold.classList.add("unfolded");
  }

})

let data = {}

let parameter_object = new URLSearchParams(window.location.search);
for (let key of parameter_object.keys()){
  data[key] = parameter_object.get(key);
}

document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

let birthday = data['birthday'];
let birthdaySplit = birthday.split(".");
let day = parseInt(birthdaySplit[0]);
let month = parseInt(birthdaySplit[1]);
let year = parseInt(birthdaySplit[2]);

let birthdayDate = new Date();
birthdayDate.setDate(day)
birthdayDate.setMonth(month-1)
birthdayDate.setFullYear(year)

birthday = birthdayDate.toLocaleDateString("pl-PL", options);
if (day < 9) {
  birthday = "0" + birthday
}

let sex = data['sex'];

if (sex === "m"){
  sex = "Mężczyzna"
}else if (sex === "k"){
  sex = "Kobieta"
}

setData("name", data['name'].toUpperCase());
setData("surname", data['surname'].toUpperCase());
setData("nationality", data['nationality'].toUpperCase());
setData("birthday", birthday);
setData("familyName", data['familyName']);
setData("sex", sex);
setData("fathersFamilyName", data['fathersFamilyName']);
setData("mothersFamilyName", data['mothersFamilyName']);
setData("birthPlace", data['birthPlace']);
setData("countryOfBirth", data['countryOfBirth']);
setData("adress", "ul. " + data['adress1'] + "<br>" + data['adress2'] + " " + data['city']);
setData("serial_number", "ZZC " + data["serial_number"]);
setData("issuing_authority", data["issuing_authority"].toUpperCase());
setData("expiry_date", data["expiry_date"]);

setData("serial_number2", "ZZC " + data["serial_number"]);
setData("issuing_authority2", data["issuing_authority"].toUpperCase());
setData("expiry_date2", data["expiry_date"]);

setData("issue_date", data["issue_date"]);
setData("father_name", data["father_name"]);
setData("mother_name", data["mother_name"]);

if (localStorage.getItem("homeDate") == null){
  let homeDay = getRandom(1, 25);
  let homeMonth = getRandom(0, 12);
  let homeYear = getRandom(2012, 2019);

  let homeDate = new Date();
  homeDate.setDate(homeDay);
  homeDate.setMonth(homeMonth);
  homeDate.setFullYear(homeYear)

  localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options))
}

document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate")

if (parseInt(year) >= 2000){
  month = 20 + month;
}

let later;

if (sex.toLowerCase() === "mężczyzna"){
  later = "0295"
}else{
  later = "0382"
}

if (day < 10){
  day = "0" + day
}

if (month < 10){
  month = "0" + month
}

let pesel = year.toString().substring(2) + month + day + later + "7";
setData("pesel", pesel)

function setData(id, value){

  document.getElementById(id).innerHTML = value;

}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
