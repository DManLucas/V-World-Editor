/**
 * Class representing a starting point with an associated image.
 * @extends Marking
 */
class Start extends Marking {
  /**
   * Creates a new Start instance.
   * @param {Object} center - The center point of the starting point.
   * @param {Object} directionVector - The direction vector of the starting point.
   * @param {number} width - The width of the starting point.
   * @param {number} height - The height of the starting point.
   */
  constructor(center, directionVector, width, height) {
    super(center, directionVector, width, height);

    /**
     * The image associated with the starting point.
     * @type {Image}
     */
    this.img = new Image();

    /**
     * The source of the image.
     * @type {string}
     */
    this.img.src = "/images/car.png";

    /**
     * The type of the marking.
     * @type {string}
     */
    this.type = "start";
  }

  /**
   * Draws the starting point on the given context.
   * @param {CanvasRenderingContext2D} ctx - The context to draw on.
   */
  draw(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(angle(this.directionVector) - Math.PI / 2);

    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

    ctx.restore();
  }
}
