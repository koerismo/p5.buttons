# p5.buttons
![p5.buttons icon](https://github.com/koerismo/p5.buttons/blob/master/p5buttons.png?raw=true)
### Table of Contents
* [Quickstart](#Quickstart)
* [List of Methods](#List-of-Methods)
* [List of Button Events](#List-of-Button-Events)
* [List of Button Variables](#List-of-Button-Variables)
* [Style Properties](#Style-Properties)
### Quickstart
```javascript
var count = 1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  myButton = new button()
  myButton.place(width/2,height/2,100,50) 
  myButton.align(0,0)
  myButton.content = 'Clicks: 0'
  myButton.onClick = function() {myButton.content = 'Clicks: '+count;count++;}
}

function draw() {
  background(30);
  myButton.draw();
}
```
[Example](https://editor.p5js.org/Koerismo/sketches/E30URuLD5)
### List of Methods
| Method | Description | Usage |
| - | - | - |
| place | sets the position and scale of the button | place(x, y, width, height) |
| reposition | sets the position of the button | reposition(x, y) |
| resize | sets the scale of the button | resize(width, height) |
| align | sets the positional alignment of the button | align([-1,0,1], [-1,0,1]) |

### List of Button Events
| Event | Description |
| - | - |
| onClick | triggers once when the button is pressed |
| onHold | triggers constantly while the button is pressed |
| onEnter | triggers once when the mouse goes over the button |
| onExit | triggers once when the mouse leaves the button area |

### List of Button Variables
| Variable | Description |
| - | - |
| content | the text inside the button |
| disabled | determines whether the user can interact with the button |
| style | the appearance of the button |
| hoverStyle | the appearance of the button when hovered on |
| clickStyle | the appearance of the button when pressed |
| disabledStyle | the appearance of the button when disabled |

### Style Properties
| Property | Description | Default |
| - | - | - |
| style.color | the color of the button | '#000' |
| style.background | the background color of the button | '#eee' |
| style.fontSize | the font size of the button text | 12 |
| style.fontFamily | the font family of the button text | 'sans-serif' |
| style.border | the border on the sides of the button | false |
| style.borderColor | the color of the border  | '#000' |
| style.borderRadius | the radius of the edge  | 5 |
| - | - | - |
| hoverStyle.color | the color of the button | '#fff' |
| hoverStyle.background | the background color of the button | '#27f' |
| hoverStyle.fontSize | the font size of the button text | *inherit* |
| hoverStyle.fontFamily | the font family of the button text | *inherit* |
| hoverStyle.border | the border on the sides of the button | *inherit* |
| hoverStyle.borderColor | the color of the border  | *inherit* |
| hoverStyle.borderRadius | the radius of the edge  | *inherit* |
| - | - | - |
| clickStyle.color | the color of the button | '#fff' |
| clickStyle.background | the background color of the button | '#06f' |
| clickStyle.fontSize | the font size of the button text | *inherit* |
| clickStyle.fontFamily | the font family of the button text | *inherit* |
| clickStyle.border | the border on the sides of the button | *inherit* |
| clickStyle.borderColor | the color of the border  | *inherit* |
| clickStyle.borderRadius | the radius of the edge  | *inherit* |
| - | - | - |
| disabledStyle.color | the color of the button | '#aaa' |
| disabledStyle.background | the background color of the button | '#777' |
| disabledStyle.fontSize | the font size of the button text | *inherit* |
| disabledStyle.fontFamily | the font family of the button text | *inherit* |
| disabledStyle.border | the border on the sides of the button | *inherit* |
| disabledStyle.borderColor | the color of the border  | *inherit* |
| disabledStyle.borderRadius | the radius of the edge  | *inherit* |
