module.exports = function (app,fs) {
    //Route to manage user logins


    app.get('/api/cars', function (req, res) {
        
        fs.readFile('data/cars.json','utf8',(err,data)=>{
            if (err) {
              console.error(err)
              return
            }
            try{
              
              res.send(JSON.stringify(data));
            
            }catch(err){
              console.log("Error getting list of cars");
            }
              
           })
    });
}
