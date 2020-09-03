export type AnyFunction<A = any, R = any> = (...args: A[]) => R | Promise<R>;

/**
 * Given a function that returns a promise of a value,
 * return a function that awaits the promise and throws away the result.
 * @param asyncFn G
 */
export function voidFn(fn: AnyFunction): () => void {
  return () => {
    (async () => {
      await fn();
    })();
  };
}

export function noop(...args: any[]) {}
