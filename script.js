const clock=document.getElementById("clock");
let date = new Date()
console.log(date.toLocaleTimeString());

setInterval(function(){
    let date = new Date()
    // console.log(date.toLocaleTimeString());
    clock.innerHTML= date.toLocaleTimeString()
}, 1000)
const localdate=document.getElementById("date");
localdate.innerHTML=date.toDateString();

// need to understand how to format dates...



//code for timer
const alarmSoundSelect = document.getElementById('alarm-sound-select');
const inputHours = document.getElementById('timer-hours');
const inputMinutes = document.getElementById('timer-minutes');
const inputSeconds = document.getElementById('timer-seconds');
const timerInputs = document.getElementById('timer-inputs');
const timerCountdown = document.getElementById('timer-countdown');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');

let totalSeconds = 0;
let intervalId = null;
let isPaused = false;


let selectedAlarmSound = 'beep'; // Default sound
const alarmSounds = {
    'beep': {
        name: 'Simple Beep',
        // Function to create a Tone.js instrument
        tone: () => new Tone.Synth().toDestination(),
        // Function to play the sound using the created instrument
        play: (player) => {
            player.triggerAttackRelease("C5", "8n"); // Play a C5 note for 1/8th of a second
        }
    },
    'chime': {
        name: 'Gentle Chime',
        tone: () => new Tone.PolySynth().toDestination(),
        play: (player) => {
            player.triggerAttackRelease(["C4", "E4", "G4"], "4n"); // Play a C major chord
        }
    },
    'bell': {
        name: 'Desk Bell',
        tone: () => new Tone.MembraneSynth().toDestination(),
        play: (player) => {
            player.triggerAttackRelease("C3", "8n"); // Play a low C note for bell effect
        }
    },
    'alarm': {
        name: 'Classic Alarm',
        tone: () => new Tone.Synth().toDestination(),
        play: (player) => {
            player.triggerAttackRelease("C4", "8n");
            player.triggerAttackRelease("E4", "8n", "+0.2");
            player.triggerAttackRelease("G4", "8n", "+0.4");
        }
    }
};

function initializeAlarmSoundSelection() {
    // Populate the dropdown with options
    for (const key in alarmSounds) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = alarmSounds[key].name;
        alarmSoundSelect.appendChild(option);

        // Initialize each Tone.js player and store it
        initializedTonePlayers[key] = alarmSounds[key].tone();
    }
    // Set the default selected sound in the dropdown
    alarmSoundSelect.value = selectedAlarmSound;
}

// Call this function when the window loads
window.addEventListener('load', initializeAlarmSoundSelection);

const initializedTonePlayers = {}; // Object to store initialized Tone.js players

alarmSoundSelect.addEventListener('change', (event) => {
    selectedAlarmSound = event.target.value;
});

function formatTime(secs){
    const h  = String(Math.floor(secs/3600)).padStart(2,'0');
    const m = String(Math.floor((secs%3600)/60)).padStart(2,'0');
    const s = String(secs%60).padStart(2,'0');
    return `${h}:${m}:${s}`;
}

function showInputs(){
    timerCountdown.style.display = 'none';
    timerInputs.style.display = '';
    pauseBtn.disabled = true;
}
function showCountDown(){
    timerCountdown.style.display = '';
    timerInputs.style.display = 'none';
    pauseBtn.disabled = false;
}
startBtn.addEventListener('click', async() => {
  // Read and validate input
  const hours = parseInt(inputHours.value, 10) || 0;
  const minutes = parseInt(inputMinutes.value, 10) || 0;
  const seconds = parseInt(inputSeconds.value, 10) || 0;
  totalSeconds = hours * 3600 + minutes * 60 + seconds;
    console.log(totalSeconds);
  if (totalSeconds <= 0) {
    alert('Please enter a valid time.');
    return;

  }
  await Tone.start();
  
  showCountDown();
  console.log(totalSeconds);
  timerCountdown.textContent = formatTime(totalSeconds);
  

  if (intervalId) {clearInterval(intervalId);}
  isPaused = false;

  inputHours.disabled = true;
  inputMinutes.disabled = true;
  inputSeconds.disabled = true;
  alarmSoundSelect.disabled = true;

  intervalId= setInterval(()=>{
    if (!isPaused && totalSeconds>0){
        totalSeconds--;
        timerCountdown.textContent = formatTime(totalSeconds);
        if (totalSeconds==0){
            clearInterval(intervalId);
            pauseBtn.disabled=true;
            const player = initializedTonePlayers[selectedAlarmSound];
            const playFunction = alarmSounds[selectedAlarmSound].play;
            if (player && playFunction) {
                playFunction(player);
            }
            console.log("TIME'S UP!!")
            inputHours.disabled = false;
            inputMinutes.disabled = false;
            inputSeconds.disabled = false;
            alarmSoundSelect.disabled = false;
        }
    }
  },1000);

  startBtn.disabled = true;
  pauseBtn.disabled= false;
});

pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  isPaused = false;
  pauseBtn.textContent = 'Pause';
  inputHours.value = '';
  inputMinutes.value = '';
  inputSeconds.value = '';
  showInputs();
  timerCountdown.textContent = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  inputHours.disabled = false;
  inputMinutes.disabled = false;
  inputSeconds.disabled = false;
  alarmSoundSelect.disabled = false;
});

// Chatbot Initializations
const chatbox = document.getElementById('chatbox');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Utility to add messages to the chatbox
function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = marked.parse(text);
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function callGemini(message) {
  addMessage('user', message);
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=ENTER_YOUR_GEMINI_API_KEY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: message }
            ]
          }
        ]
      })
    });
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that.";
    addMessage('bot', reply);
  } catch (error) {
    addMessage('bot', "Error connecting to assistant.");
  }
}


// Handle send button and 'Enter' key
sendBtn.addEventListener('click', () => {
  if (chatInput.value.trim() !== '') {
    callGemini(chatInput.value.trim());
    chatInput.value = '';
  }
});
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});
