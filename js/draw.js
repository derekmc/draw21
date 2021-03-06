
window.addEventListener("load", Init);

let Ui = {};
let State = {};

function Page(){
  EZ.clear();
  EZ.append(
    EZ("canvas")(
      {id: 'outcanvas', style: "position: absolute; top: 0; left: 0; border: none;"})());
  Ui.canvas = EZ.get('outcanvas');
  Ui.ctx = Ui.canvas.getContext("2d");
  Resize();
  Draw();
}
function Resize(){
  Ui.canvas.width = window.innerWidth;
  Ui.canvas.height = window.innerHeight;
}

function Draw(){
  Ui.ctx.clearRect(0, 0, Ui.canvas.width, Ui.canvas.height);
  Ui.ctx.fillRect(0, 0, Ui.canvas.width, Ui.canvas.height);
  Ui.ctx.clearRect(4, 4, Ui.canvas.width-8, Ui.canvas.height-8);
  Ui.ctx.fillRect(30,40,50,60); 
}

function Init(){
  Page();
  window.addEventListener('resize', Resize);
}