module.exports = function (app,db) {
    //Route to manage user logins


    app.post('/api/auth', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }

        users = await db.collection("users").find({}).toArray();
       
        try{
          var customer = {};
          customer.id=0;
          customer.email = '';
          customer.username = '';
    
            for (let i = 0; i < users.length; i++) {
                if (req.body.email == users[i].email && req.body.upwd == users[i].pwd) {
                    
                    customer.id = users[i].id;
                    customer.email = users[i].email;
                    customer.username = users[i].username;
                    customer.avatar = users[i].avatar;
                    customer.pwd = "";
    
                }
            }
            res.send(customer);
            
            }catch(err){
              console.log("Error parsing the userdata at login");
            }
              
        })
}
