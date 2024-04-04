import { Pipeline } from "./Pipeline";

export class PipelineStage<T, U> implements Stage<T, U> {
    private pipeline: Pipeline<any, any>;
    private _result: U | null = null;
    private _isProcessed: boolean = false;

    constructor(pipeline: Pipeline<any, any>) {
        this.pipeline = pipeline;
    }

    async process(input: T): Promise<U> {
        this._result = await this.pipeline.process(input);
        this._isProcessed = true;
        return this._result as U;
    }

    getResult(): U | null {
        if (!this._isProcessed) {
            throw new Error('Stage has not been processed');
        }
        return this._result;
    }
}