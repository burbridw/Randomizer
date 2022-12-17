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
let toNum

let fromKeys
let toKeys

let largeNumbers = false
let numbersArr = []
let randomArr = []
let active = false
let numberCount = 0
let numObj = {}

const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, "C", 0, "del"]

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
    if ( Number(toNum) > Number(fromNum) ) {
        startDisplay(fromNum, toNum)
    } else {
        selectToNumber.textContent = Number(fromNum) + 1
    }
})

function startDisplay(from, to) {
    allNumbersGrid.innerHTML = ""
    
    let difference = (Number(to)+1) - Number(from)
    let newNum = Number(from)
    for ( let i = Number(from); i <= Number(to); i++) {
        numbersArr.push(Number(newNum))
        newNum++
    }
    numObj = {}
    for ( let i = 0; i < numbersArr.length; i++ ) {
        numObj[numbersArr[i]] = false
    }
    randomArr = numbersArr.slice(0, numbersArr.length)
    randomArr.sort( () => { return 0.5 - Math.random() } )
    setupDisplay.classList.add("reduced")
    mainDisplay.classList.remove("reduced")
    active = true
    if ( difference <= 40 ) {
        for ( let i = 0; i < numbersArr.length; i++) {
            allNumbersGrid.innerHTML += `
            <div class="small-number">${numbersArr[i]}</div>
            `
        }
    } else {
        largeNumbers = true
        for ( let i = 0; i < 40; i++) {
            allNumbersGrid.innerHTML += `
            <div class="small-number"></div>
            `
        }
    }
}

nextBtn.addEventListener("click",callNext)

window.addEventListener("keydown",(e)=>{
    if ( active ) {
        if ( e.key === "Enter" ) {
            callNext()
        }
    }
})

function callNext() {
    if ( active ) {
        currentNumber.textContent = randomArr[numberCount]
        numObj[randomArr[numberCount]] = true
        let getIndex = numbersArr.indexOf(randomArr[numberCount])
        if ( !largeNumbers ) {
            allNumbersGrid.children[getIndex].classList.add("called")
        } else if ( numberCount < 40 ) {
            allNumbersGrid.children[numberCount].textContent = randomArr[numberCount]
        }
        if ( numberCount >= 1 ) {
            last1.textContent = randomArr[numberCount - 1]
        }
        if ( numberCount >= 2 ) {
            last2.textContent = randomArr[numberCount - 2]
        }
        if ( numberCount >= 3 ) {
            last3.textContent = randomArr[numberCount - 3]
        }
    }
    numberCount++
    if ( numberCount >= randomArr.length ) {
        active = false
    }
}

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