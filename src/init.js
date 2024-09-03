colorArr =["blue","black","red", "green", "orange"]

document.title = "Sorting Algorithms"
let title = document.title

window.addEventListener("blur", function(){
    document.title = "Come back ☹️"
})

window.addEventListener("focus", function(){
    document.title = title
})

let globalCurrentAlgorithm = ""
