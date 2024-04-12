class Envelope {
  /**
   * Constructs an Envelope instance with the given skeleton and width.
   * The roundness parameter is optional and defaults to 1.
   * @param {Segment} skeleton - The skeleton of the envelope.
   * @param {number} width - The width of the envelope.
   * @param {number} roundness - The roundness of the envelope. A higher value results in a more rounded envelope.
   */
  constructor(skeleton, width, roundness = 1) {
    if (skeleton) {
      this.skeleton = skeleton;
      this.poly = this.#generatePolygon(width, roundness);
    }
  }

  /**
   * Loads an Envelope instance from the given info object.
   * @param {Object} info - The info object containing the skeleton and polygon data.
   * @returns {Envelope} The loaded Envelope instance.
   */
  static load(info) {
    const env = new Envelope();
    env.skeleton = new Segment(info.skeleton.p1, info.skeleton.p2);
    env.poly = Polygon.load(info.poly);
    return env;
  }

  /**
   * Generates a polygon for the envelope based on the skeleton, width, and roundness.
   * @param {number} width - The width of the envelope.
   * @param {number} roundness - The roundness of the envelope. A higher value results in a more rounded envelope.
   * @returns {Polygon} The generated polygon.
   */
  #generatePolygon(width, roundness) {
    const { p1, p2 } = this.skeleton;

    const radius = width / 2;
    const alpha = angle(subtract(p1, p2));
    const alpha_cw = alpha + Math.PI / 2;
    const alpha_ccw = alpha - Math.PI / 2;

    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    const eps = step / 2;
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p1, i, radius));
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  /**
   * Draws the envelope on the given canvas context with the specified options.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {Object} options - The drawing options.
   */
  draw(ctx, options) {
    this.poly.draw(ctx, options);
  }
}
