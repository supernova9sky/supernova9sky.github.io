let date = new Date();
let updateText = document.querySelector(".last_refresh_holder .value");
updateText.innerHTML = date.toLocaleDateString("pl-PL", { year: 'numeric', month: 'numeric', day: 'numeric' });

let serial = document.getElementById("serial_number2");

function copy_serial() {
  navigator.clipboard.writeText(serial.innerHTML);
}

function setData(id, value) {
  document.getElementById(id).innerHTML = value;
}

let data = {}

let parameter_object = new URLSearchParams(window.location.search);
for (let key of parameter_object.keys()) {
  data[key] = parameter_object.get(key);
}

setData("serial_number2", "ZZC " + data["serial_number2"]);
setData("expiry_date", data["expiry_date"]);
setData("issue_date", data["issue_date"]);
setData("issuing_authority", data["issuing_authority"]);
