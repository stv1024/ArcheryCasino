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
    pnlBottom.color = new Color4(1,1,1,0.05);
    pnlBottom.opacity = 1;
    pnlBottom.positionY = 155;
    pnlBottom.height = 50;
    pnlBottom.width = 400;
    
    {
      const txt0 = new UIText(pnlBottom)
      txt0.value = '####●';
      txt0.color = Color4.Black();
      txt0.fontSize = 15
      txt0.width = 120
      txt0.height = 20
      txt0.vAlign = 'center'
      txt0.positionX = -30;
      txt0.positionY = 50;

      let imageTexture = new Texture("images/placeholder1.png");
      const icon = new UIImage(canvas, imageTexture);
      icon.sourceLeft = 0;
      icon.sourceTop = 0;
      icon.sourceWidth = 32;
      icon.sourceHeight = 32;
      icon.width = 16;
      icon.height = 16;
    }

    //left
    const pnlLeft = new UIContainerRect(canvas);
    pnlLeft.hAlign = 'left';
    pnlLeft.vAlign = 'center';
    pnlLeft.color = new Color4(1,1,0,0.2);
    pnlLeft.positionY = 0;
    pnlLeft.height = 400;
    pnlLeft.width = 150;
}

class USys {
  update(){
    log(Camera.instance.rotation.eulerAngles);
  }
}

engine.addSystem(new USys());