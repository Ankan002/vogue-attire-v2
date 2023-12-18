import { UseMutateAsyncFunction } from "@tanstack/react-query";

/**
 * This is a react query async mutation function type generic wrapper. It take the following arguments
 * 
 * - `ResponseType`: The response returned by API.
 * 
 * - `RequestArgs`: The request args for the API.
 * 
 * - `ErrorType`: Optional arg which defaults to `Error`.
 */
export type AsyncMutationFunction<
	ResponseType,
	FunctionArgs,
	ErrorType = Error,
> = UseMutateAsyncFunction<ResponseType, ErrorType, FunctionArgs>;
