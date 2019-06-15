import { MathExtension } from "./MathExtension";

export class Rules {
    static getRandomQuests(): Quest[] {
        let quest1 = new Quest(); //2
        {
            if (Math.random() < 0.1) {
                quest1.list[3] = 1;
                let which = Math.random() < 0.4 ? 1 : 2;
                quest1.list[which] = 1;
            } else {
                if (Math.random() < 0.4) {
                    quest1.list[2] = 2;
                } else if (Math.random() < 0.8) {
                    quest1.list[1] = 1;
                    quest1.list[2] = 1;
                } else {
                    quest1.list[1] = 2;
                }
            }
        }
        let quest2 = new Quest(); //4|0~1B
        {
            let b = Math.random() < 0.25 ? 1 : 0;
            let r = Math.floor(Math.pow(Math.random(), 2) * (4.49 - b));
            let p = 4 - b - r;
            quest2.list[1] = r;
            quest2.list[2] = p;
            quest2.list[3] = b;
        }
        let quest3 = new Quest(); //7|0~3B
        {
            let b = Math.floor(Math.pow(Math.random(), 4) * 4 + 0.2);
            let r = Math.floor(Math.pow(Math.random(), 3) * (7.49 - b));
            let p = 7 - b - r;
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