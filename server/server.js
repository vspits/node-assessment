
// // // // // IMPORTS // // // // //

const express = require('express')
const ctrl = require('./usersCtrl')
const app = express()

// // // // // MIDDLEWARE // // // // //

app.use(express.json())


// // // // // ENDPOINTS // // // // //

app.get(`/api/user`, ctrl.getAllUsers)
app.get(`/api/user/:userid`, ctrl.getUserId)
app.get(`/api/admin`, ctrl.getAdmins)
app.get(`/api/nonadmin`, ctrl.getNonadmins)
app.get(`/api/type/:user`, ctrl.getUserType)
app.put(`/api/user/:id`, ctrl.updateUser)
app.post(`/api/user`, ctrl.addUser)
app.delete(`/api/user/:userId`, ctrl.deleteUser)


// // // // // SERVER MAGIC // // // // //

const PORT = 3000
app.listen(PORT, () => console.log(`${PORT} is werkin hard`))