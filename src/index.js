document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10 
    let nextRandom = 0 
    let timerId
    let score = 0 
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    //The Blocks 

    const lBuildingblock = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    const zBuildingblock = [
        [0,width,width+1,width*2+1],
        [width+1, width+2, width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]

    ]

    const tBuildingblock = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oBuildingblock = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iBuildingblock = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]
    const theBuildingblocks = [lBuildingblock, zBuildingblock, tBuildingblock, oBuildingblock, iBuildingblock]

    let currentPosition = 4 
    let currentRotation = 0 
   

    // random selection of building block 
    let random = Math.floor(Math.random()*theBuildingblocks.length)
  
    let current = theBuildingblocks[random][0]

    //drawing the building block
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('buildingblock')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('buildingblock')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }


//moving the building blocks down 
// timerId = setInterval(moveDown, 1000)

//assigning functions to keyCodes 
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    }
}
document.addEventListener('keyup', control)

// move down function 
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

//freeze function to stop the building blocks on page
function freeze() {
   if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //starting anew building block fall
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theBuildingblocks.length)
        current = theBuildingblocks[random][currentRotation]
        currentPosition = 4 
        draw()
        displayShape()
        addScore()
        gameOver()
   }
}

//move the building blocks left 
function moveLeft() {
    undraw() 
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width ===0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
    }
    draw()
}

//move the buildingblocks right unless the its on the edge or space is taken
function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1 
    }
    draw()
}

///fix rotation of the buildingblocks at the edge
function isAtRight() {
    return current.some(index=> (currentPosition + index +1) % width ===0)
}
function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
}

function checkRotatedPosition(P){
    P = P || currentPosition 
    if ((P+1) % width <4) {
        if (isARight()){
            currentPosition += 1 
            checkRotatedPosition(P)
        }
    }
    else if (P % width > 5) {
        if (isAtLeft()){
            currentPosition -=1
            checkedRotatedPosition(P)
        }
    }
}

//rotate the buildingblocks
function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theBuildingblocks[random][currentRotation]
    draw()
}

//show up-next buildingblocks in mini-grid display  
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0 


//the buildingblocks without rotations
const UpNextBuildingblocks = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1,displayWidth+1, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
]
//display the shape in the mini-grid    
function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('buildingblock')
        square.style.backgroundColor = ''
    })
    UpNextBuildingblocks[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('buildingblock')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]

    })
}

//adding start and pause button 
startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null 
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theBuildingblocks.length)
        displayShape()
    }
})

//add score to the game 
function addScore() {
    for (let i=0; i<199; i+=width) {
     const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]   

     if(row.every(index => squares[index].classList.contains('taken'))) {
         score +=10
         scoreDisplay.innerHTML = score 
         row.forEach(index => {
             squares[index].classList.remove('taken')
             squares[index].classList.remove('buildingblock')
             squares[index].style.backgroundColor = ''
         })
         const squaresRemoved = squares.splice(i, width)
         squares = squaresRemoved.concat(squares)
         squares.forEach(cell => grid.appendChild(cell))
        }
    } 
}

//game over     
function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTMl = 'end'
        clearInterval(timerId)
    }
}


})