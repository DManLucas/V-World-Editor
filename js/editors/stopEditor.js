class StopEditor extends MarkingEditor {
  // The constructor for the StopEditor class, which extends the MarkingEditor class.
  // The constructor takes in two parameters: viewport and world.
  // It calls the super constructor with the viewport, world, and world.laneGuides as arguments.
  constructor(viewport, world) {
    super(viewport, world, world.laneGuides);
  }

  // This method creates a new Stop marking with the given center, directionVector, and roadWidth.
  // It returns a new Stop object with the center, directionVector, and half of the roadWidth as the left and right boundaries.
  createMarking(center, directionVector) {
    return new Stop(
      center,
      directionVector,
      world.roadWidth / 2,
      world.roadWidth / 2
    );
  }
}
