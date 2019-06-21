import { FollowCameraSystem } from "./systems/FollowCameraSystem";
import { ArrowUpdateSystem } from "./systems/ArrowUpdateSystem";
import { Arrow } from "./components/Arrow";
import { Global } from "./Constants";
import { ColliderUpdateSystem } from "./systems/ColliderUpdateSystem";
import { FollowCameraComp } from "./components/FollowCameraComp";
import { TargetManageSystem } from "./systems/TargetManageSystem";
import { Round } from "./utilities/Rules";
import { MainUI } from "./classes/MainUILayout";
import { CheckValidZoneSystem } from "./systems/CheckValidZoneSystem";

var curHoldingArrow: Entity;
var oldArrowContainer: Entity;
var followCameraContainer: Entity;

function start() {
    var root = new Entity('Root');
    root.addComponent(new Transform({ position: new Vector3(0, 0, 0), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3().setAll(1) })); //You can change the direction to fit your lands.
    Global.root = root;
    engine.addEntity(root);
    var archeryScene = new Entity('Scene');
    archeryScene.addComponent(new Transform({ position: new Vector3(0, 0, 0), rotation: Quaternion.Euler(0, 180, 0), scale: new Vector3().setAll(2.13) }));
    archeryScene.addComponent(new GLTFShape('models/scene/scene.gltf'));
    let anmtr = archeryScene.addComponent(new Animator());
    let animSceneButtonDown = new AnimationState('ButtonDOWN');
    animSceneButtonDown.looping = false;
    anmtr.addClip(animSceneButtonDown);
    archeryScene.setParent(root);

    var emmMat = new Material();
    emmMat.transparencyMode = 2;
    emmMat.hasAlpha = true;
    emmMat.albedoTexture = new Texture('images/transparent_hint.png');
    emmMat.emissiveColor = Color3.Yellow();
    {
        var startButtonHint = new Entity('StartButtonHint');
        startButtonHint.setParent(root);
        startButtonHint.addComponent(new Transform({ position: new Vector3(9.574, 1.071, 1.629), rotation: Quaternion.Euler(-72.4, 0, 0), scale: new Vector3(1, 0.51636, 0.34752) }));
        startButtonHint.addComponent(new BoxShape());
        startButtonHint.addComponent(emmMat);
        Global.startButtonHint = startButtonHint;
    }
    {
        var validZoneHint = new Entity('ValidZoneHint');
        validZoneHint.setParent(root);
        validZoneHint.addComponent(new Transform({ position: new Vector3(7.25, 0.2, 4.946), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3(4.91, 0.4, 1.41) }));
        validZoneHint.addComponent(new BoxShape()).visible = false;
        validZoneHint.addComponent(emmMat);
        Global.validZoneHint = validZoneHint;
    }

    let bowIdleAnim: AnimationState;
    let bowShootAnim: AnimationState;
    let bowPullAnim: AnimationState;
    {
        // var cube = new Entity('Target');
        // cube.addComponent(new Transform({ position: new Vector3(6, 1.5, 16) }));
        // var tra = cube.getComponent(Transform);
        // tra.scale.set(1, 1, 0.02);
        // cube.addComponent(new BoxShape());
        // // cube.addComponent(new SphereCollider(cube, 1));
        // cube.addComponent(new AABBCollider(cube, new Vector3(1, 1, 0.1)));
        // engine.addEntity(cube);
    }

    {
        let entity = new Entity('OldArrowContainer');
        entity.addComponent(new Transform());
        entity.setParent(root);
        oldArrowContainer = entity;
    }
    {
        let entity = new Entity('FollowCamera');
        entity.addComponent(new Transform());
        entity.addComponent(new FollowCameraComp());
        entity.setParent(root);
        followCameraContainer = entity;
        {
            let bow = new Entity('Bow');
            bow.addComponent(new Transform({ position: new Vector3(0, -0.334, 0.6), rotation: Quaternion.Euler(0, 180, 0), scale: new Vector3().setAll(0.01) }));
            bow.addComponent(new GLTFShape('models/bow/gongjian.gltf'));
            bow.setParent(followCameraContainer);
            Global.bow = bow;

            let animator = new Animator();
            bow.addComponent(animator);
            bowIdleAnim = new AnimationState("NOARROW");
            animator.addClip(bowIdleAnim);
            bowIdleAnim.looping = false;
            bowShootAnim = new AnimationState("SHOOT");
            animator.addClip(bowShootAnim);
            bowShootAnim.looping = false;
            bowPullAnim = new AnimationState("HOLD");
            animator.addClip(bowPullAnim);
            bowPullAnim.looping = false;
            bowIdleAnim.play();
        }
        {/*
            let entity = new Entity('AimingUI');
            entity.setParent(followCameraContainer);
            entity.addComponent(new Transform({ position: new Vector3(0.1, 0.1, 1) }));
            let aimingUI = entity.addComponent(new AimingUI());
            {
                let panel = new Entity('Panel');
                panel.setParent(entity);
                panel.addComponent(new Transform({ scale: new Vector3(0.1, 0.1, 0.1) }));
                {
                    let pad = new Entity('Pad');
                    pad.setParent(panel);
                    pad.addComponent(new Transform({ position: new Vector3(0, 0, 0), scale: new Vector3(1, 0.3, 1) }));
                    pad.addComponent(new PlaneShape());
                    pad.addComponent(Materials['AimingUI']);
                }
                {
                    let text = new Entity('TxtInfo');
                    text.setParent(panel);
                    text.addComponent(new Transform({ position: new Vector3(0, 0, -0.05), scale: new Vector3(1, 1, 1) }));
                    let textShape = text.addComponent(new TextShape('TEST123'));
                    textShape.color = Color3.Black();
                    aimingUI.txtInfo = textShape;
                }
            }*/
        }
    }

    {
        const myEntity = new Entity();
        myEntity.addComponent(new Transform({ position: new Vector3(9.55, 1.1, 1.6), rotation: Quaternion.Euler(-70, 180, 0), scale: new Vector3(1.6, 0.6, 0.2) }))
        let shape = myEntity.addComponent(new BoxShape());
        shape.visible = false;
        myEntity.setParent(root);
        myEntity.addComponent(
            new OnClick(e => {
                log("Click Start Button : " + e)
                if (!Global.curRound) {
                    if (Global.money >= Global.costPerRound) {
                        Global.money -= Global.costPerRound;//Use money

                        Global.curRound = new Round();

                        animSceneButtonDown.reset();
                        animSceneButtonDown.play();

                        MainUI.refreshAll();

                        Global.startButtonHint.getComponent(BoxShape).visible = false;
                        Global.validZoneHint.getComponent(BoxShape).visible = true;
                        setTimeout(() => {
                            Global.validZoneHint.getComponent(BoxShape).visible = false;
                        }, 10e3);
                    }
                }
            })
        )
    }

    const mouseClickFunc = () => {
        //log("Shoot");
        if (curHoldingArrow) {
            if (Global.insideValidZone) {
                //Shoot
                bowIdleAnim.weight = 0;
                bowShootAnim.weight = 1;
                bowPullAnim.weight = 0;
                bowShootAnim.reset();
                bowShootAnim.play();

                curHoldingArrow.setParent(oldArrowContainer);
                var arrow = curHoldingArrow.getComponent(Arrow);
                var tra = curHoldingArrow.getComponent(Transform);

                var cam = Camera.instance;
                tra.position = cam.position.clone().add(Global.CameraOffset).add(Global.arrowLocalPos.clone().rotate(cam.rotation));
                tra.rotation = cam.rotation.clone();

                arrow.state = 1;
                arrow.velocity = Vector3.Forward().rotate(tra.rotation).scale(15);
                curHoldingArrow = null;

                //刷新UI
                MainUI.refreshArrowCount();
            }
        } else {
            //Reload
            if (Global.curRound && Global.curRound.arrowCount > 0) {
                bowIdleAnim.weight = 0;
                bowShootAnim.weight = 0;
                bowPullAnim.weight = 1;
                bowPullAnim.reset();
                bowPullAnim.play();
                Global.curRound.arrowCount -= 1;
                spawnArrow();
            }
        }
    }
    {
        var myEntity = new Entity();
        myEntity.setParent(root);
        myEntity.addComponent(new Transform({ position: new Vector3(8, 6, 6), scale: new Vector3(16, 12, 1) }))
        var shape = myEntity.addComponent(new PlaneShape());
        shape.visible = false;
        myEntity.addComponent(new OnClick(mouseClickFunc));

        var myEntity = new Entity();
        myEntity.setParent(root);
        myEntity.addComponent(new Transform({ position: new Vector3(8, 12, 3), rotation: Quaternion.Euler(90, 0, 0), scale: new Vector3(16, 6, 1) }))
        var shape = myEntity.addComponent(new PlaneShape());
        shape.visible = false;
        myEntity.addComponent(new OnClick(mouseClickFunc));

        // const input = Input.instance;
        // input.subscribe("BUTTON_UP", mouseClickFunc);
    }

    setTimeout(() => {
        MainUI.refreshAll();
    }, 3000);
}
start();

const arrowGltf = new GLTFShape('models/jian/jian.gltf');//FIXME: change the gltf filename

function spawnArrow(): Entity {
    var arrow = new Entity('Arrow');
    arrow.setParent(followCameraContainer);
    arrow.addComponent(new Transform({ position: Global.arrowLocalPos }));
    arrow.addComponent(new Arrow());
    curHoldingArrow = arrow;
    {
        var content = new Entity('content');
        content.setParent(arrow);
        content.addComponent(new Transform({ position: new Vector3(0, 0, -0.4), rotation: Quaternion.Euler(0, 180, 0), scale: Vector3.Zero().setAll(0.01) }));
        content.addComponent(arrowGltf);
    }
    return arrow;
}

engine.addSystem(new CheckValidZoneSystem());
engine.addSystem(new ColliderUpdateSystem());
engine.addSystem(new FollowCameraSystem());
engine.addSystem(new ArrowUpdateSystem());
//engine.addSystem(new AimingSystem());
engine.addSystem(new TargetManageSystem());
