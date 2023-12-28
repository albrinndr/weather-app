const USER = require('../model/userModel');

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await USER.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already Exists' });
        } else {
            const user = new USER({ email, password });
            await user.save();
            res.status(200).json({ message: "Signup successful!" });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await USER.findOne({ email });

        if (user && user.password === password) {
            const user = await USER.findOne({ email });
            req.session.userId = user._id;
            res.status(200).json({ message: "Login Success!", locations: user.locations });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });

    }
};

const addLocation = async (req, res) => {
    try {
        if (req.session.userId) {
            const location = req.query.location;
            const updatedLocation = await USER.findOneAndUpdate(
                { _id: req.session.userId },
                { $addToSet: { locations: location } },
                { new: true }
            );

            if (updatedLocation) {
                res.status(200).json({ message: 'Location saved!', locations: updatedLocation.locations });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });

    }
};

const removeLocation = async (req, res) => {
    try {
        if (req.session.userId) {
            const location = req.query.location;

            const updatedLocation = await USER.findOneAndUpdate(
                { _id: req.session.userId },
                { $pull: { locations: location } },
                { new: true }
            );

            if (updatedLocation) {
                res.status(200).json({ message: 'Location removed!', locations: updatedLocation.locations });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });

    }
};

const userLocations = async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await USER.findOne({ _id: req.session.userId });
            res.status(200).json({ locations: user.locations });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });

    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    signUp,
    login,
    addLocation,
    removeLocation,
    logout,
    userLocations
};