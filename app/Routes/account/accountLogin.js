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
router.post("/create-account", async (req, res) =>{
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
router.post("/login", async (req, res) =>{
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
				id: userWeFound.id,
				email: userWeFound.email,
				password: userWeFound.password
			}))
		}
	} catch (error) {
		res.status(400).send("User was not found")
	}
})



// route to update account password/email


// this route will not update the password for some reason. needs debugging.
router.post("/update", async (req, res) => {
	const { email, password } = req.body
	try {
		const findUser = await UserAccount.findOne({
			where: {
				email: email
			}
		})
		console.log("this is findUser", findUser)
		if (findUser) {
			const salt = await bcrypt.genSalt(5);
			const hashedPassword = await bcrypt.hash(password, salt);
			findUser.passsword = hashedPassword
			console.log("This is findUser.password", findUser.password)
			findUser.update({
				email: email,
				password: hashedPassword,
				updatedAt: new Date()
			})
		}
		res.status(200).send(JSON.stringify({
			message: "Your password has been updated!"
		}))
	} catch (error) {
		res.status(400).send(JSON.stringify({
			message: "there was an error updating your password"
		}))
	}
})






// route to delete account
router.post("/delete", async (req, res) => {
	const deleteUser = await UserAccount.findOne({
		where: {
			id: req.session.user.id
		}
	})
	if (deleteUser) {
		await deleteUser.destroy()
		res.status(200).send("User account deleted")
	} else {
		res.status(400).send("This user does not exist")
	}
})



module.exports = router;