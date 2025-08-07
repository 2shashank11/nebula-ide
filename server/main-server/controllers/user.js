

const handleGetUserInfo = async (req, res) => {
    //get user info
    const userData = req.user;
    if (!userData) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({user: {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        name: userData.name,
    } });
}

const handleUserUpdate = async (req, res) => {
    //update user info
}

module.exports = {
    handleGetUserInfo,
    handleUserUpdate,
};