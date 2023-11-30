class AppError extends Error {
  constructor(error) {
    const { code, message } = error;
    super();
    this.statusCode = code;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Something went wrong";

  return res.status(statusCode).json({
    status: false,
    message
  });
};

export { AppError, handleError };
