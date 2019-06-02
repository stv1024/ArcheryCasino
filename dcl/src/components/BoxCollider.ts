//import { Collider } from "./Collider";
import { Ray } from "../classes/Ray";
import { RaycastHit } from "../classes/RaycastHit";

@Component("Collider")
/**
 * Don't use!
 */
export class BoxCollider {
    size: Vector3 = Vector3.One();
    //offset: Vector3 = Vector3.Zero();
    
    
    raycast( ray: Ray, hitInfo: RaycastHit, maxDistance: float): boolean {
        
        return false;
    }
    
    /**
     * 
     * @param size 
     */
    constructor(size: Vector3 = Vector3.One()) {
        this.size = size;
    }
}