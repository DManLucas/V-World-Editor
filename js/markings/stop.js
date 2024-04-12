class Stop extends Marking {
  // Constructor for the Stop class, which inherits from the Marking class
  constructor(center, directionVector, width, height) {
    super(center, directionVector, width, height);

    // Set the border property to the third segment of the poly property's segments array
    this.border = this.poly.segments[2];
    // Set the type property to "stop"
    this.type = "stop";
  }

  // Method to draw the Stop object on a canvas context
  draw(ctx) {
    // Draw the border of the Stop object with a width of 5 and a color of "white"
    this.border.draw(ctx, { width: 5, color: "white" });
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(angle(this.directionVector) - Math.PI / 2);
    ctx.scale(1, 3);

    ctx.beginPath();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "bold " + this.height * 0.3 + "px Arial";
    ctx.fillText("STOP", 0, 1);

    ctx.restore();
  }
}
