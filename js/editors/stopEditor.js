class StopEditor extends MarkingEditor {
  constructor(viewport, world) {
    super(viewport, world, world.laneGuides);
  }

  createMarking(center, directionVector) {
    return new Stop(
      center,
      directionVector,
      world.roadWith / 2,
      world.roadWith / 2
    );
  }
}