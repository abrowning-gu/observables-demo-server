module.exports = function (app) {
    //Route to manage user logins
    app.post('/api/auth', function (req, res) {
        let users = [
            { 'email': 'abc@com.au', 'pwd': '123', 'id': 1, 'username': 'allan' },
            { 'email': 'abd@com.au', 'pwd': '123', 'id': 2, 'username': 'Jodi' },
            { 'email': 'abe@com.au', 'pwd': '123', 'id': 3, 'username': 'Sarah' }]

        if (!req.body) {
            return res.sendStatus(400)
        }

        var customer = {};

        customer.valid = false;
        customer.email = '';
        customer.username = '';

        for (let i = 0; i < users.length; i++) {
            if (req.body.email == users[i].email && req.body.upwd == users[i].pwd) {
                customer.valid = true;
                customer.email = users[i].email;
                customer.username = users[i].username;

            }
        }

        res.send(customer);

    });
}
