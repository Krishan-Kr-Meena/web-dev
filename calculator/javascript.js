let answerDisplay = document.getElementById("answer-display")
let buttons = document.querySelectorAll('button')

let string = ''

buttons.forEach(element => {
    element.addEventListener('click', (b)=>{
        if(b.target.innerText =='='){
            string = String(eval(string))
            answerDisplay.value = string
        }
        else if(b.target.innerText == 'AC'){
            string = ''
            answerDisplay.value = string
        }
        else if(b.target.innerText == 'DEL'){
            string = string.substring(0,string.length-1)
            answerDisplay.value = string
        }
        else if(b.target.innerText == '+/-'){
            string = String(-eval(string))
            answerDisplay.value = string
        }
        else{
            string +=b.target.innerText
            answerDisplay.value = string
        }
    })
})

