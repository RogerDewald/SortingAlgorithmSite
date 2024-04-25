const canvas = document.getElementById("drawing")
const originalWidth = canvas.width
const originalHeight = canvas.height
const ctx = canvas.getContext("2d")

document.getElementById("bubble-button").addEventListener("click", function(){
    arr = makeArray()
    bubbleSort(arr)
})


function clearCanvas(){
    ctx.clearRect(0,0,originalWidth,originalHeight)
}

function makeBlock(arr){
    const blockLength = 10;
    const base = originalHeight
    for (let i = 0; i <arr.length; i++){

        //ctx.beginPath()
        //ctx.rect(5 + i * blockLength,
        //    base,
        //    blockLength - 2+ i * blockLength,
        //    base-5*arr[i]-1
        //)
        //ctx.fill()
        ctx.beginPath()
        ctx.moveTo(5 + i * blockLength,base)
        ctx.lineTo(blockLength - 2+ i * blockLength,base)
        ctx.lineTo(blockLength -2+ i * blockLength,base-1-5*arr[i])
        ctx.lineTo(5 + i * blockLength,base-5*arr[i]-1)
        //ctx.lineTo(5 + i * blockLength,base)
        ctx.fill()

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

async function bubbleSort(arr){
    makeBlock(arr)
    for (let i = 0; i <arr.length-1; i++){
        for (let j = 0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                clearCanvas()
                await wait(50)
            }
        }
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
