class Light extends Marking {
  // Constructor for the Light class, which extends the Marking class
  constructor(center, directionVector, width, height) {
    // Call the constructor of the parent class (Marking) with the provided parameters
    super(center, directionVector, width, 18);

    // Initialize the state of the light as "off"
    this.state = "off";

    // Get the first segment of the polygon (border) and assign it to the border property
    this.border = this.poly.segments[0];

    // Set the type of the object to "light"
    this.type = "light";
  }

  // Method to draw the light on the canvas
  draw(ctx) {
    // Calculate the perpendicular vector of the direction vector
    const perp = perpendicular(this.directionVector);

    // Create a new segment (line) with the center of the light as the starting point,
    // and the perpendicular vector scaled by half the width of the light as the end point
    const line = new Segment(
      add(this.center, scale(perp, this.width / 2)),
      add(this.center, scale(perp, -this.width / 2))
    );

    // Calculate the green, yellow, and red points on the line based on the width of the light
    const green = lerp2D(line.p1, line.p2, 0.2);
    const yellow = lerp2D(line.p1, line.p2, 0.5);
    const red = lerp2D(line.p1, line.p2, 0.8);

    // Draw the red-green segment with a round cap and the height of the light
    new Segment(red, green).draw(ctx, {
      width: this.height,
      cap: "round",
    });

    // Draw the green, yellow, and red points with a size of 60% of the height of the light
    green.draw(ctx, { size: this.height * 0.6, color: "#060" });
    yellow.draw(ctx, { size: this.height * 0.6, color: "#660" });
    red.draw(ctx, { size: this.height * 0.6, color: "#600" });

    // Switch statement to change the color of the light based on its state
    switch (this.state) {
      case "green":
        green.draw(ctx, { size: this.height * 0.6, color: "#0F0" });
        break;
      case "yellow":
        yellow.draw(ctx, { size: this.height * 0.6, color: "#FF0" });
        break;
      case "red":
        red.draw(ctx, { size: this.height * 0.6, color: "#F00" });
        break;
    }
  }
}
