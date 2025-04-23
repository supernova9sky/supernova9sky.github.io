function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function create_welcome_text(date) {
    return (date.getHours() >= 18) ? "Dobry wieczór!" : "Dzień dobry!";
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

const base64 = {
    encode: (buffer) => {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    },
    decode: (base64Str) => {
        // Add any missing padding
        base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64Str.length % 4) {
            base64Str += '=';
        }

        const binary = atob(base64Str);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }
};

/**
 * Encrypts data using AES-256-GCM encryption with a provided key
 * @param {string} plaintext - The text to encrypt
 * @param {string} key - Base64 encoded 256-bit key (URL-safe base64)
 * @returns {Promise<string>} - Base64 encoded encrypted data
 */
async function encryptAES256(plaintext, key, iv) {
    try {
        // Convert the base64 key to a CryptoKey
        const rawKey = base64.decode(key);

        // Ensure key is exactly 32 bytes (256 bits)
        if (rawKey.length !== 32) {
            throw new Error("Key must be 256 bits (32 bytes)");
        }

        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            rawKey,
            { name: "AES-GCM" },
            false,
            ["encrypt"]
        );

        // Generate a random IV (Initialization Vector)
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        // Encrypt the data
        const encryptedContent = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            cryptoKey,
            new TextEncoder().encode(plaintext)
        );

        // Combine IV and encrypted content
        const result = new Uint8Array(iv.length + encryptedContent.byteLength);
        result.set(iv, 0);
        result.set(new Uint8Array(encryptedContent), iv.length);

        // Return as URL-safe base64 string
        return base64.encode(result);
    } catch (error) {
        throw new Error("Encryption failed: " + error.message);
    }
}

/**
 * Decrypts AES-256-GCM encrypted data with a provided key
 * @param {string} encryptedData - Base64 encoded encrypted data (URL-safe base64)
 * @param {string} key - Base64 encoded 256-bit key (URL-safe base64)
 * @returns {Promise<string>} - Decrypted plaintext
 */
async function decryptAES256(encryptedData, key) {
    try {
        // Convert the base64 key to a CryptoKey
        const rawKey = base64.decode(key);

        // Ensure key is exactly 32 bytes (256 bits)
        if (rawKey.length !== 32) {
            throw new Error("Key must be 256 bits (32 bytes)");
        }

        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            rawKey,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        // Convert from base64 to array buffer
        const rawData = base64.decode(encryptedData);

        // Extract IV and encrypted content
        const iv = rawData.slice(0, 12);
        const encryptedContent = rawData.slice(12);

        // Decrypt the content
        const decryptedContent = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            cryptoKey,
            encryptedContent
        );

        // Return the decrypted text
        return new TextDecoder().decode(decryptedContent);
    } catch (error) {
        throw new Error("Decryption failed: " + error.message);
    }
}

async function log_in(password) {
    let data = {}

    let parameter_object = new URLSearchParams(window.location.search);
    for (let key of parameter_object.keys()){
        data[key] = parameter_object.get(key);
    }

    const f = loadFile("totalny_zbomboklacony_plik_tekstowy.txt").toString().split("\n");
    
    const myKey = ("oPcQCsM").split('').reverse().join('') + (+[![]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]][([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][[]] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+!+[]] + (+[![]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+!+[]]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]][([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][[]] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+!+[]] + (+[![]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([] + [])[([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]][([][[]] + [])[+!+[]] + (![] + [])[+!+[]] + ((+[])[([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]] + [])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()([][(![] + [])[+!+[]] + (!![] + [])[+[]]])[(![] + [])[+!+[]] + (!![] + [])[+[]]]((+((+(+!+[] + [+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + [!+[] + !+[]] + [+[]]) + [])[+!+[]] + [+[] + [+[]] + [+[]] + [+[]] + [+[]] + [+[]] + [+!+[]]]) + [])[!+[] + !+[]] + [+!+[]]) + (![] + [])[+!+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]])()())[!+[] + !+[] + !+[] + [+[]]] + (![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]][([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][[]] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+!+[]] + (+[![]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+!+[]]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]][([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][[]] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+!+[]] + (+[![]] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]] + (![] + [])[!+[] + !+[] + !+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (![] + [])[+!+[]] + (+(!+[] + !+[] + [+!+[]] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([] + [])[([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]][([][[]] + [])[+!+[]] + (![] + [])[+!+[]] + ((+[])[([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]] + [])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]]]](!+[] + !+[] + !+[] + [+!+[]])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]])()([][(![] + [])[+!+[]] + (!![] + [])[+[]]])[(![] + [])[+!+[]] + (!![] + [])[+[]]]((+((+(+!+[] + [+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + [!+[] + !+[]] + [+[]]) + [])[+!+[]] + [+[] + [+[]] + [+[]] + [+[]] + [+[]] + [+[]] + [+!+[]]]) + [])[!+[] + !+[]] + [+!+[]]) + (![] + [])[+!+[]] + (!![] + [])[+[]] + (!![] + [])[!+[] + !+[] + !+[]])()())[!+[] + !+[] + !+[] + [+[]]] + [!+[] + !+[]] + (+(+!+[] + (!+[] + [])[!+[] + !+[] + !+[]] + [+!+[]] + [+[]] + [+[]] + [+[]]) + [])[+[]] + [!+[] + !+[] + !+[]] + ("x").repeat(2) + (117).toString(36).toLowerCase() + (22).toString(36).toLowerCase().split('').map(function (y) { return String.fromCharCode(y.charCodeAt() + (-39)) }).join('') + (function () { var e = Array.prototype.slice.call(arguments), t = e.shift(); return e.reverse().map(function (v, E) { return String.fromCharCode(v - t - 17 - E) }).join('') })(40, 108, 173, 164) + (1351585).toString(36).toLowerCase() + (46181).toString(36).toLowerCase().split('').map(function (R) { return String.fromCharCode(R.charCodeAt() + (-39)) }).join('') + (870).toString(36).toLowerCase() + (13).toString(36).toLowerCase().split('').map(function (d) { return String.fromCharCode(d.charCodeAt() + (-13)) }).join('') + (672).toString(36).toLowerCase().split('').map(function (Y) { return String.fromCharCode(Y.charCodeAt() + (-39)) }).join('') + (function () { var X = Array.prototype.slice.call(arguments), B = X.shift(); return X.reverse().map(function (H, e) { return String.fromCharCode(H - B - 31 - e) }).join('') })(22, 133, 110) + (9).toString(36).toLowerCase() + (function () { var m = Array.prototype.slice.call(arguments), D = m.shift(); return m.reverse().map(function (C, s) { return String.fromCharCode(C - D - 60 - s) }).join('') })(15, 194, 152, 128) + (28).toString(36).toLowerCase().split('').map(function (P) { return String.fromCharCode(P.charCodeAt() + (-39)) }).join('') + (function () { var G = Array.prototype.slice.call(arguments), o = G.shift(); return G.reverse().map(function (z, W) { return String.fromCharCode(z - o - 21 - W) }).join('') })(33, 140) + (26).toString(36).toLowerCase() + "to";

    //const encrypted = await encryptAES256(`${password}:${data['image']}`, myKey);
    //console.log("Encrypted:", encrypted);

    const decrypted = [];
    f.forEach((val) => {
        decrypted.push(decryptAES256(val.toString(), myKey))
    })

    let search = password + ":" + data['image'];
    decrypted.forEach(val => val.then(prom_val => {
        if (prom_val === search) {
            toHome();
        }
    }));
}


document.querySelector(".welcome").innerHTML = create_welcome_text(new Date());

let password_element = document.querySelector(".password_input");
let dot = "•";
let uncensored_password = "";
let eye = document.querySelector(".eye");

password_element.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        log_in(uncensored_password);
    }
})

password_element.addEventListener("input", () => {
    let password = password_element.value.toString();
    let password_lenght = password.length;
    let last_char_typed = password.at(-1);

    uncensored_password += last_char_typed;

    if (!eye.classList.contains("eye_close")) {
        if (password_lenght !== 0) {
            let dots = dot.repeat(password_lenght - 1);
        password_element.value = dots + last_char_typed;
        delay(3000).then(() => {
            password_element.value = dot.repeat(password_element.value.toString().length);
        })
        }
        //console.log(uncensored_password);
    }
})

document.querySelector(".login").addEventListener('click', () => {
    // verify login info (discord + custom set password by the customer)
    log_in(uncensored_password);
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
