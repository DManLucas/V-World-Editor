class Tree {
  // Constructor for the Tree class, initializing the center, size, and height properties
  constructor(center, size, height = 200) {
    this.center = center;
    this.size = size; // size of the base
    this.height = height;
    this.base = this.#generateLevel(center, size); // generates the base of the tree
  }

  // Generates a level of the tree by creating an array of points and returning a new Polygon object
  #generateLevel(point, size) {
    const points = [];
    const rad = size / 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      const kindOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2;
      const noisyRadius = rad * lerp(0.5, 1, kindOfRandom);
      points.push(translate(point, a, noisyRadius));
    }
    return new Polygon(points);
  }

  // Draws the tree using the provided canvas context and viewpoint
  draw(ctx, viewPoint) {
    const top = getFake3dPoint(this.center, viewPoint, this.height);

    const levelCount = 7;
    for (let level = 0; level < levelCount; level++) {
      const t = level / (levelCount - 1);
      const point = lerp2D(this.center, top, t);
      const color = "rgb(30," + lerp(50, 200, t) + ",70)";
      const size = lerp(this.size, 40, t);
      const poly = this.#generateLevel(point, size);
      poly.draw(ctx, { fill: color, stroke: "rgba(0,0,0,0)" });
    }
  }
}
