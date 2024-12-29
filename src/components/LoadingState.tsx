const LoadingState = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="anime-card overflow-hidden">
          <div className="flex animate-pulse flex-col gap-6 md:flex-row">
            <div className="h-48 w-48 rounded-lg bg-muted"></div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="h-8 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-1/2 rounded bg-muted"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 w-20 rounded bg-muted"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 rounded bg-muted"></div>
                <div className="h-4 rounded bg-muted"></div>
                <div className="h-4 w-3/4 rounded bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;