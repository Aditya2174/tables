import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

async function connectToDatabase() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect("mongodb+srv://gargaditya2174:DPadi197$@cluster0.ow7ii5j.mongodb.net/mydb?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        const port = 9002;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // User not registered
            return res.status(401).json({ message: "User not registered" });
        }

        // Check if the password matches
        if (password === user.password) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Password didn't match" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/store-user", async (req, res) => {
    // Extract user data from the request body
    try {
        const { email, name } = req.body;

        const existingUser = await User.findOne({ email });
        // Create a new user document and save it to the database
        if (existingUser) {
            // User already registered
            return res.status(201).json({ message: "Success" });
        }

        // Create a new user instance
        const newUser = new User({
            name,
            email,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "Successfully Registered , No need to login" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user with the given email already exists 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // User already registered 
            console.log(existingUser);
            return res.status(201).json({ message: "User already registered" });
        }
        
        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "Successfully Registered, Please login now." });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

connectToDatabase()
    .then(() => {
        app.listen(3001, () => {
            console.log("Server is running on port 3001");
        });
    })
    .catch((error) => {
        console.error("Error starting the server:", error);
    });