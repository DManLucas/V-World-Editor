class StartEditor extends MarkingEditor {
  // Constructor for the StartEditor class, which takes in a viewport and a world object
  constructor(viewport, world) {
    // Call the constructor of the parent class, MarkingEditor, with the provided viewport and world objects, as well as the laneGuides from the world object
    super(viewport, world, world.laneGuides);
  }

  // Method for creating a new Start marking, which takes in a center point and a direction vector
  createMarking(center, directionVector) {
    // Return a new Start object with the provided center point, direction vector, and half the road width as the inner and outer radius
    return new Start(
      center,
      directionVector,
      world.roadWidth / 2,
      world.roadWidth / 2
    );
  }
}
