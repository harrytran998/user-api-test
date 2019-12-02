import { NextFunction, Request, Response } from 'express'
import { OrderAPILogger } from '../utilities/logger'

export const logging = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  OrderAPILogger.logger.error(err)
  next(err)
}

export const clientErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

export const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500).send({ error: err.message })
}
