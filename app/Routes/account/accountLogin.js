const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { UserAccount } = require('../../models');



// route to query accounts
router.get('/account_test', async (req, res) => {
	const getUsers = await UserAccount.findAll()
	res.status(200).send(JSON.stringify(getUsers))
});




// route to create an account
router.post("/account_creation", async (req, res) =>{
	const {firstName, lastName, email, password} = req.body
	try {
		if (!firstName, !lastName, !password, !email){
			return res.status(400).send("Please check your information you entered is correct.")
		} else if (emailValidator.validate(email)) {
			const salt = await bcrypt.genSalt(5);
			const hashedPassword = await bcrypt.hash(password, salt);
			const encryptedUser = {
					password: hashedPassword,
					firstName: firstName,
					lastName: lastName,
					email: email,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			console.log('This is encryptedUser', encryptedUser);
			const createUser = await UserAccount.create(encryptedUser);
			res.status(200).send(JSON.stringify('Account Created!'));
		}
	} catch (error) {
		res.status(400).send(JSON.stringify({ message: 'There was an error creating your account' }));
		console.log(error);
	}
})


// route to login

router.post("/login_confirm", async (req, res) =>{
	const { email, password } = req.body
	console.log("This is req.body", req.body)
	if (!email || !password) {
		res.status(400).send("invalid credentials")
	} 
	try {
		const findUser = await UserAccount.findOne({
			where: {
				email: email,
			}
		})
		const userWeFound = findUser.dataValues
		const validatePassword = await bcrypt.compare(password, userWeFound.password);
		if(validatePassword) {
			console.log("user we found", userWeFound)
			req.session.user = userWeFound
			console.log("this is session", req.session)
			res.status(200).send(JSON.stringify({
				email: userWeFound.email,
				password: userWeFound.password
			}))
		}
	} catch (error) {
		res.status(400).send("User was not found")
	}
})


// route to delete account
router.post("/delete_confirm", async (req, res) => {
	console.log(req.body)
})



module.exports = router;