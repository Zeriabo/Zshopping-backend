import e, { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'

export const verifyGoogleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let verified = false
  const client = new OAuth2Client(process.env.CLIENT_ID)
  let response: any = {}

  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.user.token,
      audience: process.env.CLIENT_ID,
    })

    response = ticket.getPayload()
    verified = response.email_verified
  } catch (err) {
    console.log(err)
  }
  if (
    response.iss !== 'accounts.google.com' &&
    response.aud !== process.env.CLIENT_ID
  ) {
    verified = false
  }

  const user = {
    email: response.email,
    image: response.picture,
    socialId: response.sub,
    firstName: response.given_name,
    lastName: response.family_name,
  }
  if (verified) {
    next()
  } else {
    next(Error('email not verified'))
  }
}
