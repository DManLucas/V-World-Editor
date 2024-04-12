class LightEditor extends MarkingEditor {
  // Constructor for the LightEditor class, which extends the MarkingEditor class
  constructor(viewport, world) {
    // Call the parent class constructor with the provided viewport and world,
    // as well as the laneGuides property of the world object
    super(viewport, world, world.laneGuides);
  }

  // Method to create a new Light marking with the given center, directionVector,
  // and roadWidth properties
  createMarking(center, directionVector) {
    // Return a new Light object with the provided center, directionVector,
    // and roadWidth properties, which is calculated as half of the world's
    // roadWidth property
    return new Light(
      center,
      directionVector,
      world.roadWidth / 2,
      world.roadWidth / 2
    );
  }
}
