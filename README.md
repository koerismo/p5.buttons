# p5.buttons
### Table of Contents
* [Quickstart](###Quickstart)
* [List of Methods](###List-of-Methods)
* [List of Button Events](###List-of-Button-Events)
* [List of Button Variables](###List-of-Button-Variables)
* [Style Properties](###Style-Properties)
### Quickstart
```javascript
var myButton;
function setup() {
    myButton = new button()
    myButton.place(0,0,100,100) // x y width height
    myButton.content = 'My Button!'
    myButton.onClick = function() {
        alert('Button was clicked!')
    }
}
function draw() {
    myButton.draw()
}
```
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
| style | the appearance of the button |
| hoverStyle | the appearance of the button when hovered on |

### Style Properties
| Property | Description |
| - | - |
| style.color | the color of the button |
| style.background | the background color of the button |
| style.fontSize | the font size of the button text |
| style.fontFamily | the font family of the button text |
| style.border | the border on the sides of the button |
| style.borderRadius | the radius of the edge  |
