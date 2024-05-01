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

document.getElementById("selectionSort-button").addEventListener("click", async function() {
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect())
    arr = makeArray()
    selectionSort(arr)
})

document.getElementById("insertionSort-button").addEventListener("click", async function(){
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect())
    arr = makeArray()
    insertionSort(arr)
})


