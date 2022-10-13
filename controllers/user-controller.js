const { Thought, User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .sort({ createdAt: -1 })
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createUser(req,res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateUser(req,res) {
        User.findOneAndUpdate ({ _id: req.params.userId }, { $set:req.body }, { runValidators: true, new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteUser(req,res) {
        User.findOneAndRemove ({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id' });
            }
            return Thought.deleteMany({_id:{$in:dbUserData.thoughts}})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addFriend(req,res) {
        User.findOneAndUpdate ({ _id: req.params.userId }, { $addToSet:{ friends: req.params.friendId }}, { runValidators: true, new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    removeFriend(req,res) {
        User.findOneAndUpdate ({ _id: req.params.userId }, { $pull:{ friends: req.params.friendId }}, { runValidators: true, new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = userController;