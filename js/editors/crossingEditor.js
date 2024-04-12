// Define the CrossingEditor class, which extends the MarkingEditor class
class CrossingEditor extends MarkingEditor {
  // The constructor takes two arguments: viewport and world
  constructor(viewport, world) {
    // Call the constructor of the MarkingEditor class, passing in the viewport, world, and world.graph.segments as arguments
    super(viewport, world, world.graph.segments);
  }

  // The createMarking method takes two arguments: center and directionVector
  createMarking(center, directionVector) {
    // Return a new Crossing object, which is constructed with the center, directionVector, world.roadWidth, and world.roadWidth / 2 arguments
    return new Crossing(
      center,
      directionVector,
      world.roadWidth,
      world.roadWidth / 2
    );
  }
}
