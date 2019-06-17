@Component("Arrow")
export class Arrow {
    /**
     * 0-holding 1-flying 2-stuck 3-destroy
     */
    public state: number = 0;

    public velocity: Vector3;

    public cd: number;
}