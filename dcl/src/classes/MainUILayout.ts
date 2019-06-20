import { Global } from "../Constants";

export class QuestSlot {
  icon: UIImage;
  tick: UIImage;
}
export class QuestPad {
  slots: QuestSlot[] = [];
  txtQuestReward: UIText;
  circleQuestReward: UIImage;
}
export class MainUI {
  static questPads: QuestPad[] = [];

  static txtMoney: UIText;
  static txtArrowCount: UIText;

  static targetIcons = {
    1: null as Texture,
    2: null as Texture,
    3: null as Texture,
    4: null as Texture,
  };

  static refreshAll() {
    this.txtMoney.value = Global.money.toFixed();
    const round = Global.curRound;
    if (round) {
      this.txtArrowCount.value = round.arrowCount + '/' + Global.arrowsPerRound;
      for (let i = 0; i < 3; i++) {
        const quest = round.quests[i];
        const questPad = this.questPads[i];

        let j = 0;
        for (let id = 1; id <= 3; id++) {
          for (let k = 0; k < quest.list[id] && j < questPad.slots.length; k++) {
            const slot = questPad.slots[j];
            slot.icon.source = this.targetIcons[id];
            slot.icon.visible = true;
            slot.tick.visible = round.bag[id] >= quest.list[id];
            j++;
          }
        };
        for (; j < questPad.slots.length; j++) {
          const slot = questPad.slots[j];
          slot.icon.visible = false;
          slot.tick.visible = false;
        }
        questPad.circleQuestReward.visible = quest.finished;
        questPad.txtQuestReward.value = quest.reward.toString();
      }
    } else {
      this.questPads.forEach(questPad => {
        questPad.slots.forEach(slot => {
          slot.icon.visible = false;
          slot.tick.visible = false;
        });
        questPad.txtQuestReward.value = '--';
        questPad.circleQuestReward.visible = false;
      });
      this.txtArrowCount.value = '0/' + Global.arrowsPerRound;
    }
  }

  static refreshArrowCount() {

    const round = Global.curRound;
    if (round) {
      this.txtArrowCount.value = round.arrowCount + '/' + Global.arrowsPerRound;
    } else {
      this.txtArrowCount.value = '0/' + Global.arrowsPerRound;
    }
  }
}

[3, 7, 2, 1, 88].forEach(id => log('testid', id));

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
  for (let i = 0; i < 3; i++) {
    const questPad = new QuestPad();
    for (let j = 0; j < 5; j++) {
      questPad.slots[j] = new QuestSlot();
    }
    MainUI.questPads[i] = questPad;
  }
  //TODO：字体IMPACT
  // Create screenspace component
  const canvas = new UICanvas();
  {//RB
    {
      let imageTexture = new Texture("images/mana1.png");
      let spriteInfo = new SpriteInfo(0, 0, 95, 109);
      const icon = new UIImage(canvas, imageTexture);
      setImageSprite(icon, spriteInfo);
      icon.hAlign = 'right';
      icon.vAlign = 'bottom';
      icon.positionX = -240;
      icon.positionY = 140;
      icon.width = 33.6;
      icon.height = 38.6;

      const text = new UIText(canvas);
      text.hAlign = 'right';
      text.vAlign = 'bottom';
      text.hTextAlign = 'left';
      text.positionX = -130;
      text.positionY = 140;
      text.fontSize = 32;
      text.color = Color4.FromHexString('#ffc300ff');
      //text.fontFamily = "Impact, Helvetica, sans-serif";
      text.value = '--';

      MainUI.txtMoney = text;
    }
    let imageTexture = new Texture("images/bow.png");
    let spriteInfo = new SpriteInfo(0, 0, 639, 253);
    const icon = new UIImage(canvas, imageTexture);
    setImageSprite(icon, spriteInfo);
    icon.hAlign = 'right';
    icon.vAlign = 'bottom';
    icon.positionX = -60;
    icon.positionY = 40;
    icon.width = 226.2;
    icon.height = 89.5;
    {
      const text = new UIText(canvas);
      text.hAlign = 'right';
      text.vAlign = 'bottom';
      text.hTextAlign = 'center';
      text.vTextAlign = 'center';
      text.positionX = -51;
      text.positionY = 42;
      text.fontSize = 21;
      //text.fontFamily = "Impact, Arial";
      text.value = '0/10';

      MainUI.txtArrowCount = text;
    }
  }

  {//leftbottom
    const pnlLeft = new UIContainerRect(canvas);
    pnlLeft.hAlign = 'left';
    pnlLeft.vAlign = 'bottom';
    pnlLeft.color = new Color4(1, 1, 0, 0);
    pnlLeft.positionX = 18;
    pnlLeft.positionY = 80;
    pnlLeft.height = 200;
    pnlLeft.width = 250;

    {
      var imageTexture = new Texture("images/Quest.png");
      var spriteInfo = new SpriteInfo(0, 0, 172, 65);
      const mission = new UIImage(pnlLeft, imageTexture);
      setImageSprite(mission, spriteInfo);
      mission.positionX = -10;
      mission.positionY = 71;
      mission.width = 64.4;
      mission.height = 24.3;

      var imageTexture = new Texture("images/slash.png");
      var spriteInfo = new SpriteInfo(0, 0, 39, 59);
      const slash = new UIImage(pnlLeft, imageTexture);
      setImageSprite(slash, spriteInfo);
      slash.positionX = 55;
      slash.positionY = 73;
      slash.width = 24.3 / 65 * 39;
      slash.height = 24.3 / 65 * 59;

      var imageTexture = new Texture("images/mana2.png");
      var spriteInfo = new SpriteInfo(0, 0, 63, 72);
      const icon = new UIImage(pnlLeft, imageTexture);
      setImageSprite(icon, spriteInfo);
      icon.positionX = 95;
      icon.positionY = 73;
      icon.width = 23.5;
      icon.height = 26.9;

      for (let i = 0; i < 3; i++) {
        var imageTexture = new Texture("images/quest_pad" + (3 - i) + ".png");
        var spriteInfo = new SpriteInfo(0, 0, 677, 112);
        const questPad = new UIImage(pnlLeft, imageTexture);
        setImageSprite(questPad, spriteInfo);
        questPad.positionY = -70 + 50 * i;
        questPad.width = 241.8;
        questPad.height = 40;
        for (let j = 0; j < 5; j++) {
          var imageTexture = new Texture("images/target_icons/icon_pig.png");
          var spriteInfo = new SpriteInfo(0, 0, 77, 88);
          const targetIcon = new UIImage(questPad, imageTexture);
          setImageSprite(targetIcon, spriteInfo);
          targetIcon.positionX = -65 + j * 29;
          targetIcon.positionY = 0;
          targetIcon.width = 27.5;
          targetIcon.height = 40 * 88 / 112;
          targetIcon.visible = false;
          MainUI.questPads[i].slots[j].icon = targetIcon;

          var imageTexture = new Texture("images/check_tick.png");
          var spriteInfo = new SpriteInfo(0, 0, 62, 60);
          const tick = new UIImage(questPad, imageTexture);
          setImageSprite(tick, spriteInfo);
          tick.positionX = targetIcon.positionX;
          tick.positionY = 0;
          tick.width = 23.25;
          tick.height = 22.5;
          tick.visible = false;
          MainUI.questPads[i].slots[j].tick = tick;
        }
        {
          const text = new UIText(questPad);
          text.hAlign = 'right';
          text.vAlign = 'center';
          text.hTextAlign = 'center';
          text.positionX = 22;
          text.positionY = 37;
          text.fontSize = 22;
          text.fontWeight = 'italic';
          text.color = Color4.FromHexString('#ffc300ff');
          text.value = '--';
          MainUI.questPads[i].txtQuestReward = text;

          var imageTexture = new Texture("images/check_circle.png");
          var spriteInfo = new SpriteInfo(0, 0, 72, 72);
          const circle = new UIImage(questPad, imageTexture);
          setImageSprite(circle, spriteInfo);
          circle.positionX = 95;
          circle.positionY = 0;
          circle.width = 27;
          circle.height = 27;
          circle.visible = false;
          MainUI.questPads[i].circleQuestReward = circle;
        }
      }
    }
  }

  MainUI.targetIcons[1] = new Texture("images/target_icons/icon_rabbit.png");
  MainUI.targetIcons[2] = new Texture("images/target_icons/icon_pig.png");
  MainUI.targetIcons[3] = new Texture("images/target_icons/icon_bird.png");
}