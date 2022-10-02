# p5.buttons (v2)
![p5.buttons icon](https://github.com/koerismo/p5.buttons/blob/master/p5buttons.png?raw=true)

### Table of Contents
* [Quickstart](#Quickstart)
* [List of Methods](#List-of-Methods)
* [List of Button Events](#List-of-Button-Events)
* [List of Button Variables](#List-of-Button-Variables)
* [Style Properties](#Style-Properties)
### Quickstart
```js
var count = 0;
var myButton;

function setup() {
	createCanvas(windowWidth, windowHeight);
	myButton = new Button({
		x: width / 2,	y: height / 2,
		width: 100,		height: 50,
		align_x: 0,		align_y: 0,
		content: 'Clicks: 0',
		on_press() {
			count++;
			myButton.text('Clicks: ' + count);
		}
	});
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
| update | Updates any property of the button. | Button.update( properties: Object ) |
| place | Updates the button's position, and optionally the dimensions. | Button.place( x: number, y: number, width?: number, height?: number ) |
| style | Updates the button's style. | Button.style( stylename: string, properties: Object ) |
| text | Updates the button's text content. | Button.text( content: string ) |
| enable | Enables the button. | Button.enable() |
| disable | Disables the button. | Button.disable() |

### List of Button Events
| Event | Description |
| - | - |
| on_press | triggers once when the button is pressed |
| on_release | triggers when the button is released |
| on_mouse_enter | triggers once when the mouse enters the button area |
| on_mouse_exit | triggers once when the mouse leaves the button area |

### List of Button Properties
| Variable | Description |
| - | - |
| content | the text inside the button |
| enabled | determines whether the user can interact with the button |
| style_default | the appearance of the button |
| style_hover | the appearance of the button when hovered on |
| style_pressed | the appearance of the button when pressed |
| style_disabled | the appearance of the button when disabled |

### Style Properties
| Property | Description | Default |
| - | - | - |
| style.color | the text color of the button | "#111" |
| style.background | the background color of the button | "#eee" |
| style.text_size | the font size of the button text | 12 |
| style.text_font | the font family of the button text | 'sans-serif' |
| style.border_width | the width of the border. Set to zero to disable. | 0 |
| style.border_color | the color of the border | "" |
| style.border_radius | the radius in pixels to round the button | 5 |
