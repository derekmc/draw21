const EZ = (tag)=>((...proplist)=>
  (inner)=>{
    s = `<${tag}`
    proplist.forEach(props=>{
     s += props? " " + Object.keys(props).map(x=>`${x}="${props[x]}"`).join(" ") : ""})
    s += ">" + inner;
    s += `</${tag}>`
    console.log(s);
    return s;
  }   
)
EZ.style = (...styles)=>{
  let result = "";
  append = s => result += ` ${s}`;
  extract = a => a.style;
  styles.forEach(sty =>{
    switch(typeof sty){
      case "string":
        append(sty); break;
      case "object":
        append(extract(sty)); break; }
  })
  return {style: result};
}
EZ.append = (elem, parent)=>{
  if(!parent) parent = document.body;
  parent.appendChild
}
EZ.clear = (parent)=>{
  if(!parent) parent = document.body;
  parent.innerHTML = "";
}


EZ.demo = ()=> {

  red = style("color: red;")
  green = style("color: green;");
  blue = style("color: blue;");
  serif = style("font-family: serif;");
  underline = style("text-decoration: underline;");
  hint = {title: "This is a test"};

  h1 = ez('h1')(blue);
  h2 = ez('h2');
  //console.log(h1);
  let _click = {onclick: "alert('Hello ' + prompt('Name?') + '. ');"};
  document.write(
    h1("This") +
    h2(style(green, underline, serif))("Is") +
    h2(red)("A") +
    h2(blue, hint, _click)("Test...")
  )
}