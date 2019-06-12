
class SpriteInfo {
  sourceLeft = 0;
  sourceTop = 0;
  sourceWidth = 32;
  sourceHeight = 32;
  constructor(left: number, top: number, width: number, height: number) {
    this.sourceLeft = left;
    this.sourceTop = top;
    this.sourceWidth = width;
    this.sourceHeight = height;
  }
}

function setImageSprite(image: UIImage, spriteInfo: SpriteInfo) {
  image.sourceLeft = spriteInfo.sourceLeft;
  image.sourceTop = spriteInfo.sourceTop;
  image.sourceWidth = spriteInfo.sourceWidth;
  image.sourceHeight = spriteInfo.sourceHeight;
}
{
  // Create screenspace component
  const canvas = new UICanvas()

  const text = new UIText(canvas)
  text.value = 'Hello world!'

  // const rect = new UIContainerRect(canvas)
  // rect.width = 500
  // rect.height = '80%'
  // rect.color = Color4.Blue()
  // rect.opacity = 0.5

  const pnlBottom = new UIContainerRect(canvas);
  pnlBottom.hAlign = 'center';
  pnlBottom.vAlign = 'bottom';
  pnlBottom.color = new Color4(1, 1, 1, 0.05);
  pnlBottom.opacity = 1;
  pnlBottom.positionY = 155;
  pnlBottom.height = 50;
  pnlBottom.width = 400;


  //lefttop
  const pnlLeft = new UIContainerRect(canvas);
  pnlLeft.hAlign = 'left';
  pnlLeft.vAlign = 'top';
  pnlLeft.color = new Color4(1, 1, 0, 0.2);
  pnlLeft.positionY = 32;
  pnlLeft.height = 150;
  pnlLeft.width = 200;
  {
    let imageTexture = new Texture("images/placeholder1.png");
    let spriteInfo = new SpriteInfo(0,0,32,32);
    const icon = new UIImage(pnlLeft, imageTexture);
    setImageSprite(icon, spriteInfo);
    icon.width = 16;
    icon.height = 16;
  }
}

class USys {
  update() {
    log(Camera.instance.rotation.eulerAngles);
  }
}

engine.addSystem(new USys());