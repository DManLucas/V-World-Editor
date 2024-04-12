class ParkingEditor extends MarkingEditor {
  // Constructor for the ParkingEditor class, which takes in a viewport and a world object
  constructor(viewport, world) {
    // Call the constructor of the superclass (MarkingEditor) with the provided viewport and world objects, as well as the laneGuides property of the world object
    super(viewport, world, world.laneGuides);
  }

  // Method for creating a new Parking object with the given center, directionVector, and roadWidth properties
  createMarking(center, directionVector) {
    // Return a new Parking object with the provided center and directionVector, as well as the roadWidth property of the world object divided by 2 (for both the left and right sides of the road)
    return new Parking(
      center,
      directionVector,
      world.roadWidth / 2,
      world.roadWidth / 2
    );
  }
}
