class AppError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.statusCode = statusCode;
       
    }
  }

  export default AppError