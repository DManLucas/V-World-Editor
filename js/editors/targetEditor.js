class TargetEditor extends MarkingEditor {
  // Constructor for the TargetEditor class, which inherits from MarkingEditor
  constructor(viewport, world) {
    // Call the parent constructor with the provided viewport and world, as well as the laneGuides from the world
    super(viewport, world, world.laneGuides);
  }

  // Method to create a new Target marking with the given center, directionVector, and half the roadWidth as the inner and outer radii
  createMarking(center, directionVector) {
    // Return a new Target object with the provided center, directionVector, and half the roadWidth as the inner and outer radii
    return new Target(
      center,
      directionVector,
      world.roadWidth / 2,
      world.roadWidth / 2
    );
  }
}
