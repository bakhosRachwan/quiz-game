//setup

const form = document.querySelector(".form-setup")
const setup = document.querySelector(".setup")

let questionArray = [];
let answerArray = [];
let val ={};
let i = 0;
let finalScore = 0;
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
const score = document.querySelector(".score")
const render = () => {
    console.log(i)
    // i<parseInt(amount)? null: score.classList.add("on") 
    if(i< parseInt(amount)){
        
        console.log("if")
        let q = questionArray[i].question
        question.innerHTML = q
        let correct = questionArray[i].correct_answer
        let incorrect = questionArray[i].incorrect_answers
        answerArray.push(correct)
        answerArray.push(...incorrect)
        console.log(answerArray)
        const random = answerArray.sort(() => Math.random() - 0.5)
        
        for(let x =0; x<answerArray.length; x++ ){
            let buttonKey = document.createElement('button')
            buttonKey.classList.add('button'+x)
            buttonKey.innerHTML = random[x]
            answers.appendChild(buttonKey)
            
            buttonKey.addEventListener("click", function(){
                if(buttonKey.innerText === correct){    
                    buttonKey.classList.add('active')
                    finalScore++
                }
            else buttonKey.classList.add('inactive')
            next.classList.remove("off")
        })
    }
    answerArray.length = 0;
    i<10? i++: null
    }
    else{
        console.log("else")
        document.querySelector(".score-val").innerHTML+= finalScore
        score.classList.remove("off")
        score.classList.add("on") 
        questions.classList.remove("on")
        questions.classList.add("off") 
    }
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
    fetching()
    console.log(questionArray)
    // console.log(amount)

    setTimeout(()=>{
        setup.classList.remove("on")
        setup.classList.add("off")
        questions.classList.remove("off")
        questions.classList.add("on")
        render()
    }, 2000)
   
})

//restart
const restart = document.querySelector(".restart");

restart.addEventListener("click", () => {
    questionArray = [];
    i=0;
    finalScore=0;
    document.querySelector(".score-val").innerHTML=""
    setup.classList.remove("off")
    setup.classList.add("on")
    score.classList.remove("on")
    score.classList.add("off") 
    questions.classList.remove("on")
    questions.classList.add("off") 
})
