// variables defined for game
let game_level = 0
let mouse_clicks = -1
let computer_colors = []
let your_colors = []
let display_colors = []

// helper functions to use throughout the program
const FINDID = id => document.getElementById(id);
const FINDQSA = selector => document.querySelectorAll(selector);
// max level: can be changed to any value
const MAXLEVEL = 2023


// function to register clicks
function clickColors(color) {

     // gets id of a color click
     const COLORID = FINDID(color.id)

     // attached a handler to register click events
     COLORID.addEventListener('click', (event) => {

          // tracks id of color clicked
          color = event.target.id

          // records pattern 
          checkPattern(color)
     })
}


// lights up color with audio option
function lightUp(color, include_audio = true) {

     // species how fast it blinks
     let timer_speed = 500
     
     // color opacity to blink; 10, 25, 50 or 75
     let amount = 50

     // where opacity is formated
     let color_opacity = `bg-opacity-${amount}`

     // gets mp3 file from the audio folder
     let color_sounds = new Audio(`audio/${color}.mp3`)


     // plays audio of the lighted up color
     if (include_audio === true) color_sounds.play()


     // toggles the opacity of the color chosen (color) arg
     showsColor: setTimeout(
          () => FINDID(color).classList.toggle(color_opacity),

          timer_speed
     )
     
     // toggles the opacity again but faster, to hide color
     hidesColor: setTimeout(
          () => FINDID(color).classList.toggle(color_opacity),

          timer_speed / 2
     )
}


// checks if color in the pattern
function checkPattern(color) {

     // post increments
     mouse_clicks++

     // adds your color into the array
     your_colors.push(Number(color))

     // blinks the chosen color
     lightUp(color)

     // your clicks gets compared to computer color clicks
     if (Number(color) === computer_colors[mouse_clicks]) {

          // if both lengths matches, to avoid bugs
          if (your_colors.length === computer_colors.length) {

               // empties your colors
               your_colors = []

               // resets mouse clicks
               mouse_clicks = -1

               // pre increment level; increases level
               FINDID('level').innerHTML = `Level: ${++game_level}/${MAXLEVEL}`

               // increases pattern
               increasePattern(color)
          }

     } else {

          // if the length matches
          if (your_colors.length === computer_colors.length) {

               // allow game to be restarted
               FINDID('level').innerHTML = `Game Over`
               FINDID('start').style.pointerEvents = 'auto'

          } else {

               // allows restart when lengths do not match
               FINDID('level').innerHTML = `Game Over`
               FINDID('start').style.pointerEvents = 'auto'
               FINDID('p1').style.pointerEvents = 'none'
               FINDID('p2').style.pointerEvents = 'none'

          }

     }
}

// increaes pattern of simon according to level
function increasePattern(color, pattern_speed = 800) {

     // local variable i means interate
     let i = 0
     
     // list of colors -> [green, red, yellow, blue]
     let colors = [0, 1, 2, 3]

     // formats the level with maxlevel
     FINDID('level').innerHTML = `Level: ${game_level}/${MAXLEVEL}`

     // if the game level is not maxed out
     if (game_level !== MAXLEVEL) {

          // this is where pattern gets increased
          let next = setInterval(() => {

               // generates random number
               color = colors[Math.floor(Math.random() * colors.length)]

               // makes computer colors
               computer_colors.push(color)

               // avoids an extra push to computer colors
               // copies array into another array
               display_colors = [...computer_colors]

               // computer colors cannot exceed game level
               if (computer_colors.length > game_level) {

                    // shows each value from computer colors
                    let show_increased_pattern = setInterval(

                         // anonymous to avoid named functions
                         () => {

                              // replays values in this array
                              lightUp(display_colors[i++])

                              // for too many values shown
                              if (i > game_level) {
                                   
                                   // initialize i
                                   i = 0

                                   // clear the interval with its id
                                   clearInterval(show_increased_pattern)
                              }
                         
                              // speed to show each color
                         }, pattern_speed)

                    // stops increasing pattern
                    clearInterval(next)
               }

               // pauses before continuing to the next level
          }, pattern_speed / 2)

     } else {

          // allows start button to be clicked
          FINDID('start').style.pointerEvents = "auto"

     }
}

// starts game
function gameStarter() {

     // when game is being played
     if (game_level >= 0) {

          // initializes global variables
          game_level = 0
          mouse_clicks = -1
          your_colors = []
          display_colors = []
          computer_colors = []

          // resets to default pointerEvents
          FINDID('start').style.pointerEvents = "none"
          FINDID('p1').style.pointerEvents = 'auto'
          FINDID('p2').style.pointerEvents = 'auto'

          // formats game level here
          FINDID('level').innerHTML = `Level: ${game_level}/${MAXLEVEL}`
     }

     // if level is initialized; increase pattern
     if (game_level === 0) increasePattern()

}

// handler to click start button
FINDID('start').addEventListener('click', gameStarter)

// stops both sides from being clicked
FINDID('p1').style.pointerEvents = 'none'
FINDID('p2').style.pointerEvents = 'none'


// applies each function to html tags with the block className
FINDQSA('div.block').forEach(clickColors)