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
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('buildingblock')
        })
    }


//moving the building blocks down 
timerId = setInterval(moveDown, 1000)

//assigning functions to keyCodes 
function control(e) {
    if(e.keyCode === 37) {
        moveleft()
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
        random = Math.floor(Math.random() * theBuildingblocks.length)
        current = theBuildingblocks[random][currentRotation]
        currentPosition = 4 
        draw()
   }
}

//move the building blocks left 
function moveleft() {
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




})