const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'img/ground (1).png'

const foodGround = new Image()
foodGround.src = 'img/food.png'

let box = 32
let score = 0

let food = {
    x: Math.floor(Math.random() * 17 + 1 ) * box,
    y: Math.floor(Math.random() * 15 + 3 ) * box
}

const snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener('keydown',  direction)

let dir
function direction (event) {
    if (event.keyCode === 37 && dir !== 'right') dir = 'left'
    else if (event.keyCode === 38 && dir !== 'down') dir = 'up'
    else if (event.keyCode === 39 && dir !== 'left') dir = 'right'
    else if (event.keyCode === 40 && dir !== 'up') dir = 'down'
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game)
            setModal()
        }
    }
}


 function setModal() {
    const div = document.createElement('div')
     const h3 = document.createElement('h3')
     const button = document.createElement('button')
     const h4 = document.createElement('h4')
     const span = document.createElement('span')


     button.setAttribute('class' , 'restart')
     h3.setAttribute('class', 'h3')
     div.setAttribute('class' , 'modal')
     h4.setAttribute('class' , 'h4')
     span.setAttribute("class", 'span')
     h3.innerText = 'Game Over!'
     span.innerText = 'Your score!'
     h4.innerHTML = score
     button.innerHTML = 'Restart'




     document.body.append(div)
     div.append(h3)
     div.append(span)
     div.append(h4)
     div.append(button)

     function restart() {
        location.reload()
     }

     button.onclick = () => restart()



     window.addEventListener('keydown' , (event) => {
         if (event.code === 'Enter') {
            restart()
         }
     })




 }

function drawGame () {
    ctx.drawImage(ground, 0 , 0)
    ctx.drawImage(foodGround , food.x , food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'red'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = 'white'
    ctx.font = '50px Arial'
    ctx.fillText(score, box * 2.5 , box * 1.7)


    let snakeX = snake[0].x
    let snakeY = snake[0].y

     if (snakeX === food.x && snakeY === food.y) {
        score++
        food = {
            x: Math.floor(Math.random() * 17 + 1 ) * box,
            y: Math.floor(Math.random() * 15 + 3 ) * box
        }
    } else {
        snake.pop()
    }
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17 ) {
        clearInterval(game)
        setModal()
    }

    if (dir === 'left') snakeX -= box
    if (dir === 'right') snakeX += box
    if (dir === 'up') snakeY -= box
    if (dir === 'down') snakeY += box

    let newHead = {
        x: snakeX,
        y :snakeY
    }
    eatTail(newHead , snake)
    snake.unshift(newHead)

}


const game = setInterval(drawGame , 100)

