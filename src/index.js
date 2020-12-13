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

    draw()
})