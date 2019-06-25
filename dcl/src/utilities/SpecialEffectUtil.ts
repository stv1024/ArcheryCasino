const mat = new Material();
mat.transparencyMode = 2;
mat.hasAlpha = true;
mat.albedoTexture = new Texture('images/eff_hit.png');
mat.disableLighting = true;

export class SpecialEffectUtil {
    static createHitEffect(position: Vector3, duration: number) {
        const eff = new Entity('eff');
        const rot = Quaternion.FromToRotation(Vector3.Forward(), Camera.instance.position.subtract(position));
        eff.addComponent(new Transform({ position: position, rotation: rot, scale: new Vector3().setAll(1) }));
        eff.addComponent(new PlaneShape());
        eff.addComponent(mat);

        engine.addEntity(eff);

        setTimeout(() => {
            engine.removeEntity(eff);
        }, duration * 1e3);
    }
}
