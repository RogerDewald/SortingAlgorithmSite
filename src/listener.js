document.getElementById("stop-button").addEventListener("click", function() {
    render = false
})

document.getElementById("clear-button").addEventListener("click", async function() {
    render = false
    await wait(speedSelect() + 5)
    clearCanvas()
})

document.getElementById("bubble-button").addEventListener("click", async function() {
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect() + 5)
    arr = makeArray()
    bubbleSort(arr)
})

document.getElementById("selectionSort-button").addEventListener("click", async function() {
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect() + 5)
    arr = makeArray()
    selectionSort(arr)
})

document.getElementById("insertionSort-button").addEventListener("click", async function() {
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect() + 5)
    arr = makeArray()
    insertionSort(arr)
})

document.getElementById("mergeSort-button").addEventListener("click", async function(){
    audioContext = new window.AudioContext()
    render = false
    arr = makeArrayObjs()
    await wait(speedSelect() + 5)
    makeBlockWithObjs(arr, 1)
    console.log(arr)
    mergeSort(arr, arr)

})


