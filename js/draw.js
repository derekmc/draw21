
window.addEventListener("load", Init);

const INPUTSPERSECOND = 10;
const INPUTDELAY = 1000/INPUTSPERSECOND;
const DRAWPERSECOND = 10;
const DRAWDELAY = 1000/DRAWPERSECOND;

const Ui = {};
const State = {
  LastDraw: 0,
  NextDraw: 0,
  LastInput: 0,
  Points: [], // flat array, [x0, y0, x1, y1, ...]
  MousePressed: false,
};

function Page(){
  EZ.clear();
  EZ.append(
    EZ("canvas")(
      {id: 'outcanvas', style: "position: absolute; top: 0; left: 0; border: none;"})());
  Ui.canvas = EZ.get('outcanvas');
  Ui.ctx = Ui.canvas.getContext("2d");
  Resize();
  Draw();
  // I am sufficiently tired.
  window.addEventListener("mousemove", MouseMove);
  window.addEventListener("mousedown", MouseDown);
  window.addEventListener("mouseup", MouseUp);
}

function Resize(){
  Ui.canvas.width = window.innerWidth;
  Ui.canvas.height = window.innerHeight;
}

function MouseMove(evt){
  let x = evt.clientX;
  let y = evt.clientY;
  //if(!State.MousePressed) return;

  let now = Date.now();
  if(now - State.LastInput < INPUTDELAY){
    return; }

  let p = State.Points;

  p.push(x);
  p.push(y);
  Draw();
}
function MouseDown(){
  State.MousePressed = true;
}

function MouseUp(){
  State.MousePressed = false;
}

function Draw(){
  let now = Date.now();
  let early = DRAWDELAY - (now - State.LastDraw);
  if(early > 0 && now > State.NextDraw){ //ensure it gets called.
    setTimeout(Draw, early);
    State.NextDraw = now + early;
    return;
  }
  let p = State.Points;
  let c = Ui.ctx;

  c.fillRect(0, 0, Ui.canvas.width, Ui.canvas.height);
  c.clearRect(4, 4, Ui.canvas.width-8, Ui.canvas.height-8);
  //Ui.ctx.clearRect(0, 0, Ui.canvas.width, Ui.canvas.height);
  for(let i=0; i + 1 < p.length; i += 2){
    let x = p[i];
    let y = p[i+1];
    c.fillRect(x-3, y-3, 5, 5);
  }
    
  Ui.ctx.fillRect(Ui.canvas.width/2-10, Ui.canvas.height/2-10, 20, 20); 
}

function Init(){
  Page();
  window.addEventListener('resize', Resize);
}