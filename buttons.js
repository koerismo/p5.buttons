const STYLE_DEFAULT = {
	background: '#eee',
	color: '#111',
	border_color: '',
	border_width: 0,
	border_radius: 5,

	text_font: 'sans-serif',
	text_size: 12,
}

const STYLE_HOVER = {
	background: '#ccc',
	color: '#111',
}

const STYLE_PRESSED = {
	background: '#aaa',
	color: '#000',
}

const STYLE_DISABLED = {
	background: '#777',
	color: '#333',
}

class Button {

	#was_pressed = false;
	#was_hovering = false;

	#props = { };
	#bounds = { minx: null, miny: null, maxx: null, maxy: null, centerx: null, centery: null };
	#cstyles = { default: STYLE_DEFAULT, hover: STYLE_HOVER, pressed: STYLE_PRESSED, disabled: STYLE_DISABLED };

	constructor(properties) {
		this.#props = Object.assign({
			content: '',
			x: null, y: null,
			w: null, h: null,
			width: null,
			height: null,

			style_default: STYLE_DEFAULT,
			style_hover: STYLE_HOVER,
			style_pressed: STYLE_PRESSED,
			style_disabled: STYLE_DISABLED,

			on_mouse_enter: null,
			on_mouse_exit: null,
			on_press: null,
			on_release: null,

			align_x: -1,
			align_y: -1,

			enabled: true,
		}, properties);

		if ( this.#props.x === null || this.#props.y === null || this.#props.width === null ||  this.#props.height === null )
			throw( '"x", "y", "width", and "height" must all be defined in the button properties!' );

		Object.seal(this.#props);
		this.#calculateStyles();
		this.#calculateBounds();
	}

	#calculateBounds() {
		const offset_x = (this.#props.align_x-1)*this.#props.width/2,
		      offset_y = (this.#props.align_y-1)*this.#props.height/2;
		
		this.#bounds.minx = this.#props.x + offset_x,
		this.#bounds.miny = this.#props.y + offset_y,
		this.#bounds.maxx = this.#props.x + this.#props.width + offset_x,
		this.#bounds.maxy = this.#props.y + this.#props.height + offset_y,
		this.#bounds.centerx = this.#props.x + this.#props.width/2 + offset_x,
		this.#bounds.centery = this.#props.y + this.#props.height/2 + offset_y;
	}

	#calculateStyles() {
		this.#cstyles.default	= Object.assign({}, STYLE_DEFAULT, this.#props.style_default);
		this.#cstyles.hover		= Object.assign({}, STYLE_DEFAULT, this.#props.style_default, this.#props.style_hover);
		this.#cstyles.pressed	= Object.assign({}, STYLE_DEFAULT, this.#props.style_default, this.#props.style_pressed);
		this.#cstyles.disabled	= Object.assign({}, STYLE_DEFAULT, this.#props.style_default, this.#props.style_disabled);
	}

	update(properties) {
		try {
			Object.assign(this.#props, properties); 
		} catch(e) {console.warn( `Encountered an unrecognized property! Original error: ${e.message}` )}
		
		if ( 'x' in properties || 'y' in properties || 'width' in properties || 'height' in properties || 'align_x' in properties || 'align_y' in properties ) 
			this.#calculateBounds();
		
		if ( 'style_default' in properties || 'style_hover' in properties || 'style_pressed' in properties || 'style_disabled' in properties )
			this.#calculateStyles();
	}

	/** Shorthand for .update({ x: <value>, y: <value>, ... }) */
	place( x, y, width=null, height=null ) {
		this.#props.x = x,
		this.#props.y = y;
		if ( width !== null ) this.#props.width = width;
		if ( height !== null ) this.#props.height = height;
		this.#calculateBounds();
	}

	/** Shorthand for .update({ style_<stylename>: <value> }) */
	style( stylename, style ) {
		if (!( 'style_'+stylename in this.#props ))
			throw( `Style name must be either "default", "hover", "pressed", or "disabled". Received "${stylename}" instead.` );
	
		this.#props['style_'+stylename] = style;
		this.#calculateStyles();
	}

	/** Shorthand for .update({ content: <value> }) */
	text( content ) { this.#props.content = content }

	/** Shorthand for .update({ enabled: true }) */
	enable() { this.#props.enabled = true }
	
	/** Shorthand for .update({ enabled: false }) */
	disable() { this.#props.enabled = false }

	/**
	 * Returns whether the specified point (by default the mouse's position) is hovering over the button.
	 * @param {number} x (optional) x override.
	 * @param {number} y (optional) y override.
	 * @returns {boolean}
	 */
	isHovering(x=mouseX, y=mouseY) {
		return x > this.#bounds.minx && x < this.#bounds.maxx && y > this.#bounds.miny && y < this.#bounds.maxy;
	}

	/**
	 * Returns whether the button is currently being pressed.
	 * @returns {boolean}
	 */
	isPressed() {
		return this.isHovering() && mouseIsPressed;
	}

	#getCurrentStyle( hovering, pressed ) {
		if ( !this.#props.enabled ) return this.#cstyles.disabled;
		if ( pressed ) return this.#cstyles.pressed;
		if ( hovering ) return this.#cstyles.hover;
		return this.#cstyles.default; 
	}

	/**
	 * Draws the button on the specified canvas, or the global canvas by default.
	 * @param context (optional) The p5 canvas to draw to.
	 */
	draw( context=globalThis ) {
		const is_hovering = this.isHovering();
		const is_pressed = mouseIsPressed && (is_hovering || this.#was_pressed);
		const style = this.#getCurrentStyle( is_hovering, is_pressed );
		if ( style.background )		context.fill( style.background );
		else						context.noFill();
		

		if ( style.border_color && style.border_radius ) {
			context.stroke( style.border_color );
			context.strokeWeight( style.border_width );
		} else context.noStroke();

		context.rect( this.#bounds.minx, this.#bounds.miny, this.#props.width, this.#props.height, style.border_radius );
		
		noStroke();
		context.fill( style.color );
		context.textAlign( CENTER, CENTER );
		context.textSize( style.text_size );
		context.textFont( style.text_font );
		context.text( this.#props.content, this.#bounds.centerx, this.#bounds.centery );
	
		if ( !this.#was_pressed && is_pressed && this.#props.on_press ) this.#props.on_press();
		if ( this.#was_pressed && !is_pressed && this.#props.on_release ) this.#props.on_release();
		if ( !this.#was_hovering && is_hovering && this.#props.on_mouse_enter ) this.#props.on_mouse_enter();
		if ( this.#was_hovering && !is_hovering && this.#props.on_mouse_exit ) this.#props.on_mouse_exit();
		
		this.#was_pressed = is_pressed;
		this.#was_hovering = is_hovering;
	}
}