const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("[data-generateBtn]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 0;
// set strength circle color to grey

// handle password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow for indicator
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    return getRndInteger(0, 9);
}
function generateLowerCase() {
    // a-z ASCII range is 97-122
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    // A-Z ASCII range is 65-90
    return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbol() {
    const symbols = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    const randomIndex = getRndInteger(0, symbols.length);
    return symbols.charAt(randomIndex);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;    
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyBtn.innerText = "copied";
    } catch (e) {
        copyBtn.innerText = "failed";
    }   
    //to make copy btn visible
    copyBtn.classList.add("active");
    // remove copy btn after 2 seconds
    setTimeout(() => {
        copyBtn.innerText = "copy";
    }, 2000);
}

function shufflePassword(passwordArray) {
    // Fisher-Yates shuffle algorithm
    let arr = passwordArray;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });
    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
});


inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
});
copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value) copyContent();
});
generateBtn.addEventListener("click", () => {
    // none of the checkbox are selected
    if (checkCount <= 0) return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    // lets start the journey to find new password
    // remove old password
    password = "";
    // lets put the stuff mentioned by checkbox
    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }   
    // if (lowercaseCheck.checked) {
        //     password += generateLowerCase();
    // }
    // if (numbersCheck.checked) {
        //     password += generateRandomNumber();
        // }
        // if (symbolsCheck.checked) {
            //     password += generateSymbol();
            // }
            let funcArr = [];
            if (uppercaseCheck.checked) {
                funcArr.push(generateUpperCase);
            }
            if (lowercaseCheck.checked) {
                funcArr.push(generateLowerCase);
            }
            if (numbersCheck.checked) {
                funcArr.push(generateRandomNumber);
            }
            if (symbolsCheck.checked) {
                funcArr.push(generateSymbol);
            }
            // compulsory addition
            for (let i = 0; i < funcArr.length; i++) {
                password += funcArr[i]();
            }
    // remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    // shuffle the password
    password = shufflePassword(Array.from(password));
    // show in UI
    passwordDisplay.value = password;
    calcStrength();
});
