import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import * as halson from 'halson'
import { UserModel } from '../schemas/user'
import { formatOutput } from '../utilities/formatResponseAPI'
import { OrderAPILogger } from '../utilities/logger'

export const getUser = (req: Request, res: Response) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[GET] [/users/:{username}] user with username ${req.params.username} not found`
      )
      return res.status(404).send()
    }

    user = user.toJSON()
    user._id = user._id.toString()

    user = halson(user).addLink('self', `/users/${user._id}`)
    return formatOutput(res, user, 200)
  })
}

export const addUser = (req: Request, res: Response) => {
  const newUser = new UserModel(req.body)

  OrderAPILogger.logger.info(`[POST] [/users] ${newUser}`)

  newUser.password = bcrypt.hashSync(newUser.password, 10)

  newUser.save((error, user) => {
    if (error) {
      OrderAPILogger.logger.info(
        `[POST] [/users] something went wrong when saveing a new user ${newUser.username} | ${error.message}`
      )
      return res.status(500).send(error)
    }
    user = halson(user.toJSON()).addLink('self', `/users/${user._id}`)
    return formatOutput(res, user, 201)
  })
}

export const updateUser = (req: Request, res: Response) => {
  const username = req.params.username

  OrderAPILogger.logger.info(`[PATCH] [/users] ${username}`)

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[PATCH] [/users/:{username}] user with username ${username} not found`
      )
      return res.status(404).send()
    }

    user.username = req.body.username || user.username
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.phone = req.body.phone || user.phone
    user.userStatus = req.body.userStatus || user.userStatus

    user.save(error => {
      if (error) {
        console.log(error.message)
      }
      res.status(204).send()
    })
  })
}

export const removeUser = (req: Request, res: Response) => {
  const username = req.params.username

  OrderAPILogger.logger.warn(`[DELETE] [/users] ${username}`)

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[DELETE] [/users/:{username}] user with username ${username} not found`
      )
      return res.status(404).send()
    }

    user.remove(error => {
      if (error) {
        console.log(error.message)
      }
      res.status(204).send()
    })
  })
}
