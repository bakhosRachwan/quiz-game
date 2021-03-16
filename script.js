//setup

const form = document.querySelector(".form-setup")
const setup = document.querySelector(".setup")

let questionArray = [];
let answerArray = [];
let val ={};
let i = 0;
let amount = 0;
let URLs = "https://opentdb.com/api.php?amount=10&category=21";

const fetching = () => {
    fetch(URLs)
    .then(res => res.json())
    .then(data => questionArray.push(...data.results))
}

//questions
const questions = document.querySelector(".questions-page")
const question = document.querySelector(".question")
const answers = document.querySelector(".answers")
const next = document.querySelector(".next")
const render = () => {
    // i<parseInt(amount)? null: window.location = "score.html"
    let q = questionArray[i].question
    question.innerHTML = q
    let correct = questionArray[i].correct_answer
    let incorrect = questionArray[i].incorrect_answers
    answerArray.push(correct)
    answerArray.push(...incorrect)
    const random = answerArray.sort(() => Math.random() - 0.5)
    
    for(let x =0; x<answerArray.length; x++ ){
        let buttonKey = document.createElement('button')
        buttonKey.classList.add('button'+x)
        buttonKey.innerHTML = random[x]
        answers.appendChild(buttonKey)
      
        buttonKey.addEventListener("click", function(){
            if(buttonKey.innerText === correct){    
                buttonKey.classList.add('active')
                // score++
            }
            else buttonKey.classList.add('inactive')
            next.classList.remove("off")
        })
    }
    answerArray.length = 0;
    i<10? i++: null
}
// fetching()
// setTimeout(() => {
//     console.log(questionArray)
//     render()
// }, 1000)

//next button
next.addEventListener("click", function(){
    document.querySelector(".answers").innerHTML = ''
    next.classList.add("off")
    setTimeout(() => {
        render() 
    }, 200)
})

//form
form.addEventListener("submit", function(e){
    e.preventDefault();
    const {number, catagory, difficulty, type} = e.target;
    val = 
        {
            number: number.value,
            catagory: catagory.value,
            difficulty: difficulty.value,
            type: type.value
        }
    
    e.target.reset()
    amount = val.number
    URLs = `https://opentdb.com/api.php?amount=${val.number}&category=${val.catagory}&difficulty=${val.difficulty}&type=${val.type}`
    sessionStorage.setItem("URL", URLs);
    fetching()
    console.log(questionArray)

    setTimeout(()=>{
        render()
    }, 2000)
   
})

