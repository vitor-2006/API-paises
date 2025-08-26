import express, { Request, Response, NextFunction, ErrorRequestHandler }  from 'express'

// Custom Error class
export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // Ensures the correct prototype chain
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// Global Error Handling Middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`); // Log the error for debugging purposes

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    // For any other unexpected errors
    return res.status(500).json({
        status: 'error',
        message: 'An internal server error occurred.'
    });
};

// This must be the last middleware to be used

