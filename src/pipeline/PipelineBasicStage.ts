export class PipelineBasicStage<T, U> implements Stage<T, U> {
    private operation: (input: T) => U ;
    private _result: U | null = null;
    private _isProcessed: boolean = false;

    constructor(operation: (input: T) => U) {
        this.operation = operation;
    }

    async process(input: T): Promise<U> {
        this._result = await this.operation(input);
        this._isProcessed = true;
        return this._result;
    }

    getResult(): U | null {
        if (!this._isProcessed) {
            throw new Error('Stage has not been processed');
        }
        return this._result;
    }
}