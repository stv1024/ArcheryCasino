import { MathExtension } from "./MathExtension";

export class Rules {
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
                    p = 2;
                } else if (Math.random() < 0.8) {
                    b = 1;
                    p = 1;
                } else {
                    b = 2;
                }
            }
            quest1.reward = p * this.perPig + r * this.perRabbit + b * this.perBird;
            quest1.list[1] = r;
            quest1.list[2] = p;
            quest1.list[3] = b;
        }
        let quest2 = new Quest(); //3|0~1B
        {
            let b = Math.random() < 0.2 ? 1 : 0;
            let r = Math.floor(Math.pow(Math.random(), 2) * (3+0.49 - b));
            let p = 4 - b - r;
            quest2.reward = p * this.perPig + r * this.perRabbit + b * this.perBird;
            quest2.list[1] = r;
            quest2.list[2] = p;
            quest2.list[3] = b;
        }
        let quest3 = new Quest(); //5|0~3B
        {
            let b = Math.floor(Math.pow(Math.random(), 4) * 4);
            let r = Math.floor(Math.pow(Math.random(), 3) * (5+0.49 - b));
            let p = 7 - b - r;
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
}

export class Round {
    public arrowCount: number = 10;
    public originQuest: Quest[];
    public bag: {};
    public roundReward: number = 0;

    /**
     *
     */
    constructor() {
        this.originQuest = Rules.getRandomQuests();
        this.bag = { 1: 0, 2: 0, 3: 0 };

        log(this.originQuest);
    }
}