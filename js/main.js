// Init speechSynth API
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// var isFirefox = typeof InstallTrigger !== 'undefined';

// // Chrome 1+
// var isChrome = !!window.chrome && !!window.chrome.webstore;

// init voices list
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // console.log(voices)
  // loop through voices and create an option for each

  voices.forEach((voice) => {
    // Create an option element
    const option = document.createElement("option");
    // Fill the option with voice
    option.textContent = voice.name + "(" + voice.lang + ")";

    if (voice.default) {
      option.textContent += " --DEFAULT";
    }

    // set needed option attribute
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// if (isFirefox) {
//     getVoices();
// }
// if (isChrome) {
//     if (synth.onvoiceschanged !== undefined) {
//         synth.onvoiceschanged = getVoices;
//     }
// }

// Speak

const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error("Already Speaking");
    return;
  }

  if (textInput.value != "") {
    // Add background animation
    body.style.background = "#141414 url(../img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    // get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = (e) => {
      console.log("Done Speaking......");
      body.style.background = "#141414";
    };

    // Speak Error
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    // Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // Speak
    synth.speak(speakText);
  }
};

// event listners
// text form submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());
