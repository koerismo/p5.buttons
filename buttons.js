function button() {
  var held = 0
  var inside = 0
  var offsetX = 0
  var offsetY = 0
  var oX = 0
  var oY = 0
  this.x = 0
  this.y = 0
  this.rootX = 0
  this.rootY = 0
  this.width = 0
  this.height = 0
  this.content = 'undefined'
  this.style = {
    'font':'sans-serif',
    'fontSize':12,
    'background':'#eee',
    'color':'#000',
    'borderRadius':5,
    'useBorder':false,
    'borderWidth':1,
    'borderColor':'#fff'
  }
  this.hoverStyle = {
    'font':'sans-serif',
    'fontSize':12,
    'background':'#27f',
    'color':'#fff',
    'borderRadius':5,
    'useBorder':false,
    'borderWidth':1,
    'borderColor':'#000'
  }
  this.activeStyle = this.style
  this.align = function(x,y) {
    offsetX = this.width/2*(x-1)
    offsetY = this.height/2*(y-1)
  }
  this.place = function(x,y,w,h) {
    this.x = x
    this.y = y
    this.width = w
    this.height = h
  }
  this.resize = function(w,h) {
    this.width = w
    this.height = h
  }
  this.reposition = function(x,y) {
    this.x = x
    this.y = y
  }
  this.mouseInside = function() {
    return (mouseX > oX && mouseX < oX+this.width && mouseY > oY && mouseY < oY+this.height)
  }
  this.onEnter = function() {}
  this.onExit = function() {}
  this.onClick = function() {}
  this.onHold = function() {}
  this.onRelease = function() {}
  this.draw = function() {
    oX = this.x+offsetX
    oY = this.y+offsetY
    if (!held && mouseIsPressed && this.mouseInside()) {this.onClick()}
    if (held && mouseIsPressed && this.mouseInside()) {this.onHold()}
    if (held && !mouseIsPressed && this.mouseInside()) {this.onRelease()}
    if (inside && !this.mouseInside()) {
      this.onExit()
      document.body.style.cursor = 'default'
      this.activeStyle = this.style
    }
    if (!inside && this.mouseInside()) {
      this.onEnter()
      document.body.style.cursor = 'pointer'
      this.activeStyle = this.hoverStyle
    }
    held = mouseIsPressed
    inside = this.mouseInside()
    
    fill(this.activeStyle.background)
    if (this.activeStyle.useBorder) {
      strokeWeight(this.activeStyle.borderWidth)
      stroke(this.activeStyle.borderColor)
    }
    else {noStroke()}
    rect(oX,oY,this.width,this.height,this.activeStyle.borderRadius)
    fill(this.activeStyle.color)
    textAlign(CENTER,CENTER)
    noStroke()
    textFont(this.activeStyle.font)
    textSize(this.activeStyle.fontSize)
    text(this.content,oX+this.width/2,oY+this.height/2)
  }
}