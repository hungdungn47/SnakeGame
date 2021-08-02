const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;

canvas.style.border="1px solid black";
let score = 0;
class Snake {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.direction = "none";
        this.body = [{x: this.x, y: this.y}];
    }
    drawSnake() {
        
        for(let i = 0; i < this.body.length; i++) {
            if(i == 0) ctx.fillStyle = "white";
            else ctx.fillStyle = "blue";    
            ctx.fillRect(this.body[i].x*cellSize, this.body[i].y*cellSize, cellSize, cellSize);
            console.log(this.body[i]);
        }
    }
    control() {
        document.addEventListener("keydown", (e) => {
            switch(e.key) {
                case "a":
                    if(this.direction != "right") this.direction = "left";
                    break;
                case "d":
                    if(this.direction != "left") this.direction = "right";
                    break;
                case "w":
                    if(this.direction != "down") this.direction = "up";
                    break;
                case "s":
                    if(this.direction != "up") this.direction = "down";
                    break;
                default:
                    break;
            }
        });

    }
    move() {
        let snakeX = this.body[0].x;
        let snakeY = this.body[0].y;
        switch(this.direction) {
            case "left":
                snakeX--;
                break;
            case "right":
                snakeX++;
                break;
            case "up":
                snakeY--;
                break;
            case "down":
                snakeY++;
                break;
            default:
                break;
        }
        console.log({x: snakeX, y: snakeY});
        this.body.unshift({x:snakeX, y:snakeY});
    }
    die() {
        if(this.body[0].x <= 0 || this.body[0].x >= 29 || this.body[0].y <= 3 || this.body[0].y >=29) {
            return true;
        }
        for(let i = 3; i < this.body.length; i++) {
            if(this.body[i] == this.body[0]) return true;
        }
    }
}

class Food {
    constructor(){
        this.x = 20;
        this.y = 20;
    }
    drawFood() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x*cellSize+cellSize/2, this.y*cellSize+cellSize/2, cellSize/2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}
function redrawWindow() {
    ctx.fillStyle="green";
    ctx.fillRect(0,0,600,600);
    
    ctx.fillStyle="#63f542";
    ctx.fillRect(1*cellSize, 4*cellSize, cellSize*28, cellSize*25);
    ctx.font = '30px serif';
    ctx.fillStyle = "white"
    let text = "Score: " + score;
    ctx.fillText(text, 10, 50);
}

function game () {
    redrawWindow();
    snake.drawSnake();
    food.drawFood();
    snake.control();
    snake.move();
    
    //when the snake eats the food, not pop out its tail
    if(snake.body[0].x == food.x && snake.body[0].y == food.y) {
        food.x = 1 + Math.floor(Math.random()*28);
        food.y = 4 + Math.floor(Math.random()*25);
        score += 10;
    } else {
        snake.body.pop();
    }
    if(snake.die()) {
        clearInterval(g);
        document.getElementById("lose-execute").classList.remove("hide");
        document.getElementById('retry').onclick = () => {location.reload()};
    }
}

let snake = new Snake();
let food = new Food();
let g = setInterval(game, 80);