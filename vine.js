registerPaint('vine', class Vine {

  static get inputProperties() {
    return [
      '--border-width',
      '--vine-length',
      '--flower-one-color',
      '--flower-two-color'
    ];
  }

  ellipse(context, cx, cy, rx, ry){
    context.save(); // save state
    context.beginPath();

    context.translate(cx-rx, cy-ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.restore(); // restore to original state
    context.fill();
  }

  randomFromSeed(s) {
    s = Math.sin(s) * 100000;
    return s - Math.floor(s);
  }

  drawVine(ctx, x, startY, vineLength, vineWidth, vineHeight, vineBuffer, flowerOneColor, flowerTwoColor){

    //Draw top of vine
    ctx.fillStyle = "#1dd1a1";
    this.ellipse(ctx, x, startY - vineWidth + 3, 15, 5);

    let alternate = true;
    for(let y = startY; y < startY + vineLength - vineWidth; y+=vineBuffer){
      ctx.fillStyle = "#1dd1a1";
      this.ellipse(ctx, x, y, vineHeight, vineWidth);

      //Draw flower
      ctx.beginPath();
      let bumpOffset = (this.randomFromSeed(x + y) < .5) ? vineHeight : -vineHeight;
      ctx.arc(x + bumpOffset, y, this.randomFromSeed(x + y) * 3  + 2, 0, 2 * Math.PI);
      ctx.fill();

      if(this.randomFromSeed(2*x + 3*y) < .6){
        let offsetConst = this.randomFromSeed(x + y);
        let flowerOffset = (this.randomFromSeed(x + y) < .5) ?
            offsetConst*vineWidth/2 : offsetConst* (-vineWidth)/2;
        ctx.fillStyle = (this.randomFromSeed(4*x + 6*y)) < .5 ? flowerOneColor : flowerTwoColor;

        ctx.beginPath();
        ctx.ellipse(x, y + flowerOffset, 3, 7, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(x, y + flowerOffset, 3, 7, -Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle="#333333";
        ctx.beginPath();
        ctx.arc(x, y + flowerOffset, 3, 0, 2 * Math.PI);
        ctx.fill();
      }

      alternate = !alternate;
    }
  }

  paint(ctx, geom, props, args) {
    console.log("test");
    const borderWidth = props.get('--border-width').toString().replace('px', '') * 1;
    const vineLength = props.get('--vine-length').toString().replace('px', '') * 1;
    const flowerOneColor = props.get('--flower-one-color').toString();
    const flowerTwoColor = props.get('--flower-two-color').toString();

    let vineWidth = 18;
    let vineHeight = 3;
    let vineBuffer = vineWidth * 2 - 5;

    let borderY = geom.height - vineLength;

    for(let x = 1; x * vineWidth < geom.width; x+=1){
      let newVineLength;
      if(x % 3 == 0){
        newVineLength = vineLength/1.5;
      }else if(x % 3 == 1){
        newVineLength = vineLength/2;
      }else{
        newVineLength = vineLength;
      }
      this.drawVine(ctx, x * vineWidth, borderY + vineWidth, newVineLength - 20, vineWidth, vineHeight, vineBuffer, flowerOneColor, flowerTwoColor);
    }
  }
});