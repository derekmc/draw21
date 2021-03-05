
window.addEventListener("load", DrawInit);

let Ui = {};
let State = {};

function Page(){
  EZ.clear();
  canvas = EZ("canvas");
  Ui.canvas = canvas({style: "position: absolute; top: 1; left: 1; border: 1px solid red;");
  EZ.append(Ui.canvas);
  Ui.ctx = Ui.canvas.getContext("2d");
  ctx.fillRect(60,60,80,20);
}

function DrawInit(){
  Page();
}