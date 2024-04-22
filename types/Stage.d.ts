interface Stage<T, U> {
    process(input: T): U | Promise<U>;
    getResult(): U | null;
}
