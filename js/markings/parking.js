class Parking extends Marking {
  // Constructor for the Parking class, which extends the Marking class
  constructor(center, directionVector, width, height) {
    // Call the constructor of the superclass
    super(center, directionVector, width, height);

    // Initialize the borders property as an array containing the first and third segments of the polygon
    this.borders = [this.poly.segments[0], this.poly.segments[2]];

    // Initialize the type property as "parking"
    this.type = "parking";
  }

  // Method to draw the parking space on the canvas
  draw(ctx) {
    // Loop through the borders and draw each one with a width of 5 and a color of white
    for (const border of this.borders) {
      border.draw(ctx, { width: 5, color: "white" });
    }

    // Save the current context state
    ctx.save();

    // Translate the context to the center of the parking space
    ctx.translate(this.center.x, this.center.y);

    // Rotate the context by the angle of the direction vector
    ctx.rotate(angle(this.directionVector));

    // Begin a new path
    ctx.beginPath();

    // Set the text baseline and alignment, fill style, and font
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "bold " + this.height * 0.9 + "px Arial";

    // Draw the text "P" at the center of the parking space
    ctx.fillText("P", 0, 3);

    // Restore the previous context state
    ctx.restore();
  }
}
