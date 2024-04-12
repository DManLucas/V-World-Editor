class Crossing extends Marking {
  // Constructor for the Crossing class, which takes a center point, a direction vector, a width, and a height
  constructor(center, directionVector, width, height) {
    // Calls the constructor of the parent class (Marking) with the same parameters
    super(center, directionVector, width, height);

    // Initializes the borders property as an array containing the first and third segments of the polygon
    this.borders = [this.poly.segments[0], this.poly.segments[2]];
    // Sets the type property to "crossing"
    this.type = "crossing";
  }

  // Method for drawing the Crossing object on a canvas context
  draw(ctx) {
    // Calculates the perpendicular vector to the direction vector
    const perp = perpendicular(this.directionVector);
    // Calculates the line segment for the crossing using the center point, the perpendicular vector, and the width
    const line = new Segment(
      add(this.center, scale(perp, this.width / 2)),
      add(this.center, scale(perp, -this.width / 2))
    );
    // Draws the line segment on the canvas context with the specified style
    line.draw(ctx, {
      width: this.height,
      color: "white",
      dash: [11, 11],
    });
  }
}
