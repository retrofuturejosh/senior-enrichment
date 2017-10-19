const router = require('Express').Router();
const models = require('../db/models');
const Campus = models.Campus;
const Student = models.Student;

//GET ALL CAMPUSES
router.get('/', (req, res, next) => {
	Campus.findAll()
	.then(campuses => res.json(campuses))
	.catch(error => console.log(error))
})

//GET ONE CAMPUS
router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	Campus.findById(id)
	.then(campus => res.json(campus))
	.catch(error => console.log(error))
})

//POST NEW CAMPUS
router.post('/', (req, res, next) => {
	Campus.create(req.body)
	.then(campus => res.json(campus))
	.then(() => console.log('successfully added new campus ', req.body.name))
	.catch(error => console.log(error))
})


//UPDATE CAMPUS
router.put('/:id', (req, res, next) => {
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


//DELETE CAMPUS
router.delete('/:id', (req, res, next) => {
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

module.exports = router;