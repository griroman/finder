var startGame = document.getElementById('startGame');
var gameField = document.getElementById('gameField');
var timer = document.getElementById('timer');
var reset = document.getElementById('restart');
var pause = false;
var timerSet;
var timeLost = 75;
var row = 6;
var column = 6;
var point = 0;

startGame.addEventListener('click', start);
gameField.addEventListener('click', work);
reset.addEventListener('click', resetGame);
 
function start() {
    startGame.style.display = 'none';
    reset.style.display = 'block';
    newTable();
    timer.innerHTML = 'Оставшееся время: ' + timeLost + ' сек.';
    timerSet = setInterval(countdown, 1000);    
}
function countdown() {
    timeLost--;
    if (timeLost > 0) {
        timer.innerHTML = 'Оставшееся время: ' + timeLost + ' сек.'; 
    } else {
        clearInterval(timerSet);
        timer.innerHTML = 'Вы проиграли...';
        pause = true;
    }
}
function work(event) {
    var cellClick = event.target;
    var check = cellClick.classList.contains('table') && !cellClick.classList.contains('push') && !pause;
    if (check){
        var input = +cellClick.innerHTML;
//        console.log(cellClick, point);
        if(input === point + 1) {
            point +=1;
            cellClick.classList.add('push');
            if (input === row*column) {
                timer.innerHTML = 'Поздравляем! Вы выиграли!';
                clearInterval(timerSet);
            }
        }
    }
}
function resetGame() {
    timeLost = 75;
    point = 0;
    clearInterval(timerSet);
    start();    
}
function newTable() {
    var numbers = getNumbers();  //нужно понять почему когда мы определяем переменную numbers во внешнем окружении переменные row и column - undefined  !
    
    var body = '';
    for (var i = 0; i < row; i++) {
        body += '<tr>';
            for (var j = 0; j < column; j++) {
                body += '<td class="table" style="' + getRandomCss() + '">' + getRandomNumber() +'</td>'
            }
        body +='</tr>';
    }
    gameField.innerHTML = body;
    function getRandomNumber() {
        var n = randomInterval(0, numbers.length -1);
        var result = numbers[n];
        numbers.splice(n, 1);
        return result;
    }
}
function getRandomCss() {
    return 'font-size:' + randomInterval(14, 40) + 'px;' + 'color:' + getRandomColor();
}

function getNumbers() { //создаем массив чисел, которые заполнят все ячейки. Его длина равна кол-ву ячеек.
    var arrNum = [];
    for (var i = 0; i < row*column; i++) {
        arrNum[i] = i + 1;
    }
    return arrNum;
}
function randomInterval(min, max) {
    return Math.round(Math.random() * (max - min) + min);
} 
function getRandomColor() {
    return 'rgb(' + randomInterval(0, 255) + ',' + 
	randomInterval(0, 255) + ',' + randomInterval(0, 255) + ')';
}