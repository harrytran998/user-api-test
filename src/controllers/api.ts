import { Request, Response } from 'express'
import { formatOutput } from '../utilities/formatResponseAPI'

export const getApi = (req: Request, res: Response) => {
  return formatOutput(res, { title: 'User microservice' }, 200)
}
