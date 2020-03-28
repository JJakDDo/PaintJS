const canvas = document.getElementById("jsCanvas");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const ctx = canvas.getContext("2d");

//canvas 사용하려면 그릴 사이즈를 줘야함 CSS와는 별개로
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);   
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function stopPainting(){
    painting = false;    
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);    
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    
    canvas.addEventListener("click", function(){
        if(filling){
            ctx.fillRect(0, 0, canvas.width, canvas.height);            
        }
    });
    
    canvas.addEventListener("contextmenu", function(event){
        event.preventDefault();
    });
}

//붓 색깔 바꾸기
colors.forEach(color => color.addEventListener("click", function(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}));

//붓 굵기 바꾸기
if(range){
    range.addEventListener("input", function(event){
        const size = event.target.value; 
        ctx.lineWidth = size;                  
    });
}

if(mode){
    mode.addEventListener("click", function(){
        if(filling){
            filling = false;
            mode.innerText = "Fill";
        } else{
            filling = true;
            mode.innerText = "Paint";            
        }
    });
}

if(saveBtn){
    saveBtn.addEventListener("click", function(){
        const img = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = img;
        link.download = "PaintJS";
        link.click();
    });
}