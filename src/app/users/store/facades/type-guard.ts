/**
 * Define a TypeGuard to use with observables and `filter()`,
 * so stream will never emit 'undefined
 */
export function isDefinedGuard<T>(value: T | undefined): value is T { return !!value; }
