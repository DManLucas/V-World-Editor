/**
 * Represents a line segment defined by two points (p1 and p2).
 */
class Segment {
  /**
   * Creates a new Segment instance.
   * @param {Point} p1 - The first point of the segment.
   * @param {Point} p2 - The second point of the segment.
   */
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * Calculates the length of the segment.
   * @return {number} The length of the segment.
   */
  length() {
    return distance(this.p1, this.p2);
  }

  /**
   * Calculates the direction vector of the segment.
   * @return {Point} The direction vector of the segment.
   */
  directionVector() {
    return normalize(subtract(this.p2, this.p1));
  }

  /**
   * Checks if the given segment is equal to this segment.
   * @param {Segment} seg - The segment to compare.
   * @return {boolean} True if the segments are equal, false otherwise.
   */
  equals(seg) {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  /**
   * Checks if the given point is included in the segment.
   * @param {Point} point - The point to check.
   * @return {boolean} True if the point is included, false otherwise.
   */
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  /**
   * Calculates the distance from the given point to the segment.
   * @param {Point} point - The point to calculate the distance from.
   * @return {number} The distance from the point to the segment.
   */
  distanceToPoint(point) {
    const proj = this.projectPoint(point);
    if (proj.offset > 0 && proj.offset < 1) {
      return distance(point, proj.point);
    }
    const distToP1 = distance(point, this.p1);
    const distToP2 = distance(point, this.p2);
    return Math.min(distToP1, distToP2);
  }

  /**
   * Projects the given point onto the segment.
   * @param {Point} point - The point to project.
   * @return {Object} An object containing the projected point and the offset.
   */
  projectPoint(point) {
    const a = subtract(point, this.p1);
    const b = subtract(this.p2, this.p1);
    const normB = normalize(b);
    const scaler = dot(a, normB);
    const proj = {
      point: add(this.p1, scale(normB, scaler)),
      offset: scaler / magnitude(b),
    };
    return proj;
  }

  /**
   * Draws the segment on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {Object} options - The drawing options.
   * @param {number} options.width - The width of the line.
   * @param {string} options.color - The color of the line.
   * @param {number[]} options.dash - The dash pattern of the line.
   * @param {string} options.cap - The line cap style.
   */
  draw(ctx, { width = 2, color = "black", dash = [], cap = "butt" } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = cap;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
