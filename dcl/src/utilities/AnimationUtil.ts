export class AnimationUtil {
    static playAnimationOn(animationStates: {}, clipName: string) {
        for (const key in animationStates) {
            animationStates[key].weight = key == clipName ? 1 : 0;
        }
        animationStates[clipName].play();
    }
}