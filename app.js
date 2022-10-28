const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const form = document.querySelector('.form')
const input = document.querySelector("#word")

const word = document.querySelector('.word h2')
const btnAudio = document.querySelector('.audio')
const partOfSpeech = document.querySelector('.part-of-speech')
const phoneticText = document.querySelector('.phonetic-text')

const definition = document.querySelector('.definition')
const example = document.querySelector('.example')

let inputWord = ""
let audio = ""

function firstLetterUC(word){
    wordUC = ''
    for (let i = 0; i < word.length; i++) {
        i == 0 ? wordUC += word[i].toUpperCase() : wordUC += word[i]
    }
    return wordUC
}

form.addEventListener('submit', (e)=>{
    inputWord = input.value
    fetch(`${url}${inputWord.replace(' ', '-')}`).then((response) => response.json()
        .then((data) => {
            word.textContent = firstLetterUC(data[0].word)
            let phonetics = data[0].phonetics

            partOfSpeech.textContent = data[0].meanings[0].partOfSpeech
            phoneticText.textContent = data[0].phonetic
            definition.innerHTML = data[0].meanings[0].definitions[0].definition
            example.textContent = data[0].meanings[0].definitions[0].example

            if(phonetics.length == 0){
                btnAudio.classList.add('hidden')
            }
            for (const data of phonetics) {
                if(data.audio != ''){
                    btnAudio.classList.remove('hidden')
                    audio = new Audio(data.audio)
                    break
                }else{
                    btnAudio.classList.add('hidden')
                }
            }
            console.log(data)
        }).catch (() => {
            word.textContent = "This word cannot be found"
            btnAudio.classList.add('hidden')
            partOfSpeech.textContent = ""
            phoneticText.textContent = ""
            definition.innerHTML = ""
            example.textContent = ""
        })
    )
    e.preventDefault()
})

btnAudio.addEventListener('click',()=>{
    audio.play()
})