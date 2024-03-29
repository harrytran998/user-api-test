import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import express from 'express'
import * as expressWinston from 'express-winston'
import * as mongoose from 'mongoose'
import * as winston from 'winston'
import { APIRoute } from './routers'
import * as errorHandler from './utilities/errorHandlers'

class App {
  public app: express.Application
  public apiRoutes: APIRoute = new APIRoute()
  public mongoUrl: string
  public mongoUser: string
  public mongoPass: string

  constructor() {
    const path = `${__dirname}/../.env.${process.env.NODE_ENV}`

    dotenv.config({ path: path })
    this.mongoUrl = `mongodb://${process.env.MONGODB_URL_PORT}/${process.env.MONGODB_DATABASE}`
    this.mongoUser = `${process.env.MONGODB_USER}`
    this.mongoPass = `${process.env.MONGODB_PASS}`

    this.app = express()
    this.app.use(bodyParser.json())
    this.apiRoutes.routes(this.app)
    this.mongoSetup()
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
      })
    )
    this.app.use(errorHandler.logging)
    this.app.use(errorHandler.clientErrorHandler)
    this.app.use(errorHandler.errorHandler)
  }

  private mongoSetup(): void {
    let options

    if (process.env.NODE_ENV !== 'prod') {
      options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    } else {
      options = {
        user: this.mongoUser,
        pass: this.mongoPass,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    }
    mongoose.connect(this.mongoUrl, options)
  }
}

export default new App().app
