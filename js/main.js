
let board = document.querySelector(".board");
let button = document.querySelector(".reset");
let info = document.querySelector(".info");
let NewArr = Array(9).fill(0);
let step = 1;

// Створення ігрового поля
const createBoard = () => {
    board.innerHTML = ''; // Очищуємо поле перед створенням
    NewArr.forEach((_, index) => {
        let div = document.createElement("div");
        div.setAttribute("data-n", index);
        board.append(div);
    });
};

// Логіка натискання
function click(event) {
    const target = event.target;
    const t = target.getAttribute("data-n");
    if (t === null || NewArr[t] !== 0) return;

    NewArr[t] = step;
    draw();
    checkWin(step);

    step = step === 1 ? 2 : 1; // Зміна ходу
}

// Відображення ходу
function draw() {
    const cells = document.querySelectorAll(".board > div");
    NewArr.forEach((item, index) => {
        if (item === 1) cells[index].innerHTML = `<img src="images/cross.png">`;
        else if (item === 2) cells[index].innerHTML = `<img src="images/circle.png">`;
        else cells[index].innerHTML = '';
    });
}

// Перевірка перемоги
function checkWin(currentStep) {
    const winnerPatterns = ["012", "345", "678", "036", "147", "258", "048", "246"];
    const playerIndexes = NewArr.map((item, index) => (item === currentStep ? index : null)).filter(i => i !== null);

    for (let pattern of winnerPatterns) {
        const isWin = pattern.split("").every(num => playerIndexes.includes(+num));
        if (isWin) {
            showWin(currentStep);
            return;
        }
    }

    if (!NewArr.includes(0)) DrawWin(); // Нічия
}

// Показ переможця
function showWin(step) {
    board.removeEventListener(eventType, click);
    info.innerHTML = "Переможець: " + (step === 1 ? `<img src="images/cross.png">` : `<img src="images/circle.png">`);
}

// Показ нічиї
function DrawWin() {
    board.removeEventListener(eventType, click);
    info.textContent = "Нічия!";
}

// Скидання гри
button.onclick = function () {
    NewArr.fill(0);
    step = 1;
    info.textContent = '';
    createBoard();
    board.addEventListener(eventType, click);
};

// Адаптація для мобільних пристроїв
const eventType = 'ontouchstart' in window ? 'touchstart' : 'click';
board.addEventListener(eventType, click);

// Ініціалізація гри
createBoard();

const buttons = document.querySelectorAll(".rules__button");
buttons.forEach((button) => {
    button.onclick = () => {
        const rules = button.closest(".rules");
        if (rules) {
            rules.style.display = "none";
        }
    };
});

document.querySelector(".game__button").onclick=()=>{
    document.querySelector(".other__game").style.display="none";
    document.querySelector(".menu__head").style.display="flex";
}
document.querySelector(".menu__open").onclick=()=>{
    document.querySelector(".other__game").style.display="flex";
    document.querySelector(".menu__head").style.display="none";
}
document.querySelector(".start_game-memory").addEventListener("click",function(){
    this.style.display="none";
    document.querySelector(".restart-button").style.display="block";
    let arr=[1,2,3,4,5,6,7,8,9,10,11,12];
arr=arr.sort((a,b) =>0.5-Math.random());
console.log(arr);

let x=3;
let y=2;
let stepM=1;
let error=0;

function fieldInit(){
    for (let i=0; i<3;i++){
        for(let k=0;k<4;k++){
            let div=document.createElement('div');
            div.textContent=arr[i*4+k];
            document.querySelector('.gamefield').append(div)
            if(i===2 && k===3){
                div.classList.add('active');
            }
        }
    }
    setTimeout(function(){
        blocks.forEach(x=>{
            x.textContent="";
        })
        document.addEventListener('keydown',pressKey);
    },7000)
}
fieldInit();
const blocks=document.querySelectorAll('.gamefield>div');
let inforM=document.querySelector(".info__memory")
const keys=['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter'];
function pressKey(event){
    if(event.key==="r" || event.key==="R"){
        location.reload();
    }
    if(!keys.includes(event.key) && event.key!=" ") return;
    blocks[y*4+x].classList.remove('active');
    switch(event.key){
        case keys[0]:
            y+1===3?y=0:y++;
            break;
        case keys[1]:
            y-1>=0?y--:y=2;
            break;
        case keys[3]:
            x+1===4?x=0:x++;
            break;
        case keys[2]:
            x-1>=0?x--:x=3;
            break;
        case keys[4]:
        case " ":
            if(blocks[y*4+x].textContent==="" && stepM===arr[y*4+x]){
                blocks[y*4+x].textContent=arr[y*4+x];
                stepM++;
            }
            else{
                inforM.innerHTML="Error:"+`${error+1}`;
                error++;
            }
            break;
    }
    blocks[y*4+x].classList.add('active');
    if(error===3){
        inforM.innerHTML="You lose :(";
    }
    if(stepM===13){
        inforM.innerHTML="You Win!)"
    }
}
})
document.querySelector(".restart-button").onclick=function(){
    location.reload();
}



