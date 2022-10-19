import { Request, Response, NextFunction } from 'express'
const GoogleStrategy = require('passport-google-oauth2').Strategy
import ApiError from '../helpers/apiError'
import logger from '../util/logger'
import passport from 'passport'
import { myPassport } from '../config/passport'
import jwt from 'jsonwebtoken'

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  next()
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body
  const user = { username, password }
  myPassport
    .authenticate('google', {
      scope: ['email', 'profile'],
    })
    .then((res: any) => {
      console.log('kissak')
      next(res)
    })
    .catch((err: Error) => {
      console.log('ayrree')
      next(err)
    })
}

export const decodeUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body

  const decoded = jwt.verify(token, 'RRTOOYHOS')
  if (1 > 0) {
  } else {
    throw new Error('not match')
  }
  return decoded
}
