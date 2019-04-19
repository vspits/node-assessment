const userData = require('./../userData.json')

module.exports = {
    getAllUsers: (req, res, next) => {
        const { age, email, favorites } = req.query

        const queryMap = userData.map(user => {
            if(user.age < age){
                console.log(user)
                res.send(user)
            } 
    
            if(user.email === email){
                res.send(user)
            }
    
            if(user.favorites.includes(favorites)){
                res.send(user)
            }
        })

        res.status(200).send(userData)

    },
    getUserId: (req, res, next) => {
        // find the user id and convert to a number with +
        const findUserId = userData.findIndex(user => user.id === +req.params.userid)
        
        // if there was an id found, it will send. If not, return as not found.
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
        const { id } = req.params
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body

        const updatedUsers = userData.map(user => {
            // console.log(id)
            if(user.id === id){
                user.first_name.push(first_name)
                user.last_name.push(last_name)
                user.email.push(email)
                user.gender.push(gender)
                user.language.push(language)
                user.age.push(age)
                user.city.push(city)
                user.state.push(state)
                user.type.push(type)
                user.favorites.push(favorites)
            }
        })

        // console.log(updatedUsers)
        res.status(200).send(updatedUsers)
    },
    addUser: (req, res, next) => {

        //figure out the length of the current array and make the id equal to that plus one
        let id = userData[userData.length - 1].id + 1

        //make the new user object
        const newUser = {
            id: id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email, 
            gender: req.body.gender, 
            language: req.body.language, 
            age: req.body.age, 
            city: req.body.city, 
            state: req.body.state, 
            type: req.body.type, 
            favorites: req.body.favorites
        }

        //add new user to the end of the array
        userData.push(newUser)
        res.sendStatus(201)
    },
    deleteUser: (req, res, next) => {
        //get the user id to delete off of params
        const userToDelete = req.params.id*1

        //find the index of the user to delete based on id
        let userIndex = userData.findIndex(user => user.index === userToDelete)

        //remove the users index with splice
        userData.splice(userIndex, 1)

        //send back userData after spliced
        res.status(200).send(userData)
    }
}