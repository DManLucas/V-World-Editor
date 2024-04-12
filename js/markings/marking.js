class Marking {
  /**
   * Constructor for the Marking class, which initializes a new marking object with the given parameters.
   * @param {Point} center - The center point of the marking.
   * @param {Point} directionVector - The direction vector of the marking.
   * @param {number} width - The width of the marking.
   * @param {number} height - The height of the marking.
   */
  constructor(center, directionVector, width, height) {
    this.center = center;
    this.directionVector = directionVector;
    this.width = width;
    this.height = height;

    /**
     * The support segment of the marking, which is used to calculate the envelope of the marking.
     * @type {Segment}
     */
    this.support = new Segment(
      translate(center, angle(directionVector), height / 2),
      translate(center, angle(directionVector), -height / 2)
    );

    /**
     * The polygon representing the envelope of the marking.
     * @type {Envelope}
     */
    this.poly = new Envelope(this.support, width, 0).poly;

    /**
     * The type of the marking.
     * @type {string}
     */
    this.type = "marking";
  }

  /**
   * Static method for loading a marking object from a given info object.
   * @param {Object} info - The info object containing the parameters for the marking.
   * @returns {Marking} The loaded marking object.
   */
  static load(info) {
    const point = new Point(info.center.x, info.center.y);
    const dir = new Point(info.directionVector.x, info.directionVector.y);
    switch (info.type) {
      case "crossing":
        return new Crossing(point, dir, info.width, info.height);
      case "light":
        return new Light(point, dir, info.width, info.height);
      case "marking":
        return new Marking(point, dir, info.width, info.height);
      case "parking":
        return new Parking(point, dir, info.width, info.height);
      case "start":
        return new Start(point, dir, info.width, info.height);
      case "stop":
        return new Stop(point, dir, info.width, info.height);
      case "target":
        return new Target(point, dir, info.width, info.height);
      case "yield":
        return new Yield(point, dir, info.width, info.height);
    }
  }

  /**
   * Method for drawing the marking on a given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the marking on.
   */
  draw(ctx) {
    this.poly.draw(ctx);
  }
}
