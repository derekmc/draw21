
window.addEventListener("load", Init);

const INPUTSPERSECOND = 13;
const INPUTDELAY = 1000/INPUTSPERSECOND;
const DRAWPERSECOND = 10;
const DRAWDELAY = 1000/DRAWPERSECOND;
const CLOSERADIUS = 10;

const Ui = {};
const State = {
  LastDraw: 0,
  NextDraw: 0,
  LastInput: 0,
  Points: [], // flat array, [x0, y0, x1, y1, ...]
  MousePressed: false,
  PolygonStart: false,
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
  if(State.MousePressed === false) return;

  if( State.MousePressed > 0 &&
      State.Points.length - State.MousePressed >=4 &&
      State.Points[State.MousePressed-2] != null ){
    State.Points.splice(State.MousePressed, 0, null, null);
    Draw(); }

  let now = Date.now();
  if(now - State.LastInput < INPUTDELAY){
    return; }
  State.LastInput = now;

  let p = State.Points;

  p.push(x);
  p.push(y);
  Draw();
}
function MouseDown(evt){
  State.MousePressed = State.Points.length;
  MouseMove(evt);
}
  
function MouseUp(evt){
  // draw lines by pressing one point at a time.
  if(State.MousePressed === false) return; // this shouldn't happen, but if mouse pressed index isnt registered, we dont know what to do.
  if(State.Points.length - State.MousePressed > 2){
    MouseMove(evt);
    // disconnect start of curve from any line.
    State.PolygonStart = false;
    State.Points.push(null);
    State.Points.push(null); }
  else if(State.PolygonStart === false){
    State.PolygonStart = State.MousePressed; }
  else{ // check polygon closure
    let dx = State.Points[State.PolygonStart] - State.Points[State.MousePressed];
    let dy = State.Points[State.PolygonStart + 1] - State.Points[State.MousePressed + 1];
    //console.log(dx, dy);
    let close = dx * dx + dy * dy < CLOSERADIUS * CLOSERADIUS;
    if(close){
       //State.Points.length -= 2;
       State.Points[State.Points.length-2] = State.Points[State.PolygonStart];
       State.Points[State.Points.length-1] = State.Points[State.PolygonStart + 1];
       State.Points.push(null);
       State.Points.push(null);
       State.PolygonStart = false;
       Draw();
    }
  }

  //console.log(State.Points);
  //console.log(State.PolygonStart);
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
  State.LastDraw = now;
  let p = State.Points;
  let c = Ui.ctx;

  c.lineWidth= 1.8;
  c.lineJoin = "round";
  c.lineCap = "round";
  c.fillRect(0, 0, Ui.canvas.width, Ui.canvas.height);
  c.clearRect(4, 4, Ui.canvas.width-8, Ui.canvas.height-8);
  //Ui.ctx.clearRect(0, 0, Ui.canvas.width, Ui.canvas.height);
  c.beginPath();
  let move = true;
  for(let i=0; i + 1 < p.length; i += 2){
    let x = p[i];
    let y = p[i+1];
    c.fillRect(x-1, y-1, 2, 2);
    if(x == null){
      move = true;
      continue; }
      
    if(move){ c.moveTo(x, y); move = false; }
    else c.lineTo(x,y);
  }
  c.stroke();
    
  Ui.ctx.fillRect(Ui.canvas.width/2-10, Ui.canvas.height/2-10, 20, 20); 
}

function Init(){
  Page();
  window.addEventListener('resize', Resize);
}