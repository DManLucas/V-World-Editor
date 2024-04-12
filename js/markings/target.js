class Target extends Marking {
  // Constructor for the Target class, which inherits from the Marking class
  constructor(center, directionVector, width, height) {
    // Call the constructor of the parent class (Marking) with the provided parameters
    super(center, directionVector, width, height);
    // Set the type property of the Target instance to "target"
    this.type = "target";
  }

  // Method to draw the Target instance on a given canvas context (ctx)
  draw(ctx) {
    // Draw a red circle with a size of 30 at the center of the Target instance
    this.center.draw(ctx, { color: "red", size: 30 });
    // Draw a white circle with a size of 20 at the center of the Target instance
    this.center.draw(ctx, { color: "white", size: 20 });
    // Draw a red circle with a size of 10 at the center of the Target instance
    this.center.draw(ctx, { color: "red", size: 10 });
  }
}
