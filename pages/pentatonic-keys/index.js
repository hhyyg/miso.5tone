///<reference path="../../libs/tone.js"/>

const synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
const midiSynth = new Tone.PolySynth(16, Tone.Synth).toMaster();

fetch("/libs/magical.json")
    .then(response => response.json())
    .then(parsed => {
        for (var i = 0; i < parsed.tracks.length; i++) {
            new Tone.Part((time, note) => {
                midiSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
            }, parsed.tracks[i].notes).start();
        }
    });

const keyDuration = '16n';
const keys = [
    { id: '#des', pitch: 'Db4', duration: keyDuration }, 
    { id: '#es', pitch: 'Eb4', duration: keyDuration }, 
    { id: '#ges', pitch: 'Gb4', duration: keyDuration }, 
    { id: '#as', pitch: 'Ab4', duration: keyDuration }, 
    { id: '#b', pitch: 'Bb4', duration: keyDuration }, 

    { id: '#des5', pitch: 'Db5', duration: keyDuration }, 
    { id: '#es5', pitch: 'Eb5', duration: keyDuration }, 
    { id: '#ges5', pitch: 'Gb5', duration: keyDuration }, 
    { id: '#as5', pitch: 'Ab5', duration: keyDuration }, 
    { id: '#b5', pitch: 'Bb5', duration: keyDuration }, 

    { id: '#des6', pitch: 'Db6', duration: keyDuration }, 
    { id: '#es6', pitch: 'Eb6', duration: keyDuration }, 
    { id: '#ges6', pitch: 'Gb6', duration: keyDuration }, 
    { id: '#as6', pitch: 'Ab6', duration: keyDuration }, 
    { id: '#b6', pitch: 'Bb6', duration: keyDuration }, 
];

const supportTouch = 'ontouchend' in document;
const triggerEventNameList = [(supportTouch ? 'touchstart': 'mousedown')];

for (const key of keys) {
    for (const triggerEventName of triggerEventNameList) {
        
        document.querySelector(key.id).addEventListener(triggerEventName, () => {
            synth.triggerAttackRelease(key.pitch, key.duration);
        });
    }
    // for safari 
    document.querySelector(key.id).addEventListener('touchend', event => {
        event.preventDefault();
      }, false);
}

for (const triggerEventName of triggerEventNameList) {
    document.querySelector("#start").addEventListener(triggerEventName, () => {
        const context = new AudioContext();

        Tone.Transport.bpm.value = 120;
        Tone.Transport.toggle();
    });
}

document.onkeydown = function() {
    const keyCode = event.keyCode;

    if (keyCode === 49) {
        synth.triggerAttackRelease("C#4", "16n");
    } else if (keyCode === 50) {
        synth.triggerAttackRelease("D#4", "16n");
    } else if (keyCode === 52) {
        synth.triggerAttackRelease("F#4", "16n");
    } else if (keyCode === 53) {
        synth.triggerAttackRelease("G#4", "16n");
    } else if (keyCode === 54) {
        synth.triggerAttackRelease("A#4", "16n");
    }
}