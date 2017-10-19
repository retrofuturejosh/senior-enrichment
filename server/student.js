const router = require('Express').Router();
const models = require('../db/models');
const Campus = models.Campus;
const Student = models.Student;


//GET ALL STUDENTS FROM ONE CAMPUS
router.get('/campus/:campusid', (req, res, next) => {
	let campusId = req.params.campusid.toString();
	Student.findAll({
			where: {
				campusId: campusId
			}
		})
		.then(students => res.json(students))
		.catch(error => console.log(error))
})

//GET ONE STUDENT
router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	Student.findById(id, {
			include: [{
				model: Campus
			}]
		})
		.then(student => res.json(student))
		.catch(error => console.log(error))
})

//GET ALL STUDENTS
router.get('/', (req, res, next) => {
	Student.findAll({
			include: [{
				model: Campus
			}]
		})
		.then(students => res.json(students))
		.catch(error => console.log(error))
})

//POST NEW STUDENT
router.post('/', (req, res, next) => {
	Student.create(req.body)
		.then(student => res.json(student))
		.then(() => {
			console.log('successfully added new student ', req.body)
		})
		.catch(error => {
			console.log(error)
			res.send(error);
		})
})


//UPDATE STUDENT
router.put('/:id', (req, res, next) => {
	Student.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(student => {
			return student.update(req.body)
		})
		.then(updatedStudent => {
			console.log('success');
			res.json(updatedStudent);
		})
		.catch(error => console.log(error))
})

//DELETE STUDENT
router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	Student.findById(id)
		.then(student => {
			student.destroy()
		})
		.then(() => {
			console.log('successfully removed student');
			res.send('Successfully removed student');
		})
		.catch(error => {
			return res.send(error);
		})
})

module.exports = router;