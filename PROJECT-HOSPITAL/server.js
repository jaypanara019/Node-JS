const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

// Use middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.set("view engine", 'ejs');

// Serve the static files (e.g., images)
app.use(express.static('public'));

// Route to display the form
app.get('/', (req, res) => {
  res.render('index');  // Your EJS form
});

// Handle form submission
app.post('/submit', upload.single('patient_photo'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const patientData = {
    name: req.body.patient_name,
    age: req.body.patient_age,
    gender: req.body.patient_gender,
    disease: req.body.disease,
    photo: req.file ? req.file.path : null
  };

  res.redirect(`/edit?name=${patientData.name}&age=${patientData.age}&gender=${patientData.gender}&disease=${patientData.disease}&photo=${patientData.photo}`);
}, (error, req, res, next) => {
  res.status(500).send('File upload failed.');
});

// Route to display the edit form with pre-filled data
app.get('/edit', (req, res) => {
  const { name, age, gender, disease, photo } = req.query;

  if (!name || !age || !gender || !disease || !photo) {
    return res.status(400).send('Missing patient data.');
  }

  res.render('edit', { name, age, gender, disease, photo });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
