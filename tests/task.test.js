const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const {userOne, userTwo, setupDatabase, taskOne, taskTwo, taskThree} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Test task'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.description).toBe('Test task')
    expect(task.completed).toBe(false)
})

test('Should get all task for user one', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should delete task', async () => {
    var response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    var task = await Task.findById(taskOne._id)
    expect(task).toBeNull()
})

test('Should not delete task from other user', async () => {
    var response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)

    var task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})