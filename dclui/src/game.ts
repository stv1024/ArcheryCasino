
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
  pnlBottom.color = new Color4(0, 0, 0, 0.2);
  pnlBottom.opacity = 1;
  pnlBottom.positionY = 0;
  pnlBottom.height = 150;
  pnlBottom.width = '100%';
  {
    let imageTexture = new Texture("images/bow.png");
    let spriteInfo = new SpriteInfo(0, 0, 639, 253);
    const icon = new UIImage(pnlBottom, imageTexture);
    setImageSprite(icon, spriteInfo);
    icon.hAlign = 'right';
    icon.vAlign = 'center';
    icon.positionX = -50;
    icon.width = 150;
    icon.height = 50;
  }

  //lefttop
  const pnlLeft = new UIContainerRect(canvas);
  pnlLeft.hAlign = 'left';
  pnlLeft.vAlign = 'bottom';
  pnlLeft.color = new Color4(1, 1, 0, 0.2);
  pnlLeft.positionY = 100;
  pnlLeft.height = 200;
  pnlLeft.width = 200;
  {
    let imageTexture = new Texture("images/mana1.png");
    let spriteInfo = new SpriteInfo(0, 0, 32, 32);
    const icon = new UIImage(pnlLeft, imageTexture);
    setImageSprite(icon, spriteInfo);
    icon.width = 16;
    icon.height = 16;
    
    for (let i = 0; i < 3; i++) {
      let imageTexture = new Texture("images/quest_pad"+(i+1)+".png");
      let spriteInfo = new SpriteInfo(0, 0, 677, 112);
      const questPad = new UIImage(pnlLeft, imageTexture);
      setImageSprite(icon, spriteInfo);
      questPad.positionY = 50 * i;
      questPad.width = 180;
      questPad.height = 40;
    }
  }
}

class USys {
  update() {

  }
}

engine.addSystem(new USys());