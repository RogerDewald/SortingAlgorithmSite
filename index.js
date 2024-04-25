const canvas = document.getElementById("drawing")
const originalWidth = canvas.width
const originalHeight = canvas.height
const ctx = canvas.getContext("2d")

let arr = Array.from({length:20}) 
arr = arr.map((_, index) => index);
arr = shuffleArray(arr)
//makeBlock(arr)
//render()
bubbleSort(arr)


function clearCanvas(){
    ctx.clearRect(0,0,originalWidth,originalHeight)
}
function makeBlock(arr){
    for (let i = 0; i <arr.length; i++){
        let blockLength = 10;
        let base = canvas.height
    
        ctx.beginPath()
        ctx.moveTo(5 + i * blockLength,base)
        ctx.lineTo(blockLength - 2+ i * blockLength,base)
        ctx.lineTo(blockLength -2+ i * blockLength,base-1-5*arr[i])
        ctx.lineTo(5 + i * blockLength,base-5*arr[i]-1)
        //ctx.lineTo(5 + i * blockLength,base)
        ctx.fill()

    }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function render() {
    let dimensions = getObjectFitSize(
        true,
        canvas.clientWidth,
        canvas.clientHeight,
        canvas.width,
        canvas.height
    );
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const c = canvas.getContext("2d")
    let ratio = Math.min(
        canvas.clientWidth / originalWidth,
        canvas.clientHeight / originalHeight
    );
    c.scale(ratio, ratio); //adjust this!
    c.beginPath();
    c.moveTo(0,100)
    c.lineTo(5,100)
    c.lineTo(5,0)
    c.lineTo(0,0)
    c.lineTo(0,100)
    c.stroke()
}


function getObjectFitSize(
  contains /* true = contain, false = cover */,
  containerWidth,
  containerHeight,
  width,
  height
) {
  var doRatio = width / height;
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}

async function bubbleSort(arr){
    makeBlock(arr)
    for (let i = 0; i <arr.length; i++){
        for (let j = 0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                console.log(arr)
            }
            clearCanvas()
            makeBlock(arr)
            await wait(50)
        }
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
