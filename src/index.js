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

async function makeColumn(arr, index, color) {
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
    await wait(speedSelect())
    console.log("yo")
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

//function mergeSort(arr, constArr) {
//    render = true;
//    if (arr.length <= 1) {
//        return arr;
//    }
//
//    const middle = Math.floor(arr.length / 2);
//    const left = arr.slice(0, middle);
//    const right = arr.slice(middle);
//    let mergedLeft = mergeSort(mergeSort(left, constArr))
//    let mergedRight = mergeSort(mergeSort(right, constArr))
//
//
//    let answer = merge(mergedLeft, mergedRight, constArr);
//    console.log(answer)
//    return answer
//
//}
//
//function merge(left, right, constArr) {
//    if (render == false) {
//        return
//    }
//
//    let result = [];
//    let leftIndex = 0;
//    let rightIndex = 0;
//
//    while (leftIndex < left.length && rightIndex < right.length) {
//        if (left[leftIndex] < right[rightIndex]) {
//            result.push(left[leftIndex]);
//            makeColumn(constArr, parseInt(left[leftIndex]), 0)
//            leftIndex++;
//        } else {
//            result.push(right[rightIndex]);
//            makeColumn(constArr, parseInt(right[rightIndex]), 0)
//            rightIndex++;
//        }
//    }
//
//    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
//}
