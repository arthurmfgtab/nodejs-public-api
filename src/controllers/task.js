const Task = require('./../models/task')
const User = require('./../models/user')
const mongoose = require('mongoose')
const objectId = require('mongoose').Types.ObjectId

exports.list = async (request, response) => {
    try {
        let tasks = []
        const responsible = request.params.responsible

        if (responsible) {
            const user = await User.find({ _id: responsible })
            if (user.length <= 0) {
                console.log('User responsible not found!')
                return response.json({ error: 'User responsible not found!' })
            }
            tasks = await Task.find({ responsible })
        } else tasks = await Task.find()

        if (tasks.length > 0) response.json({ tasks })
        else response.json({ message: 'No task registered!' })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.show = async (request, response) => {
    const { _id } = request.params

    try {
        let task = await Task.findOne({ _id })
        if (!task) response.json({ error: "Task doesn't exists" })

        task = await Task.findById({ _id })
        return response.json({ task })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.store = async (request, response) => {
    const { title, description, done, responsible } = request.body
    const task = await Task.findOne({ title })

    if (task)
        return response.json({ error: 'This task has already been created!' })

    if (!objectId.isValid(responsible)) {
        console.log('The ID passed is not valid')
        return response.json({ error: 'The ID passed is not valid' })
    }

    const userToBeResponsible = await User.find({ _id: responsible })
    if (userToBeResponsible <= 0) {
        console.log('User to be responsible not found')
        return response.json({ error: 'User to be responsible not found' })
    }

    try {
        const _id = mongoose.Types.ObjectId()
        const newTask = await Task.create({
            _id,
            title,
            description,
            done,
            responsible
        })

        if (newTask) response.status(200).json({ newTask })
        else response.status(400).json({ error: 'Some error occured!' })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.update = async (request, response) => {
    const { _id } = request.params
    const { title, description, done, responsible } = request.body

    try {
        await Task.findOne({ _id }, (error, task) => {
            if (!task) response.json({ error: "Task doesn't exist!" })
            if (error) response.json({ error })

            task.title = title && title
            task.description = description && description
            task.done = done && done
            task.responsible = responsible && responsible

            task.save(error => {
                if (error) return response.json({ error })
                return response.json({ task })
            })
        })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.delete = async (request, response) => {
    const { _id } = request.params

    try {
        const task = Task.find({ _id })
        if (!task) response.json({ error: 'Task not found!' })
        await Task.deleteOne({ _id }, error => {
            if (error) response.json({ error })
            response.json({ message: 'Task deleted!' })
        })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}
