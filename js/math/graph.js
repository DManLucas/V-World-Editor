class Graph {
  // Constructor initializes the graph with given points and segments
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  // Static method to load graph information and create a new Graph instance
  static load(info) {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.p1)),
          points.find((p) => p.equals(i.p2))
        )
    );
    return new Graph(points, segments);
  }

  // Hash function to stringify the graph object
  hash() {
    return JSON.stringify(this);
  }

  // Add a point to the graph
  addPoint(point) {
    this.points.push(point);
  }

  // Check if the graph contains a specific point
  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  // Try to add a point to the graph, returning true if successful, false otherwise
  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // Remove a point from the graph and its associated segments
  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  // Add a segment to the graph
  addSegment(seg) {
    this.segments.push(seg);
  }

  // Check if the graph contains a specific segment
  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  // Try to add a segment to the graph, returning true if successful, false otherwise
  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  // Remove a segment from the graph
  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  // Get all segments in the graph that include a specific point
  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  // Dispose the graph by clearing its points and segments
  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  // Draw the graph on a given canvas context
  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
