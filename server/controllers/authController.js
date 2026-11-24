const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req,res)=>{

    try {
        const {name, phone,email,password}= req.body;

        if (!name || !email || !password){
            return res.status(400).json({message: "Lack credentials"});
        }

        const existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({message: 'User already exists'});

        const secure = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, phone, email, password: secure });
        const { password: _, ...safeUser } = newUser.toObject();
        return res.status(201).json(safeUser);

    } catch (error) {
        console.log("Error while registering => ", error);
        return res.status(500).json({ message: "Server error" });
    }
}

const login = async (req,res) => {
    try {
        
        const {email, password} = req.body;

        const exist = await User.findOne({email});
        if(!exist) return res.status(401).json({message: "Invalid credentials"});

        const valid = await bcrypt.compare(password, exist.password);
        if(!valid) return res.status(401).json({message: "Invalid credentials"});

        const token = jwt.sign({ id: exist._id, role: exist.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const { password: _, ...safeUser } = exist.toObject();
        return res.status(200).json({ message: "Login successful", token, user: safeUser });

    } catch (error) {
        console.log("Error while login => ", error)
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    register,
    login
}