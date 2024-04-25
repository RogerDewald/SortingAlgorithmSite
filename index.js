const canvas = document.getElementById("drawing")
const originalWidth = canvas.width
const originalHeight = canvas.height
const ctx = canvas.getContext("2d")
let audioContext
let render = true
soundArr = [
// Octave 5
    523.25,  // C
    554.37,  // C#
    587.33,  // D
    622.25,  // D#
    659.25,  // E
    698.46,  // F
    739.99,  // F#
    783.99,  // G
    830.61,  // G#
    880.00,  // A
    932.33,  // A#
    987.77,  // B

    // Octave 6
    1046.50, // C
    1108.73, // C#
    1174.66, // D
    1244.51, // D#
    1318.51, // E
    1396.91, // F
    1479.98, // F#
    1567.98, // G
    1661.22, // G#
    1760.00, // A
    1864.66, // A#
    1975.53, // B

    // Octave 7
    2093.00, // C
    2217.46, // C#
    2349.32, // D
    2489.02, // D#
    2637.02, // E
    2793.83, // F
    2959.96, // F#
    3135.96, // G
    3322.44, // G#
    3520.00, // A
    3729.31, // A#
    3951.07, // B

    // Octave 8
    4186.01, // C
    4434.92, // C#
    4698.64, // D
    4978.03, // D#
    5274.04, // E
    5587.65, // F
    5919.91, // F#
    6271.93, // G
    6644.88, // G#
    7040.00, // A
    7458.62, // A#
    7902.13, // B

    // Octave 9
    8372.02, // C
    8869.84, // C#
    9397.27, // D
    9956.06, // D#
    10548.08,// E
    11175.30,// F
    11839.82,// F#
    12543.85,// G
    13289.75,// G#
    14080.00,// A
    14917.24,// A#
    15804.26,// B
]

colorArr =["blue","black","red"]

document.getElementById("stop-button").addEventListener("click", function(){
    render = false
})

document.getElementById("clear-button").addEventListener("click", function(){
    render = false
    clearCanvas()
})

document.getElementById("bubble-button").addEventListener("click", function(){
    audioContext = new window.AudioContext();
    render = false
    stopCanvas()
    arr = makeArray()
    bubbleSort(arr, soundArr)
})

async function stopCanvas(){
    console.log("stopped")
    await wait(100)
}

function clearCanvas(){
    ctx.clearRect(0,0,originalWidth,originalHeight)
}
function makeBlock(arr, index){
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i <arr.length; i++){
        ctx.beginPath()
        if (i == index ){
            ctx.fillStyle = colorArr[0]
        }
        else {
            ctx.fillStyle = colorArr[1]
        }
        ctx.moveTo(5 + i * blockLength,base)
        ctx.lineTo(blockLength - 2+ i * blockLength,base)
        ctx.lineTo(blockLength -2+ i * blockLength,base-1-5*arr[i])
        ctx.lineTo(5 + i * blockLength,base-5*arr[i]-1)
        ctx.fill()

        //ctx.beginPath()
        //ctx.rect(5 + i * blockLength,
        //    base,
        //    blockLength - 2+ i * blockLength,
        //    base-5*arr[i]-1
        //)
        //ctx.fill()
        //ctx.lineTo(5 + i * blockLength,base)

    }
}

function makeArray(){
    let arr = Array.from({length:30}) 
    arr = arr.map((_, index) => index);
    arr = shuffleArray(arr)
    return arr
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function bubbleSort(arr, soundArr){
    render = true
    makeBlock(arr, 0)
    for (let i = 0; i <arr.length-1; i++){
        for (let j = 0; j<arr.length-1-i; j++){
            if(render == false){
                return
            }
            if(arr[j] > arr[j+1]){
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                clearCanvas()
                makeBlock(arr, j)
                playSound(soundArr[j],10,0.01)
            }
            await wait(10)
        }
    }
    makeLastBlock(arr)
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playSound(frequency, duration, volume) {
    // Create an oscillator node
    const oscillator = audioContext.createOscillator();

    // Create a gain node
    const gainNode = audioContext.createGain();

    // Set the frequency
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // Connect the oscillator to the gain node
    oscillator.connect(gainNode);

    // Connect the gain node to the audio output
    gainNode.connect(audioContext.destination);

    // Set the volume
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after the specified duration
    setTimeout(() => {
        oscillator.stop();
    }, duration);
}

async function makeLastBlock(arr){
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i <arr.length; i++){

        ctx.beginPath()
        ctx.fillStyle = colorArr[2]
        ctx.moveTo(5 + i * blockLength,base)
        ctx.lineTo(blockLength - 2+ i * blockLength,base)
        ctx.lineTo(blockLength -2+ i * blockLength,base-1-5*arr[i])
        ctx.lineTo(5 + i * blockLength,base-5*arr[i]-1)
        ctx.fill()

        playSound(soundArr[i],20,0.01)
        await wait(20)
    }
}
