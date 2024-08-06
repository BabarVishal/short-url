const User = require("../models/user")
const {setUser} = require("../service/auth")


async function handelUserSignup(req, res) {
    const {name, email, password} = req.body;
   const user = await User.create({
        name,
        email,
        password
    })
  console.log("Signup success", user)
    return res.redirect("/")
}


async function handelUserLogin(req, res) {
  const {email, password} = req.body;

  const user = await User.findOne({ email, password})
   if (!user) return res.render("login", {
       error: "Invalid Username and password"
   })
     
  const token = setUser(user);
  res.cookie("uid", token)

    console.log("login success", user)
    return res.redirect("/")
}


module.exports = {
    handelUserSignup,
    handelUserLogin

}