const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const form = document.querySelector('.form')
const input = document.querySelector("#word")

const word = document.querySelector('.word h2')
const partOfSpeech = document.querySelector('.part-of-speech')
const phoneticText = document.querySelector('.phonetic-text')

const definition = document.querySelector('.definition')
const example = document.querySelector('.example')

const synonyms = document.querySelector('.synonyms')

let inputWord = ""

function firstLetterUC(word){
    wordUC = ''
    for (let i = 0; i < word.length; i++) {
        i == 0 ? wordUC += word[i].toUpperCase() : wordUC += word[i]
    }
    return wordUC
}

form.addEventListener('submit', (e)=>{
    inputWord = input.value
    fetch(`${url} ${inputWord.replace(' ', '-')}`).then(
        (response) => response.json().then(
            (data) => {
                word.textContent = firstLetterUC(data[0].word)
                partOfSpeech.textContent = data[0].meanings[0].partOfSpeech
                phoneticText.textContent = data[0].phonetic
                definition.innerHTML = data[0].meanings[0].definitions[0].definition
                example.textContent = data[0].meanings[0].definitions[0].example
                console.log(data)
            }
        )
    );
    e.preventDefault()
})