const UserModel = require('../models/user.model');

class AuthController {

    // user account login
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await UserModel.findOne({ email, password })
            if (!data) return res.status(400).json({ message: 'Login failed!' })
            return res.status(200).json({ success: true, message: 'Login Successfully.', _details: data })
        } catch (error) {
            return res.status(400).json({ message: 'Something went wrong!' })
        }
    }

    // user account register
    createAccount = async (req, res) => {
        const { name, phone, email, password } = req.body;
        try {
            const data = await UserModel.findOne({ email })
            if (data) return res.status(400).json({ message: 'Already Registered.' })
            const newUser = new UserModel({ name, phone, email, password })
            newUser.save((error, _acc) => {
                if (error) return res.status(400).json({ message: error })
                if (_acc) return res.status(200).json({ success: true, message: 'Registered Successfully.', _details: _acc })
            })
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    };


}

module.exports = new AuthController;
