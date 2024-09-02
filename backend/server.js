const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Schema and model for Employee
const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  address: String,
  phoneNumber: String,
  email: String,
  employeeId: String,
  password: String,
});

const Employee = mongoose.model('Employee', employeeSchema, 'employee');

// Signup route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, role, address, phoneNumber, email, employeeId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, role, address, phoneNumber, email, employeeId, password: hashedPassword });
    await employee.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});
// Middleware to authenticate the user using JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Profile route
app.get('/api/auth/profile', authenticateJWT, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select('-password'); // Exclude password from the returned data
    if (!employee) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});



const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  dueDate: Date
});

const Task = mongoose.model('Task', taskSchema);

app.use(cors());


// Route to add a task
app.post('/api/tasks/add', async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      const newTask = new Task({
          title,
          description,
          assignedTo,
          dueDate
      });
      await newTask.save();
      res.status(201).json(newTask);
  } catch (error) {
      console.error('Error saving task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get current tasks
app.get('/api/tasks/current', async (req, res) => {
  try {
      const tasks = await Task.find(); // Fetch all tasks from the database
      res.status(200).json(tasks);
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
