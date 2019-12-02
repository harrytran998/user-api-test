import { Response } from 'express'

export const formatOutput = (res: Response, data: any, statusCode: number) => {
  return res.format({
    json: () => {
      res.type('application/json')
      res.status(statusCode).send(data)
    },
    default: () => {
      res.status(406).send()
    },
  })
}
