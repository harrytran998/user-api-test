import { getApi } from '../controllers/api'
import { addUser, getUser, updateUser, removeUser } from '../controllers/user'
import { Application } from 'express'
export class APIRoute {
  public routes(app: Application): void {
    app.route('/api').get(getApi)
    app.route('/users').post(addUser)
    app.route('/users/:username').patch(updateUser)
    app.route('/users/:username').delete(removeUser)
    app.route('/users/:username').get(getUser)
  }
}
