const canvas = document.getElementById("drawing")
const originalWidth = canvas.width
const originalHeight = canvas.height
const ctx = canvas.getContext("2d")
let audioContext
let render = true

document.getElementById("stop-button").addEventListener("click", function(){
    render = false
})

document.getElementById("clear-button").addEventListener("click", function(){
    render = false
    clearCanvas()
})

document.getElementById("bubble-button").addEventListener("click", async function(){
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect())
    arr = makeArray()
    bubbleSort(arr)
})

function clearCanvas(){
    ctx.clearRect(0,0,originalWidth,originalHeight)
}

function makeBlock(arr, index){
    clearCanvas()
    if (index == -1){
        index = 0
    }
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
    }
    playSound(soundArr[index],10,0.01)
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

async function bubbleSort(arr){
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
            }
            makeBlock(arr, j)
            await wait(speedSelect())
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
        await wait(speedSelect())
    }
}

document.getElementById("linker").addEventListener("click", function(){
    window.location.href="https://rogerdewald.github.io/DailybreadAirtableDB/"
})

function speedSelect(){
    let speed = document.getElementById("speed-select").value
    if (speed == 1){
        return 100
    }
    if (speed == 2){
        return 30
    }
    if (speed == 3){
        return 10
    }
}

async function selectionSort(arr) {
    render = true
    makeBlock(arr, 0)

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if(render == false){
                return
            }
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            makeBlock(arr, j)
            await wait(speedSelect())
        }
        if (minIndex !== i) {
            // Swap elements
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    makeBlock(arr, 0)
    await wait(speedSelect())

    makeLastBlock(arr)
}

document.getElementById("selectionSort-button").addEventListener("click", async function() {
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect())
    arr = makeArray()
    selectionSort(arr)
})

async function insertionSort(arr) {
    render = true
    makeBlock(arr, 0)

    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            if(render == false){
                return
            }
            arr[j + 1] = arr[j];
            j--;

            makeBlock(arr, j)
            await wait(speedSelect())
        }
        arr[j + 1] = key;
    }
    makeBlock(arr, 0)
    makeLastBlock(arr)
}

document.getElementById("insertionSort-button").addEventListener("click", async function(){
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect())
    arr = makeArray()
    insertionSort(arr)
})

