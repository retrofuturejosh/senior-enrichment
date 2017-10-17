'use strict'
const api = require('express').Router()
const models = require('../db/models');
const Campus = models.Campus;
const Student = models.Student;



// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res, next) => res.send({hello: 'world'}))

//GET ONE CAMPUS
api.get('/campus/:id', (req, res, next) => {
	let id = req.params.id;
	Campus.findById(id)
	.then(campus => res.json(campus))
	.catch(error => console.log(error))
})

//GET ALL CAMPUSES
api.get('/campus', (req, res, next) => {
	Campus.findAll()
	.then(campuses => res.json(campuses))
	.catch(error => console.log(error))
})

//GET ALL STUDENTS FROM ONE CAMPUS
api.get('/student/campus/:campusid', (req, res, next) => {
	let campusId = req.params.campusid.toString();
	Student.findAll({where: { campusId: campusId }})
	.then(students => res.json(students))
	.catch(error => console.log(error))
})

//GET ONE STUDENT
api.get('/student/:id', (req, res, next) => {
	let id = req.params.id;
	Student.findById(id, {include : [{model: Campus}]})
	.then(student => res.json(student))
	.catch(error => console.log(error))
})

//GET ALL STUDENTS
api.get('/student', (req, res, next) => {
	Student.findAll({include : [{model: Campus}]})
	.then(students => res.json(students))
	.catch(error => console.log(error))
})



//POST NEW CAMPUS
api.post('/campus', (req, res, next) => {
	Campus.create(req.body)
	.then(campus => res.json(campus))
	.then(() => console.log('successfully added new campus ', req.body.name))
	.catch(error => console.log(error))
})

//POST NEW STUDENT
api.post('/student', (req, res, next) => {
	Student.create(req.body)
	.then(student => res.json(student))
	.then(() => console.log('successfully added new student ', req.body.name))
	.catch(error => console.log(error))
})

//UPDATE CAMPUS
api.put('/campus/:id', (req, res, next) => {
	Campus.findOne({where: {id: req.params.id}})
	.then(campus => {
		return campus.update(req.body)
	})
	.then(updatedCampus =>{
		console.log('success');
		res.json(updatedCampus);
	})
	.catch(error => console.log(error))
})

//UPDATE STUDENT
api.put('/student/:id', (req, res, next) => {
	Student.findOne({where: {id: req.params.id}})
	.then(student => {
		return student.update(req.body)
	})
	.then(updatedStudent =>{
		console.log('success');
		res.json(updatedStudent);
	})
	.catch(error => console.log(error))
})

//DELETE CAMPUS
api.delete('/campus/:id', (req, res, next) => {
	let id = req.params.id;
	Campus.findById(id)
	.then(campus => {
		return campus.destroy()
	})
	.then(() =>{
		console.log('successfully removed campus');
		res.send('Successfully removed campus');
	})
	.catch(error => console.log(error))
})

//DELETE STUDENT
api.delete('/student/:id', (req, res, next) => {
	let id = req.params.id;
	Student.findById(id)
	.then(student => {
		return student.destroy()
	})
	.then(() =>{
		console.log('successfully removed student');
		res.send('Successfully removed student');
	})
	.catch(error => console.log(error))
})


module.exports = api