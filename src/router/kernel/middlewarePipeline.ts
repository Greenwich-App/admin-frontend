import { type NavigationGuardNext } from 'vue-router';

function middlewarePipeline(
  context: Record<string, unknown> & { next: NavigationGuardNext },
  middleware: Array<(ctx: Record<string, unknown> & { next: NavigationGuardNext }) => void>,
  index: number
) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    // call the next middleware and pass in the args
    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export default middlewarePipeline;
