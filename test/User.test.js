import { expect } from 'chai';
//import mongoose from 'mongoose';
//import Assert from 'assert';
import supertest from 'supertest';
import { logger } from '../src/utils/logger.js';

const request = supertest('http://127.0.0.1:8080');
//const assert = Assert.strict
//mongoose.connect('mongodb+srv://santigui2003:arquitectura10@santiagocluster.vw1wy4u.mongodb.net/', { dbName: 'clase40_55_test'})

describe('Testing Users',()=>{
    
    describe('LoginTest', async()=>{
        const user = {
            email:'santi@santi.com',
            password:'123456',
        }
        const {statusCode, ok, body} = await request.post('/api/auth/login').send(user);
        logger.info(statusCode)
        logger.info(ok)
        logger.info(JSON.stringify(body))
    });

    describe('RegisterTest', async()=>{
        const user = {
            name:'',
            lastName:'',
            email:'',
            password:'',
        };
        
        const {statusCode, ok, body} = await request.post('/api/auth/register').send(user);
        logger.info(statusCode)
        logger.info(ok)
        logger.info(JSON.stringify(body))
    });

{/*
describe('Testing Users Dao', () => {

    before(function (done) {
        mongoose.connection.collections.users.drop()

        this.timeout(5000)
        done()
    })

    after(function (done) {
        mongoose.connection.collections.users.drop()

        console.log('Done!!')
        done()
    })

    describe('Users', () => {


        it('El dao debe poder obtener los usuarios', async () => {
            const usersDao = new UserDAO()
            const result = await usersDao.get({})

            console.log({ result })

            assert.strictEqual(Array.isArray(result), true)

            expect(Array.isArray(result)).to.be.equal(true)
            expect(result).to.be.deep.eq([])
        })

        it('El dao debe poder crear usuarios', async () => {
            let mockUser = {
                first_name: 'Bruno',
                last_name: 'Perez',
                email: 'bruno@meta.com',
                password: 'secret'
            }

            const usersDao = new UserDAO()
            const result = await usersDao.save(mockUser)

            assert.deepStrictEqual(result.pets, [])

            expect(result.pets).to.be.deep.equal([])
        })

        it('El dao debe poder buscar por email', async () => {
            let mockUser = {
                first_name: 'Mario',
                last_name: 'Aguilar',
                email: 'mario@huge.com',
                password: '123456'
            }

            const usersDao = new UserDAO()
            const result = await usersDao.save(mockUser)

            const user = await usersDao.getBy({ email: 'mario@huge.com' })

            assert.strictEqual(typeof (user), 'object')
            assert.strictEqual(user.first_name, 'Mario')

            expect(typeof (user)).to.be.eq('object')
            expect(user.first_name).to.be.eq('Mario')
        })
    })
})
*/}

})

