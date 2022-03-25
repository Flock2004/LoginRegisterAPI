const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


const getAllUsers = ((req, res) => {
    User.find({})
        .then(result => res.status(200).render('users', {users: result}))
        .catch(error => res.status(500).json({msg: error}))
})

const registerView = ((req, res) => {
    res.render('register')
})

const registerUser = ((req, res, next) => {
    bcrypt.hash(req.body.mdp, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                mdp: hash
            })
            user.save()
            .then(() => res.status(201).redirect('/login'))
            .catch((error) => res.status(400).json({error}))
        })
        .catch((error) => res.status(500).json({error}))
})

const loginView = ((req, res) => {
    res.render('login')
})

const loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }
        bcrypt.compare(req.body.mdp, user.mdp)
          .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' })
                }
                const token = {
                    userId: user._id,
                    token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                    )
                }
                res.cookie('token', token)
                res.redirect('/users')
            })
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

module.exports = {getAllUsers, loginView, loginUser, registerView, registerUser}