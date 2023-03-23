const db = require('../../Config/db')
const bcrypt = require('bcrypt');

class RegisterController {
    //[Post] /register
    register(req, res, result) {
        const { username, password, email, full_name } = req.body;
        const saltRounds = 10;

        // Generate a salt for password hashing
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error generating salt for password hashing');
            }

            // Hash the password using the generated salt
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error hashing password');
                }

                // Store the new user in the database
                const query = `INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)`;
                db.query(query,[username, hash, email, full_name], function(error, results, fields) {
                        if (error) {
                            console.log(error);
                            return res.status(500).send('Error creating user account');
                        }
                        
                        return res.status(200).send('User account created successfully');
                    });
            });
        });

    }
}

module.exports = new RegisterController;