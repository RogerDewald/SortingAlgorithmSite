const canvas = document.getElementById("drawing")
const originalWidth = canvas.width
const originalHeight = canvas.height
const ctx = canvas.getContext("2d")
let audioContext
let render = true

function clearCanvas() {
    ctx.clearRect(0, 0, originalWidth, originalHeight)
}

function makeBlock(arr, index) {
    clearCanvas()
    if (index == -1) {
        index = 0
    }
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath()
        if (i == index) {
            ctx.fillStyle = colorArr[0]
        }
        else {
            ctx.fillStyle = colorArr[1]
        }
        ctx.moveTo(5 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base - 1 - 5 * arr[i])
        ctx.lineTo(5 + i * blockLength, base - 5 * arr[i] - 1)
        ctx.fill()
    }
    playSound(soundArr[index], 10, 0.01)
}

function clearColumn(index) {
    const blockLength = 10;
    const base = originalHeight
    ctx.clearRect(5 + index * blockLength, 0, 3, base)
}

function makeColumn(arr, index, color) {
    clearColumn(index);
    const blockLength = 10;
    const base = originalHeight
    if (index == -1) {
        index = 0
    }
    ctx.beginPath()
    ctx.fillStyle = colorArr[color]
    ctx.moveTo(5 + index * blockLength, base)
    ctx.lineTo(blockLength - 2 + index * blockLength, base)
    ctx.lineTo(blockLength - 2 + index * blockLength, base - 1 - 5 * arr[index])
    ctx.lineTo(5 + index * blockLength, base - 5 * arr[index] - 1)
    ctx.fill()

    if (color == 0) {
        playSound(soundArr[index], 10, 0.01)
    }
    //await wait(speedSelect())
    //console.log("yo")
}

function makeArray() {
    let arr = Array.from({ length: 30 })
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

async function bubbleSort(arr) {
    render = true
    makeBlock(arr, 0)
    let oldJ = 0
    let oldSwap = 0
    let swapped = 0
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (render == false) {
                return
            }

            if (arr[j] > arr[j + 1]) {

                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp

                makeColumn(arr, oldSwap, 1)
                makeColumn(arr, oldJ, 1)
                makeColumn(arr, swapped, 1)

                makeColumn(arr, j + 1, 0)
                makeColumn(arr, j, 3)
                await wait(speedSelect())
                swapped = j + 1
                oldSwap = j
                oldJ = j + 1
            }
            else {
                if (oldJ != oldSwap) {
                    makeColumn(arr, oldJ, 1)
                    makeColumn(arr, swapped, 1)

                    makeColumn(arr, j + 1, 0)
                    await wait(speedSelect())
                    oldJ = j + 1
                }

            }
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

async function makeLastBlock(arr) {
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i < arr.length; i++) {

        ctx.beginPath()
        ctx.fillStyle = colorArr[2]
        ctx.moveTo(5 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base - 1 - 5 * arr[i])
        ctx.lineTo(5 + i * blockLength, base - 5 * arr[i] - 1)
        ctx.fill()

        playSound(soundArr[i], 20, 0.01)
        await wait(speedSelect())
    }
}

function speedSelect() {
    let speed = document.getElementById("speed-select").value
    if (speed == 1) {
        return 500
    }
    if (speed == 2) {
        return 30
    }
    if (speed == 3) {
        return 10
    }
}

async function selectionSort(arr) {
    render = true
    makeBlock(arr, 0)
    let oldJ = 0
    let oldI = 0
    let oldMin = 0
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (render == false) {
                return
            }
            if (oldJ != minIndex) {
                makeColumn(arr, oldJ, 1)
            }
            makeColumn(arr, j, 0)
            await wait(speedSelect())
            oldJ = j

            makeColumn(arr, j, 1)
            if (arr[j] < arr[minIndex]) {
                makeColumn(arr, oldMin, 1)
                minIndex = j;
                makeColumn(arr, minIndex, 4)
                await wait(speedSelect())
                oldMin = minIndex
            }
        }
        if (minIndex !== i) {
            // Swap elements
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            makeColumn(arr, oldI, 1)
            makeColumn(arr, minIndex, 1)
            makeColumn(arr, i, 3)
            await wait(speedSelect())
            oldI = i
        }
    }
    makeBlock(arr, 0)
    makeLastBlock(arr)
}

async function insertionSort(arr) {
    render = true
    makeBlock(arr, 0)
    oldShifted = []
    oldJ1 = 0
    oldI = 0

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        makeColumn(arr, oldI, 1)
        makeColumn(arr, i, 4)
        oldI = i
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            if (render == false) {
                return
            }
            arr[j + 1] = arr[j];
            j--;


            makeColumn(arr, j + 1, 0)
            await wait(speedSelect())
            oldShifted.push(parseInt(j + 1))

        }
        for (let index = arr.length - 1; index > 0; index--) {
            makeColumn(arr, index, 1)
        }

        arr[j + 1] = key;
        makeColumn(arr, oldJ1, 1)
        makeColumn(arr, j + 1, 3)
        await wait(speedSelect())
        oldJ1 = j + 1
    }
    makeBlock(arr, 0)
    makeLastBlock(arr)
}

async function mergeSort(arr) {
    render = true;
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.ceil(arr.length / 2);
    const left = arr.slice(0, middle)
    const right = arr.slice(middle, arr.length);
    const mergedLeft = await mergeSort(left)
    const mergedRight = await mergeSort(right)

    let promise = await merge(structuredClone(mergedLeft), structuredClone(mergedRight))
    //if (promise.length == 30) {
    //    makeBlockWithObjs(promise, 1)
    //    makeLastBlockWithObjs(promise)
    //}
    return structuredClone(promise)
}

async function merge(leftarr, rightarr) {
    if (render == false) {
        return
    }
    left = structuredClone(leftarr)
    right = structuredClone(rightarr)
    let positionArr = []

    for (let i = 0; i < left.length; i++) {
        positionArr.push(left[i].pos)
    }
    for (let j = 0; j < right.length; j++) {
        positionArr.push(right[j].pos)
    }
    //console.log(positionArr)
    //console.log(left)
    //console.log(right)


    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let posIndex = 0

    while (leftIndex < left.length && rightIndex < right.length) {
        console.log(posIndex)
        if (left[leftIndex].height < right[rightIndex].height) {
            await wait(speedSelect())
            left[leftIndex].pos = positionArr[posIndex]
            result.push(left[leftIndex])
            makeColumnWithObjs(left[leftIndex], 0)
            posIndex++;
            leftIndex++;
        } else {
            await wait(speedSelect())
            right[rightIndex].pos = positionArr[posIndex]
            result.push(right[rightIndex])
            makeColumnWithObjs(right[rightIndex], 0)
            posIndex++
            rightIndex++;
        }
    }
    while (leftIndex < left.length) {
        await wait(speedSelect())
        left[leftIndex].pos = positionArr[posIndex]
        result.push(left[leftIndex])
        makeColumnWithObjs(left[leftIndex], 0)
        leftIndex++;
        posIndex++
    }

    // Copy the remaining elements of R[], if there are any
    while (rightIndex < right.length) {
        await wait(speedSelect())
        right[rightIndex].pos = positionArr[posIndex]
        result.push(right[rightIndex])
        makeColumnWithObjs(right[rightIndex], 0)
        rightIndex++;
        posIndex++
    }

    if (result.length < 30) {
        result.forEach((element) => {
            makeColumnWithObjs(element, 4)
        })
    }
    return structuredClone(result)
}

class ArrayObj {
    constructor(position, objheight) {
        this.pos = position
        this.height = objheight
    }
}

function makeArrayObjs() {
    let arr = Array.from({ length: 30 })
    arr = arr.map((_, index) => index);
    arr = shuffleArray(arr)
    let returnArray = []
    for (let i = 0; i < arr.length; i++) {
        let temp = new ArrayObj(i, arr[i])
        returnArray.push(temp)
    }
    return returnArray
}

function makeBlockWithObjs(arr, index) {
    clearCanvas()
    if (index == -1) {
        index = 0
    }
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath()
        if (i == index) {
            ctx.fillStyle = colorArr[0]
        }
        else {
            ctx.fillStyle = colorArr[1]
        }
        ctx.moveTo(5 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base - 1 - 5 * arr[i].height)
        ctx.lineTo(5 + i * blockLength, base - 5 * arr[i].height - 1)
        ctx.fill()
    }
    playSound(soundArr[index], 10, 0.01)
}

function makeColumnWithObjs(obj, color) {
    clearColumn(obj.pos);
    let position = obj.pos
    const blockLength = 10;
    const base = originalHeight
    if (position == -1) {
        position = 0
    }
    ctx.beginPath()
    ctx.fillStyle = colorArr[color]
    ctx.moveTo(5 + position * blockLength, base)
    ctx.lineTo(blockLength - 2 + position * blockLength, base)
    ctx.lineTo(blockLength - 2 + position * blockLength, base - 1 - 5 * obj.height)
    ctx.lineTo(5 + position * blockLength, base - 5 * obj.height - 1)
    ctx.fill()

    if (color == 0) {
        playSound(soundArr[position], 10, 0.01)
    }
    //await wait(speedSelect())
    //console.log("yo")
}

async function makeLastBlockWithObjs(arr) {
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i < arr.length; i++) {

        ctx.beginPath()
        ctx.fillStyle = colorArr[2]
        ctx.moveTo(5 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base)
        ctx.lineTo(blockLength - 2 + i * blockLength, base - 1 - 5 * arr[i].height)
        ctx.lineTo(5 + i * blockLength, base - 5 * arr[i].height - 1)
        ctx.fill()

        playSound(soundArr[i], 20, 0.01)
        await wait(speedSelect())
    }
}
