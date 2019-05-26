import { FollowCameraSystem } from "./FollowCameraSystem";
import { FollowCameraComp } from "./FollowCameraComp";
import { ArrowUpdateSystem } from "./ArrowUpdateSystem";
import { Arrow } from "./Arrow";
import { Global } from "./Constants";
import { getUserAccount } from "@decentraland/EthereumController";

//import {RotatorSystem} from "./RotatorSystem";


const PixelSize = 40 / 128;

var curHoldingArrow: Entity;
var oldArrowContainer: Entity;

function start() {
  {
    var cube = new Entity('Target');
    cube.addComponent(new Transform({ position: new Vector3(6, 1.5, 16) }));
    var tra = cube.getComponent(Transform);
    tra.scale.set(1, 1, 0.02);
    cube.addComponent(new BoxShape());
    cube.getComponent(BoxShape).withCollisions = true;
    engine.addEntity(cube);
  }
  {
    var entity = new Entity('OldArrowContainer');
    entity.addComponent(new Transform());
    engine.addEntity(entity);
    oldArrowContainer = entity;
  }

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
    content.addComponent(new Transform({ position: new Vector3(0, 0, 0) }));
    var tra = content.getComponent(Transform);
    tra.scale.set(0.01, 0.01, 0.8);
    content.addComponent(new BoxShape());
  }
}

engine.addSystem(new FollowCameraSystem());
engine.addSystem(new ArrowUpdateSystem());

/*

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())
/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  cube.addComponent(new BoxShape())

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

/// --- Spawn a cube ---

const cube = spawnCube(5, 1, 5)

cube.addComponent(
  new OnClick(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9

    spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
  })
)
*/