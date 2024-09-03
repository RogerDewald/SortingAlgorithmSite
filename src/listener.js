document.getElementById("stop-button").addEventListener("click", function() {
    render = false
})

document.getElementById("clear-button").addEventListener("click", async function() {
    render = false
    await wait(speedSelect() + 5)
    clearCanvas()
})

document.getElementById("size-select").addEventListener("change", function() {
    returnval = globalCurrentAlgorithm + "()"
    eval(returnval)
})

document.getElementById("bubble-button").addEventListener("click", bubblesortButton)
document.getElementById("selectionSort-button").addEventListener("click", selectionsortButton)
document.getElementById("insertionSort-button").addEventListener("click", insertionsortButton)
document.getElementById("mergeSort-button").addEventListener("click", mergesortButton)
document.getElementById("quicksort-button").addEventListener("click", quicksortButton)
document.getElementById("heapsort-button").addEventListener("click", heapsortButton)

async function bubblesortButton() {
    globalCurrentAlgorithm = "bubblesortButton"
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect() + 5)
    arr = makeArray()
    bubbleSort(arr)
}
async function selectionsortButton() {
    globalCurrentAlgorithm = "selectionsortButton"
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect() + 5)
    arr = makeArray()
    selectionSort(arr)
}
async function insertionsortButton() {
    globalCurrentAlgorithm = "insertionsortButton"
    audioContext = new window.AudioContext();
    render = false
    await wait(speedSelect() + 5)
    arr = makeArray()
    insertionSort(arr)
}
async function mergesortButton() {
    globalCurrentAlgorithm = "mergesortButton"
    audioContext = new window.AudioContext()
    render = false
    arr = makeArrayObjs()
    await wait(speedSelect() + 5)
    makeBlockWithObjs(arr, 1)
    mergeSort(arr, arr)

}
async function quicksortButton() {
    globalCurrentAlgorithm = "quicksortButton"
    audioContext = new window.AudioContext()
    render = false
    arr = makeArray()
    await wait(speedSelect() + 5)
    makeBlock(arr, 1)
    render = true
    await quicksort(arr)
}
async function heapsortButton() {
    globalCurrentAlgorithm = "heapsortButton"
    audioContext = new window.AudioContext()
    render = false
    sizeSelect()
    arr = makeArray()
    await wait(speedSelect() + 5)
    makeBlock(arr, 1)
    render = true
    await heapSort(arr)
}

