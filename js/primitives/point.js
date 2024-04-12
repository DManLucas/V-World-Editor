class Point {
  // Constructor for the Point class, taking in x and y coordinates
  constructor(x, y) {
    // Assigning the x and y coordinates to the object's properties
    this.x = x;
    this.y = y;
  }

  // Method to check if two points are equal
  equals(point) {
    // Returning true if the x and y coordinates of the two points are equal
    return this.x == point.x && this.y == point.y;
  }

  // Method to draw the point on a canvas
  draw(
    ctx,
    { size = 18, color = "black", outline = false, fill = false } = {}
  ) {
    // Calculating the radius based on the size
    const rad = size / 2;

    // Beginning a new path
    ctx.beginPath();

    // Setting the fill style to the specified color
    ctx.fillStyle = color;

    // Drawing an arc at the point's coordinates with the calculated radius
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);

    // Filling the arc
    ctx.fill();

    // If the outline option is true
    if (outline) {
      // Beginning a new path
      ctx.beginPath();

      // Setting the line width and stroke style
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";

      // Drawing an arc at the point's coordinates with a smaller radius
      ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);

      // Stroking the arc
      ctx.stroke();
    }

    // If the fill option is true
    if (fill) {
      // Beginning a new path
      ctx.beginPath();

      // Drawing an arc at the point's coordinates with an even smaller radius
      ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);

      // Setting the fill style to yellow
      ctx.fillStyle = "yellow";

      // Filling the arc
      ctx.fill();
    }
  }
}
