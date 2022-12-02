const keypadF = document.querySelector(".from-keypad")
const keypadT = document.querySelector(".to-keypad")
const setupDisplay = document.querySelector(".setup-display")
const mainDisplay = document.querySelector(".main-display")
const selectFromNumber = document.querySelector(".select-from-number")
const selectToNumber = document.querySelector(".select-to-number")
const allNumbersGrid = document.querySelector(".all-numbers-grid")
const currentNumber = document.querySelector(".current-number")
const last1 = document.querySelector(".last1")
const last2 = document.querySelector(".last2")
const last3 = document.querySelector(".last3")

const goBtn = document.querySelector(".go-button-container")
const resetBtn = document.querySelector(".reset-button")
const restartBtn = document.querySelector(".restart-button")
const nextBtn = document.querySelector(".next-button")

let fromNum = 1
let toNum = 40

let fromKeys
let toKeys

let largeNumbers = false
let numbersArr = []
let randomArr = []
let active = false
let numberCount = 0

const keys = ["7", "8", "9", "4", "5", "6", 1, 2, 3, "C", 0, "del"]

renderKeypad()

function renderKeypad() {
    selectFromNumber.textContent = fromNum
    selectToNumber.textContent = toNum
    for ( let i = 0; i < keys.length; i++) {
    keypadF.innerHTML += `
    <div class="key from-key"><div>${keys[i]}</div></div>
    `
    keypadT.innerHTML += `
    <div class="key to-key"><div>${keys[i]}</div></div>
    `
    }
    fromKeys = document.querySelectorAll(".from-key")
    toKeys = document.querySelectorAll(".to-key")
    fromKeys.forEach( (x) => {
        x.addEventListener("click",()=>{
            clickFrom(x.firstChild.textContent)
        })
    })
    toKeys.forEach( (x) => {
        x.addEventListener("click",()=>{
            clickTo(x.firstChild.textContent)
        })
    })
}

function clickFrom(num) {
    let string = selectFromNumber.textContent
    if ( string.length < 4 ) {
        if ( num != "C" && num != "del") {
            selectFromNumber.textContent += num
        }
    } 
    if ( num === "C") {
        selectFromNumber.textContent = ""
    } else if ( num === "del" ) {
        selectFromNumber.textContent = string.slice(0, string.length-1)
    }
}
function clickTo(num) {
    let string = selectToNumber.textContent
    if ( string.length < 4 ) {
        if ( num != "C" && num != "del") {
            selectToNumber.textContent += num
        }
    } 
    if ( num === "C") {
        selectToNumber.textContent = ""
    } else if ( num === "del" ) {
        selectToNumber.textContent = string.slice(0, string.length-1)
    }
}

goBtn.addEventListener("click",()=>{
    fromNum = selectFromNumber.textContent
    toNum = selectToNumber.textContent
    startDisplay(fromNum, toNum)
})

function startDisplay(from, to) {
    allNumbersGrid.innerHTML = ""
    for ( let i = from; i <= to; i++ ) {
        numbersArr.push(i)
    }
    randomArr = numbersArr.slice(0, numbersArr.length)
    randomArr.sort( () => { return 0.5 - Math.random() } )
    setupDisplay.classList.add("reduced")
    mainDisplay.classList.remove("reduced")
    active = true
    if ( to <= 40 ) {
        for ( let i = 1; i <= to; i++) {
            allNumbersGrid.innerHTML += `
            <div class="small-number">${i}</div>
            `
        }
        let allSmallNumbers = document.querySelectorAll(".small-number")
        allSmallNumbers.forEach( (x)=>{
            x.addEventListener("click",()=>{
                currentNumber.textContent = x.textContent
                let cancelNum = x.textContent
                console.log(cancelNum)
                console.log(randomArr)
            })
        })
    } else {
        largeNumbers = true
        }
}

nextBtn.addEventListener("click",()=>{
    if ( active ) {
        currentNumber.textContent = randomArr[numberCount]
        allNumbersGrid.children[randomArr[numberCount]-1].classList.add("called")

        if ( numberCount >= 1 ) {
            last1.textContent = randomArr[numberCount - 1]
        }
        if ( numberCount >= 2 ) {
            last2.textContent = randomArr[numberCount - 2]
        }
        if ( numberCount >= 3 ) {
            last3.textContent = randomArr[numberCount - 3]
        }
        numberCount++
        if ( numberCount >= randomArr.length ) {
            active = false
        }
    }
})

restartBtn.addEventListener("click",()=>{
    active = true
    numberCount = 0
    numbersArr = []
    currentNumber.textContent = ""
    last1.textContent = ""
    last2.textContent = ""
    last3.textContent = ""
    startDisplay(fromNum,toNum)
})

resetBtn.addEventListener("click",()=>{
    setupDisplay.classList.remove("reduced")
    mainDisplay.classList.add("reduced")
    randomArr = []
    numbersArr = []
    currentNumber.textContent = ""
    last1.textContent = ""
    last2.textContent = ""
    last3.textContent = ""
    largeNumbers = false
    active = false
    numberCount = 0
})