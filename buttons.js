function button() {
	var inheritDict = function(user,standin) {
	  return Object.assign(standin,user)
	}
	var held=0,inside=0,offsetX=0,offsetY=0,oX=0,oY=0;
	this.x = 0
	this.disabled = false
	this.y = 0
	this.width = 0
	this.height = 0
	this.content = 'undefined'
	var style = {
	  'font':'sans-serif',
	  'fontSize':12,
	  'background':'#eee',
	  'color':'#000',
	  'borderRadius':5,
	  'useBorder':false,
	  'borderWidth':1,
	  'borderColor':'#fff'
	}
	this.style = {
	}
	this.hoverStyle = {
	  'background':'#27f',
	  'color':'#fff'
	}
	this.clickStyle = {
	  'background':'#06f',
	  'color':'#fff'
	}
	this.disabledStyle = {
	  'background':'#777',
	  'color':'#aaa'
	}
	var activeStyle
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
	  if (activeStyle == undefined) {activeStyle = inheritDict(this.style,style)}
	  oX = this.x+offsetX
	  oY = this.y+offsetY
	  if (!this.disabled) {
		if (!held && mouseIsPressed && this.mouseInside()) {
		  this.onClick()
		  activeStyle = inheritDict(this.clickStyle,inheritDict(this.style,style))
		}
		if (held && this.mouseInside()) {
		  if (mouseIsPressed) {this.onHold()}
		  else {
			this.onRelease()
			activeStyle = inheritDict(this.hoverStyle,inheritDict(this.style,style))
		  }
		}
		if (inside && !this.mouseInside()) {
		  this.onExit()
		  activeStyle = inheritDict(this.style,style)
		  document.body.style.cursor = 'default'
		}
		if (!inside && this.mouseInside()) {
		  this.onEnter()
		  activeStyle = inheritDict(this.hoverStyle,inheritDict(this.style,style))
		  document.body.style.cursor = 'pointer'
		}
	  }
	  held = mouseIsPressed
	  inside = this.mouseInside()
	  if (this.disabled) {activeStyle = inheritDict(this.disabledStyle,style)}
	  fill(activeStyle.background)
	  if (activeStyle.useBorder) {
		strokeWeight(activeStyle.borderWidth)
		stroke(activeStyle.borderColor)
	  }
	  else {noStroke()}
	  rect(oX,oY,this.width,this.height,activeStyle.borderRadius)
	  fill(activeStyle.color)
	  textAlign(CENTER,CENTER)
	  noStroke()
	  textFont(activeStyle.font)
	  textSize(activeStyle.fontSize)
	  text(this.content,oX+this.width/2,oY+this.height/2)
	}
  }
  