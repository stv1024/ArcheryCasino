import { MathExtension } from "./MathExtension";
import { Arrow } from "../components/Arrow";
import { Global } from "../Constants";
import { MainUI } from "../classes/MainUILayout";

export class Rules {

    static targetRewards = {
        1: 1.5,
        2: 1,
        3: 3,
        4: 8,
    }

    static perPig = 2;
    static perRabbit = 4;
    static perBird = 10;
    static getRandomQuests(): Quest[] {
        let quest1 = new Quest(); //2
        {
            let r = 0, p = 0, b = 0;
            if (Math.random() < 0.05) {
                b = 1;
                r = Math.random() < 0.4 ? 1 : 0;
                p = 2 - b - r;
            } else {
                if (Math.random() < 0.4) {
                    r = 2;
                } else if (Math.random() < 0.8) {
                    r = 1;
                    p = 1;
                } else {
                    p = 2;
                }
            }
            quest1.reward = p * this.perPig + r * this.perRabbit + b * this.perBird;
            quest1.list[1] = r;
            quest1.list[2] = p;
            quest1.list[3] = b;
        }
        let quest2 = new Quest(); //3|0~1B
        {
            let b = Math.random() < 0.15 ? 1 : 0;
            let r = Math.floor(Math.pow(Math.random(), 1.5) * (3 + 0.49 - b));
            let p = 3 - b - r;
            quest2.reward = p * this.perPig + r * this.perRabbit + b * this.perBird;
            quest2.list[1] = r;
            quest2.list[2] = p;
            quest2.list[3] = b;
        }
        let quest3 = new Quest(); //5|0~3B
        {
            let b = Math.floor(Math.pow(Math.random(), 2) * 4);
            let r = Math.floor(Math.pow(Math.random(), 1.5) * (5 + 0.49 - b));
            let p = 5 - b - r;
            quest3.reward = p * this.perPig + r * this.perRabbit + b * this.perBird;
            quest3.list[1] = r;
            quest3.list[2] = p;
            quest3.list[3] = b;
        }

        return [quest1, quest2, quest3];
    }
}

export class Quest {
    list = {
        1: 0,
        2: 0,
        3: 0
    };
    reward: number;
    finished = false;
}

export class Round {
    /**
     * How many arrows are in your storage?
     */
    public arrowCount: number = 10;
    public quests: Quest[];
    public bag: {};
    /**
     * How many arrows are still alive (not hit or stopped)?
     */
    public aliveArrowCount: number;
    public roundReward: number = 0;
    public earnedMoney: number = 0;

    /**
     *
     */
    constructor() {
        this.aliveArrowCount = Global.arrowsPerRound;
        this.quests = Rules.getRandomQuests();
        this.bag = { 1: 0, 2: 0, 3: 0, 4: 0 };

        log(this.quests);
    }

    onArrowEndFlying(arrow: Arrow) {
        this.aliveArrowCount -= 1;
        //log('get onArrowEnd', this.aliveArrowCount)

        //Round End
        if (this.aliveArrowCount <= 0){
            //显示结算
            MainUI.showRoundEndPanel(Global.curRound.earnedMoney);

            log('=========Round End==========');
            Global.curRound = null;

            //清除UI
            MainUI.refreshAll();
            
            //音效
            Global.asEarn.playOnce();
        }
    }
}