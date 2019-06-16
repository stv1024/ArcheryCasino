import { FollowCameraSystem } from "./systems/FollowCameraSystem";
import { ArrowUpdateSystem } from "./systems/ArrowUpdateSystem";
import { Arrow } from "./components/Arrow";
import { Global } from "./Constants";
import { AABBCollider } from "./components/AABBCollider";
import { ColliderUpdateSystem } from "./systems/ColliderUpdateSystem";
import { SphereCollider } from "./components/SphereCollider";
import { AimingSystem } from "./systems/AimingSystem";
import { FollowCameraComp } from "./components/FollowCameraComp";
import { AimingUI } from "./components/AimingUI";
import { Materials } from "./classes/materials";
import { TargetManageSystem } from "./systems/TargetManageSystem";
import { Rules, Round } from "./utilities/Rules";

var curHoldingArrow: Entity;
var oldArrowContainer: Entity;
var followCameraContainer: Entity;

var curRound: Round;

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
    {
        var cube = new Entity('Target');
        cube.addComponent(new Transform({ position: new Vector3(6, 1.5, 16) }));
        var tra = cube.getComponent(Transform);
        tra.scale.set(1, 1, 0.02);
        cube.addComponent(new BoxShape());
        // cube.addComponent(new SphereCollider(cube, 1));
        cube.addComponent(new AABBCollider(cube, new Vector3(1, 1, 0.1)));
        engine.addEntity(cube);
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
            bow.addComponent(new Transform({ position: new Vector3(0, 0, 5), rotation: Quaternion.Euler(0, 180, 0), scale: new Vector3().setAll(0.01) }));
            bow.addComponent(new GLTFShape('models/shejian/shejian.babylon.gltf'));
            bow.setParent(followCameraContainer);

            let animator = new Animator();
            entity.addComponent(animator);
            //const clip = new AnimationState("shoot");
            //animator.addClip(clip);
            //clip.looping = true;
            //clip.play();
        }
        {
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
            }
        }
    }

    {
        const myEntity = new Entity();
        myEntity.addComponent(new Transform({ position: new Vector3(9.55, 1.1, 1.6), rotation: Quaternion.Euler(-70, 180, 0), scale: new Vector3(1.6, 0.6, 0.2) }))
        myEntity.addComponent(new BoxShape())
        myEntity.setParent(root);
        myEntity.addComponent(
            new OnClick(e => {
                log("Click : " + e)
                curRound = new Round();
                animSceneButtonDown.play();
            })
        )
    }

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
    pnlBottom.vAlign = 'bottom';
    pnlBottom.color = Color4.White();
    pnlBottom.positionY = 15;

    const input = Input.instance;

    input.subscribe("BUTTON_UP", e => {
        log("Shoot", e);
        if (curHoldingArrow) {
            var arrow = curHoldingArrow.getComponent(Arrow);
            var tra = curHoldingArrow.getComponent(Transform);
            curHoldingArrow.setParent(oldArrowContainer);

            arrow.state = 1;
            arrow.velocity = Vector3.Forward().rotate(tra.rotation).scale(15);
            curHoldingArrow = null;
        } else {
            spawnArrow();
        }
    });


    let i = 0;
    const tryshoot = () => {
        if (curHoldingArrow) {
            var arrow = curHoldingArrow.getComponent(Arrow);
            curHoldingArrow.setParent(oldArrowContainer);
            var tra = curHoldingArrow.getComponent(Transform);
            tra.position = new Vector3(8, 1.6, 4);
            tra.rotation = Quaternion.Euler(0, 0, 0);

            arrow.state = 1;
            arrow.velocity = Vector3.Forward().rotate(tra.rotation).scale(15);
            curHoldingArrow = null;
        } else {
            let e = spawnArrow();
        }

        setTimeout(tryshoot, 500);
    };
    setTimeout(tryshoot, 500);


}
start();

function spawnArrow(): Entity {
    var arrow = new Entity('Arrow');
    arrow.setParent(oldArrowContainer);
    arrow.addComponent(new Transform());
    arrow.addComponent(new Arrow());
    var tra = arrow.getComponent(Transform);
    //engine.addEntity(arrow);
    curHoldingArrow = arrow;
    {
        var content = new Entity('Side0');
        content.setParent(arrow);
        content.addComponentOrReplace(new Transform({ position: new Vector3(0, 0, -0.4) }));
        var tra = content.getComponent(Transform);
        tra.scale.set(0.01, 0.01, 0.8);
        content.addComponent(new BoxShape());
    }
    return arrow;
}

engine.addSystem(new ColliderUpdateSystem());
//engine.addSystem(new FollowCameraSystem());
engine.addSystem(new ArrowUpdateSystem());
//engine.addSystem(new AimingSystem());
engine.addSystem(new TargetManageSystem());
