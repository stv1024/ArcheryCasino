@Component("Arrow")
export class Arrow {
    public state: number = 0; //0-holding 1-flying 2-stuck 3-destroy

    public velocity: Vector3;

    public cd: number;
}