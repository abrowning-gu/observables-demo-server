module.exports = function(app,formidable,fs,path){
    //Route to manage image file uploads
    
    app.post('/api/updateuser', (req, res) => {
        let data = req.body;
        //console.log('data', data);

        //read current user information
        fs.readFile('data/users.json','utf8',(err,users)=>{
            if (err) {
              console.error(err)
              return
            }
            try{
                users = JSON.parse(users);
                 for(let i=0;i<users.people.length;i++){
                    
                     if(users.people[i].id == data.user.id){
                       //find the user you are wanting to update and grab their password and save it to the new user.
                        data.user.pwd = users.people[i].pwd;
                        //remove the old user record
                        users.people.splice(i,1);
                        //add a new record for hat user to the beginning of the array.
                        users.people.unshift(data.user);
                     }
                
                    
                 }
                 fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
                        if (err){
                          console.log(err);
                          return res.sendStatus(400);
                        }
                        else {
                          console.log("File written successfully\n");
                          res.send({ok:true});
                        }
                      });
            
            }catch(err){
                console.log("Error parsing the userdata");
                return res.sendStatus(400);
            }
        })
        

    });
}