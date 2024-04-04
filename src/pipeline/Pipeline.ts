export class Pipeline<T, U> {
    private stages: Stage<any, any>[] = [];

    addStage(stage: Stage<any, any>): Stage<any, any> {
        this.stages.push(stage);
        return stage;
    }

    async process(input: T): Promise<U> {
        let result: any = input;
        for (const stage of this.stages) {
            result = await stage.process(result);
        }
        return result;
    }
}