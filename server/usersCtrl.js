let userData = require('./../userData.json')

module.exports = {
    getAllUsers: (req, res, next) => {
        res.status(200).send(userData)
    },
    getUserId: (req, res, next) => {
        const findUserId = userData.findIndex(user => user.id === +req.params.userid)
        
        if(userData[findUserId]){
            res.status(200).send(userData[findUserId])
        }
        else if(!userData[findUserId]){
            res.sendStatus(404)
        }
    },
    getAdmins: (req, res, next) => {
        const isAdmin = userData.filter(user => user.type == "admin" )
        // console.log(isAdmin)
        res.status(200).send(userData[isAdmin])
    },
    getNonadmins: (req, res, next) => {
        const isNotAdmin = userData.filter(user => user.type != "admin" )
        // console.log(isNotAdmin)
        res.status(200).send(userData[isNotAdmin])
    },
    getUserType: (req, res, next) => {
        const userType = userData.filter(user => user.type === req.params.user)
        // console.log(userType)
        res.status(200).send(userData[userType])
    },
    updateUser: (req, res, next) => {
        
    },
    addUser: (req, res, next) => {
        req.body.id = id
        id++
        userData.push(req.body)
        res.sendStatus(201)
    },
    deleteUser: (req, res, next) => {
        userData = userData.filter(user => user.id !== +req.params.id)
        res.status(200).send(userData)
    }
}