type ErrorResponse = {
  error: string;
  details: string;
};

export function handleError(error: Error): Response {
  console.error("[Home IP Fetcher] Server error:", error);
  const errorResponse: ErrorResponse = {
    error: "Internal Server Error",
    details: error.message
  };
  return Response.json(errorResponse, { status: 500 });
}