class YieldEditor extends MarkingEditor {
  // Constructor for the YieldEditor class, which extends the MarkingEditor class
  // and takes in a viewport and world as arguments.
  constructor(viewport, world) {
    // Call the constructor of the superclass with the given viewport and world,
    // as well as the laneGuides property of the world object.
    super(viewport, world, world.laneGuides);
  }

  // Method for creating a new Yield marking with the given center, directionVector,
  // and roadWidth properties.
  createMarking(center, directionVector) {
    // Return a new Yield object with the given center, directionVector,
    // and roadWidth properties, which is calculated as half of the world's
    // roadWidth property.
    return new Yield(
      center,
      directionVector,
      world.roadWidth / 2,
      world.roadWidth / 2
    );
  }
}
