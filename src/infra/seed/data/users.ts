import { Role, type User } from '@/application/dtos'
import { ObjectId } from 'mongodb'

export const users: User[] = [
  {
    _id: new ObjectId('61c131d825b90f003018956d'),
    username: 'admin',
    email: 'admin@mail.com',
    password: '$2a$12$UNQPUa0ulj2ikc/rSYmeQeDd2dY0Hlh66IK3EOv5XBPw7dIqXL2TW',
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true,
    role: Role.admin
  }
]
