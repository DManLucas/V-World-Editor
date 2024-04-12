class Building {
  // Constructor for the Building class, which takes a polygon and an optional height parameter
  constructor(poly, height = 200) {
    // Assigns the base and height properties of the Building object
    this.base = poly;
    this.height = height;
  }

  // Static method for loading a Building object from an info object
  static load(info) {
    // Returns a new Building object with the base loaded from the info object and the height set to the value in the info object
    return new Building(Polygon.load(info.base), info.height);
  }

  // Method for drawing the Building object on a canvas context
  draw(ctx, viewPoint) {
    // Calculates the top points of the building by mapping the base points to 3D points using the getFake3DPoint function
    const topPoints = this.base.points.map((p) =>
      getFake3dPoint(p, viewPoint, this.height * 0.6)
    );
    // Creates a new Polygon object for the ceiling using the top points
    const ceiling = new Polygon(topPoints);

    // Initializes an empty array for the sides of the building
    const sides = [];
    // Loops through the base points and calculates the sides of the building
    for (let i = 0; i < this.base.points.length; i++) {
      // Calculates the index of the next point in the base polygon
      const nextI = (i + 1) % this.base.points.length;
      // Creates a new Polygon object for the side using the current and next base points and the corresponding top points
      const poly = new Polygon([
        this.base.points[i],
        this.base.points[nextI],
        topPoints[nextI],
        topPoints[i],
      ]);
      // Adds the side to the sides array
      sides.push(poly);
    }
    // Sorts the sides array based on the distance of each side to the view point
    sides.sort(
      (a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
    );

    // Calculates the midpoints of the base polygon
    const baseMidpoints = [
      average(this.base.points[0], this.base.points[1]),
      average(this.base.points[2], this.base.points[3]),
    ];

    // Calculates the 3D points for the top midpoints
    const topMidpoints = baseMidpoints.map((p) =>
      getFake3dPoint(p, viewPoint, this.height)
    );

    // Initializes an empty array for the roof polygons
    const roofPolys = [];
    // Creates two new Polygon objects for the roof using the top midpoints and the ceiling points
    roofPolys.push(
      new Polygon([
        ceiling.points[0],
        ceiling.points[3],
        topMidpoints[1],
        topMidpoints[0],
      ])
    );
    roofPolys.push(
      new Polygon([
        ceiling.points[2],
        ceiling.points[1],
        topMidpoints[0],
        topMidpoints[1],
      ])
    );
    // Sorts the roof polygons based on the distance of each polygon to the view point
    roofPolys.sort(
      (a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
    );

    // Draws the base polygon on the canvas context
    this.base.draw(ctx, {
      fill: "white",
      stroke: "rgba(0,0,0,0.2)",
      lineWidth: 20,
    });
    // Loops through the sides array and draws each side on the canvas context
    for (const side of sides) {
      side.draw(ctx, { fill: "white", stroke: "#AAA" });
    }
    // Draws the ceiling on the canvas context
    ceiling.draw(ctx, { fill: "white", stroke: "white", lineWidth: 6 });
    // Loops through the roof polygons array and draws each polygon on the canvas context
    for (const poly of roofPolys) {
      poly.draw(ctx, {
        fill: "#D44",
        stroke: "#C44",
        lineWidth: 8,
        join: "round",
      });
    }
  }
}
