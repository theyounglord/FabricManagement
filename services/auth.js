// import user model from './Model/user';
// import product model from './Model/product';

const user = require('../Model/user');
const product = require('../Model/product');

const signup = (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        user.findOne({ email }).then(user => { // check if user already exists
            if (user) {
                res.status(400).json({
                    error: 'User already exists'
                });
            } else {
                const newUser = new user({
                    name,
                    email,
                    password,
                    phone
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            res.json(user);
                        }
                        ).catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        }
                        );
                    }
                    );
                }
                );
            }
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            });
        }
        );
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

const login = (req, res) => {
    try {
        const { email, password } = req.body;
        user.findOne({ email }).then(user => {
            if (!user) {
                res.status(404).json({
                    error: 'User not found'
                });
            } else {
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone
                        };
                        jwt.sign(payload, config.secret, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: token
                            });
                        }
                        );
                    } else {
                        res.status(400).json({
                            error: 'Password incorrect'
                        });
                    }
                }
                ).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                }
                );
            }
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            });
        }
        );
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


module.exports = { signup , login };

