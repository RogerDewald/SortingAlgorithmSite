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
