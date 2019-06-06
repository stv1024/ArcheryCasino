import { FollowCameraSystem } from "./systems/FollowCameraSystem";
import { ArrowUpdateSystem } from "./systems/ArrowUpdateSystem";
import { Arrow } from "./components/Arrow";
import { Global } from "./Constants";
import { getUserAccount } from "@decentraland/EthereumController";
import { AABBCollider } from "./components/AABBCollider";
import { ColliderUpdateSystem } from "./systems/ColliderUpdateSystem";
import { SphereCollider } from "./components/SphereCollider";
import { AimingSystem } from "./systems/AimingSystem";
import { FollowCameraComp } from "./components/FollowCameraComp";
import { AimingUI } from "./components/AimingUI";
import { Materials } from "./classes/materials";
import { TargetManageSystem } from "./systems/TargetManageSystem";

var curHoldingArrow: Entity;
var oldArrowContainer: Entity;
var followCameraContainer: Entity;

function start() {
    var root = new Entity('Root');
    root.addComponent(new Transform({ position: new Vector3(0, 0, 0), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3().setAll(1) })); //You can change the direction to fit your lands.
    Global.root = root;
    engine.addEntity(root);
    {
        var archeryScene = new Entity('Scene');
        archeryScene.addComponent(new Transform({ position: new Vector3(4, 0, 1), rotation: Quaternion.Euler(0, 180, 0), scale: new Vector3().setAll(2.54) }));
        archeryScene.addComponent(new GLTFShape('models/scene/sence.gltf'));
        archeryScene.setParent(root);
    }
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
    for (let i = 0; i < 20; i++) {
        var cube = new Entity('testBox');
        cube.addComponent(new Transform({ position: new Vector3(2 + 0.1 * i, 0.05 + 0.1 * i, 16) }));
        var tra = cube.getComponent(Transform);
        tra.scale.set(0.1, 0.1, 0.02);
        cube.addComponent(new BoxShape());
        cube.getComponent(BoxShape).withCollisions = true;
        // cube.addComponent(new SphereCollider(cube, 1));
        cube.addComponent(new AABBCollider(cube, new Vector3(0.1, 0.1, 0.1)));
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

    // Create screenspace component
    const canvas = new UICanvas()

    // Create a textShape component, setting the canvas as parent
    const text = new UIText(canvas)
    text.value = 'Hello world!'

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

    executeTask(async () => {
        try {
            const address = await getUserAccount()
            log(address)
        } catch (error) {
            log('ERR:', error.toString())
        }
    })
}
start();

function spawnArrow() {
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
}

engine.addSystem(new ColliderUpdateSystem());
engine.addSystem(new FollowCameraSystem());
engine.addSystem(new ArrowUpdateSystem());
engine.addSystem(new AimingSystem());
engine.addSystem(new TargetManageSystem());