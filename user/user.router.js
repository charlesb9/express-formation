import { Router } from 'express'
import { login, register } from './user.controller.js'

const router = Router()

/**
 * POST /auth/login
 * @summary login user
 * @param {string} email.required - Email
 * @param {string} password.required - Password
 * @return { object } 200 - success response 
 */
router.post('/login', login)

/**
 * POST /auth/register
 * @summary register user
 * @param {string} email.required - Email
 * @param {string} password.required - Password
 * @return { object } 201 - success response 
 */
router.post('/register', register)

export {
	router as routerAuth
}