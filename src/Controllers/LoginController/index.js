const db = require('../../Config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
    
        // Kiểm tra xem username và password có hợp lệ không
        if (!username || !password) {
            res.status(400).json({message: 'Username and password are required'});
            return;
        }
    
        // Lấy thông tin người dùng từ cơ sở dữ liệu
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], function(error, results, fields) {
            if (error) throw error;
    
            // Kiểm tra xem người dùng có tồn tại hay không
            if (results.length === 0) {
                res.status(401).json({message: 'Invalid username or password'});
                return;
            }
    
            // So sánh mật khẩu
            const user = results[0];
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) throw err;
    
                if (result) {
                    // Nếu mật khẩu hợp lệ, tạo token và gửi lại cho người dùng
                    const token = jwt.sign({id: user.id}, 'secret');
                    res.json({token: token});
                } else {
                    // Nếu mật khẩu không hợp lệ, trả về thông báo lỗi
                    res.status(401).json({message: 'Invalid username or password'});
                }
            });
        });
    }
    
}

module.exports = new LoginController;