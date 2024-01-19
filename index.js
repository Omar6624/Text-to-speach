const form = document.querySelector('form')
const textInput = document.getElementById("text-area")
const select = document.getElementById("voice-list")
const pauseB = document.getElementById("pause")
const resumeB = document.getElementById("resume")
const sp = window.speechSynthesis
const voice = sp.getVoices()
//pause and resume doesnt work 
pauseB.addEventListener('click', () => {
    console.log("Pause button clicked");
    console.log("sp.speaking:", sp.speaking);
    if (sp.speaking === true) {
        console.log("Pausing...");
        sp.pause();
    }
})
resumeB.addEventListener('click', () => {
    console.log("Resume button clicked");
    console.log("sp.paused:", sp.paused);
    console.log("sp.speaking:", sp.speaking);

    if (sp.paused && sp.speaking) {
        console.log("Resuming...");
        sp.resume();
    }
})

const PopulateVoice = () => {
    console.log(voice)
    for (let item of voice) {
        const a = document.createElement("option")
        a.textContent = `${item.name}`
        a.setAttribute("data-lang", item.lang)
        a.setAttribute("data-name", item.name)
        select.appendChild(a)

    }
}
if (voice.length != 0) {
    PopulateVoice()
} else {
    console.log("something fishy")
}

const playText = (text, rate, pitch, selectedVoice) => {

    const utterThis = new SpeechSynthesisUtterance(text)
    utterThis.rate = rate
    utterThis.pitch = pitch
    for (let i of voice) {
        if (i.name === selectedVoice) {
            utterThis.voice = i
        }
    }
    sp.speak(utterThis)
    utterThis.addEventListener("end", () => {
        textInput.disabled = false
    })
    textInput.disabled = true


}
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formdata = new FormData(form)
    const data = [...formdata]
    playText(data[0][1], data[1][1], data[2][1], data[3][1])
    console.log(data)
    form.reset()


})
