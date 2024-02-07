import { ComponentType, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "./ErrorFallback";
import LoadingFallback from "./LoadingFallback";

/**
 * Suspense + Error Boundary
 */
const AsyncBoundary = (Component: ComponentType) => () => {
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <Suspense fallback={<LoadingFallback />}>
                <Component />
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};

export default AsyncBoundary;
