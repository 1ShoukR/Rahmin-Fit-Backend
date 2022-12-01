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
	try {
		if (!email || !password) {
			res.status(400).send("invalid credentials")
		}
		const userToLogin = await UserAccount.findOne({
			where: {
				email: email,
				password: password,
			}
		})
		console.log("this is userToLogin", userToLogin)
		const userWeFound = userToLogin.dataValues
	} catch (error) {
		
	}
})



module.exports = router;