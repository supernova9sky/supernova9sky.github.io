function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

let time = document.getElementById("time_left");
let time_text = document.getElementById("time_left_text");
let now = new Date();
let next_3_minutes = new Date(now.getTime() + 3 * 60000);

setClock();
function setClock() {
  let difference = next_3_minutes - new Date();
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if ((time.value > 0) && (seconds != -1) && (minutes != 0)) {
    time.value -= 1;
    time_text.innerHTML = minutes + " min " + seconds + " sek.";
  } else {
    location.reload();
  }

  delay(1000).then(() => {
    setClock();
  })
}

let text_code = document.getElementById("text_code");

function generate_random_integers(lenght, max, min) {
  let result = [];

  for (let i = 0; i < lenght; ++i) {
    result.push(Math.floor(Math.random() * max) + min);
  }

  return result.join('');
}

text_code.innerHTML = generate_random_integers(6, 9, 1);

let qr_image = document.getElementById("qr_image");

qr_image.src = "assets/images/kod_qr" + generate_random_integers(1, 4, 1) + ".svg";



