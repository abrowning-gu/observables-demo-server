module.exports = function (app,path,fs) {
    //Route to manage user logins


    app.post('/api/auth', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        fs.readFile('data/users.json','utf8',(err,data)=>{
            if (err) {
              console.error(err)
              return
            }
            try{
                //console.log(data);
              let users = JSON.parse(data);
              //console.log(users);
              users = users.people;
              
              
    
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
          //  {"people": [
          //   { "email": "abc@com.au", "pwd": "123", "id": 1, "username": "allan","avatar":"" },
          //   { "email": "abd@com.au", "pwd": "123", "id": 2, "username": "Jodi" ,"avatar":""},
          //  { "email": "abe@com.au", "pwd": "123", "id": 3, "username": "Sarah" ,"avatar":""}]}

       

       

    });
}
