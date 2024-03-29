import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = password => {
  return bcrypt.hash(password, 10)
}

export const createJWT = userObj => {
  const token = jwt.sign(
    {
      id: userObj.id,
      username: userObj.username,
    },
    process.env.JWT_SECRET,
  )
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  const [_, token] = bearer.split(' ')
  if (!token) {
    res.status(401)
    res.json({ message: 'Not valid token' })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    res.status(401)
    res.json({ message: 'Not valid token' })
    return
  }
}
