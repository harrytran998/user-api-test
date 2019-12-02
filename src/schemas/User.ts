import { Document, Model, model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  userStatus: number
  username: string
}

export interface UserModel extends User, Document {}

export const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  userStatus: Number,
  username: String,
})

UserSchema.plugin(uniqueValidator)

export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema)
