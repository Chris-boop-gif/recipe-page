
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// upKey
		const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

		// downKey
		const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

		// leftKey
		const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

		// rightKey
		const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		// player
		const player = new PlayerPrefab(this, 192, 220);
		this.add.existing(player);

		this.player = player;
		this.upKey = upKey;
		this.downKey = downKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {Phaser.Input.Keyboard.Key} */
	upKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	downKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKey;

	/* START-USER-CODE */

	// Write more your code here

	playerVelocity = 400;

	create() {

		this.editorCreate();
	}

	update() {
    	let moving = false;
    	const prevVelocity = { ...this.player.body.velocity };

    	// Reset velocity first
    	this.player.setVelocity(0);

    	// Handle movement
    	if (this.upKey.isDown) {
    	    this.player.setVelocityY(-this.playerVelocity);
    	    this.player.play("walk-Up-14_human_sprite_base", true);
    	    moving = true;
    	} else if (this.downKey.isDown) {
    	    this.player.setVelocityY(this.playerVelocity);
    	    this.player.play("walk-Down-14_human_sprite_base", true);
    	    moving = true;
    	}

    	if (this.leftKey.isDown) {
    	    this.player.setVelocityX(-this.playerVelocity);
    	    this.player.play("walk-Left-14_human_sprite_base", true);
    	    moving = true;
    	} else if (this.rightKey.isDown) {
    	    this.player.setVelocityX(this.playerVelocity);
    	    this.player.play("walk-Right-14_human_sprite_base", true);
    	    moving = true;
    	}

    	// Handle idle state
    	if (!moving) {
    	    const direction = this.getLastDirection(prevVelocity);
    	    this.player.play(`idle-${direction}-14_human_sprite_base`, true);
    	}
	}

	// Add this helper method to your scene
	getLastDirection(velocity) {
	    if (velocity.y < 0) return 'Up';
	    if (velocity.y > 0) return 'Down';
	    if (velocity.x < 0) return 'Left';
	    if (velocity.x > 0) return 'Right';
	    return 'Down'; // default direction
	}

		/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
