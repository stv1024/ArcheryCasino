@Component("Arrow")
export class Arrow {
    public state: number = 0; //0:holding 1-flying 2-stuck

    public velocity: Vector3;
}