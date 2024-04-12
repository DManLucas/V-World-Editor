class Yield extends Marking {
  // Constructor for the Yield class, which extends the Marking class
  constructor(center, directionVector, width, height) {
    // Call the parent constructor
    super(center, directionVector, width, height);

    // Set the border and type properties
    this.border = this.poly.segments[2];
    this.type = "yield";
  }

  // Method to draw the Yield object on a canvas
  draw(ctx) {
    // Draw the border of the Yield object
    this.border.draw(ctx, { width: 5, color: "white" });

    // Save the current context state
    ctx.save();

    // Translate and rotate the context to the center and direction of the Yield object
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(angle(this.directionVector) - Math.PI / 2);
    ctx.scale(1, 3);

    // Draw the "YIELD" text on the canvas
    ctx.beginPath();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "bold " + this.height * 0.3 + "px Arial";
    ctx.fillText("YIELD", 0, 1);

    // Restore the context state
    ctx.restore();
  }
}
