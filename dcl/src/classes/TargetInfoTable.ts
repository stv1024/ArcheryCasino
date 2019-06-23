import { Rabbit } from "./AIs/Rabbit";
import { Pig } from "./AIs/Pig";
import { Bird } from "./AIs/Bird";

export const TargetInfoTable: any = {};

TargetInfoTable[1] = {
    name: "Rabbit",
    min: new Vector3(2.56, 0, 11), //(1, 0, 5),
    max: new Vector3(12.5, 0, 26), //(15, 0, 26),
    output: 1,
    radius: 0.45,
    speed: 1.1,
    maxCount: 1,
    ai: Rabbit,
    model: new GLTFShape('models/targets/tuzi.gltf'),
    scale: 0.005,
    offset: new Vector3(0, 0, -0.2),
    animClips: ['Idle', 'Die', 'Walk', 'Spawn'],
    //special
    jumpSpeed: 5
};
TargetInfoTable[2] = {
    name: "Pig",
    min: new Vector3(3, 0, 11), //Vector3(1, 0, 8)
    max: new Vector3(12, 0, 20), //Vector3(15, 0, 31)
    output: 2,
    radius: 0.7,
    speed: 2.8,
    maxCount: 1,
    ai: Pig,
    model: new GLTFShape('models/targets/zhu.gltf'),
    scale: 0.005,
    offset: new Vector3(0, 0, -0.55),
    animClips: ['Idle', 'Die', 'Walk', 'Spawn'],
    //special
};
TargetInfoTable[3] = {
    name: "Bird",
    min: new Vector3(1, 1, 12),
    max: new Vector3(15, 24, 31),
    output: 3,
    radius: 0.3,
    speed: 1,
    maxCount: 1,
    ai: Bird,
    model: new GLTFShape('models/targets/niao.gltf'),
    scale: 0.005,
    offset: new Vector3(0, 0, 0),
    animClips: ['Idle', 'Die', 'Walk', 'Spawn'],
    //special
};