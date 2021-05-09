require('dotenv').config();
var Genre = require('../models/genre')
var Subgenre = require('../models/subgenre')
var mongoose = require('mongoose');
var db = mongoose.connection;

const genresName = {
  'Development': ['Web Development', 'Data Science', 'Mobile Development', 'Programming Languages', 'Game Development', 'Database Design & Development', 'Software Testing', 'Software Engineering', 'Development Tools', 'No-Code Development'],
  'Business': ["Entrepreneurship", "Communications", "Management", "Sales", "Business Strategy", "Operations", "Project Management", "Business Law", "Business Analytics &amp; Intelligence", "Human Resources", "Industry", "E-Commerce", "Media", "Real Estate", "Other Business"],
  'Finance & Accounting': ["Accounting &amp; Bookkeeping", "Compliance", "Cryptocurrency &amp; Blockchain", "Economics", "Finance", "Finance Cert &amp; Exam Prep", "Financial Modeling &amp; Analysis", "Investing &amp; Trading", "Money Management Tools", "Taxes", "Other Finance &amp; Accounting"],
  'IT & Software': ["IT Certification", "Network &amp; Security", "Hardware", "Operating Systems", "Other IT &amp; Software"],
  'Office Productivity': ["Microsoft", "Apple", "Google", "SAP", "Oracle", "Other Office Productivity"],
  'Personal Development': ["Personal Transformation", "Personal Productivity", "Leadership", "Career Development", "Parenting &amp; Relationships", "Happiness", "Esoteric Practices", "Religion &amp; Spirituality", "Personal Brand Building", "Creativity", "Influence", "Self Esteem &amp; Confidence", "Stress Management", "Memory &amp; Study Skills", "Motivation", "Other Personal Development"],
  'Design': ["Web Design", "Graphic Design &amp; Illustration", "Design Tools", "User Experience Design", "Game Design", "Design Thinking", "3D &amp; Animation", "Fashion Design", "Architectural Design", "Interior Design", "Other Design"],
  'Marketing': ["Digital Marketing", "Search Engine Optimization", "Social Media Marketing", "Branding", "Marketing Fundamentals", "Marketing Analytics &amp; Automation", "Public Relations", "Advertising", "Video &amp; Mobile Marketing", "Content Marketing", "Growth Hacking", "Affiliate Marketing", "Product Marketing", "Other Marketing"],
  'Lifestyle': ["Arts &amp; Crafts", "Beauty &amp; Makeup", "Esoteric Practices", "Food &amp; Beverage", "Gaming", "Home Improvement", "Pet Care &amp; Training", "Travel", "Other Lifestyle"],
  'Photography & Video': ["Digital Photography", "Photography", "Portrait Photography", "Photography Tools", "Commercial Photography", "Video Design", "Other Photography &amp; Video"],
  'Health & Fitness': ["Instruments", "Music Production", "Music Fundamentals", "Vocal", "Music Techniques", "Music Software", "Other Music"],
  'Music': ["Instruments", "Music Production", "Music Fundamentals", "Vocal", "Music Techniques", "Music Software", "Other Music"],
  'Teaching & Academics': ["Engineering", "Humanities", "Math", "Science", "Online Education", "Social Science", "Language", "Teacher Training", "Test Prep", "Other Teaching &amp; Academics"],
};

const createGenres = async () => {
  for (const genreName in genresName) {
    const subGenresName = genresName[genreName];
    const genre = new Genre({ name: genreName, subgenres: [] })
    await genre.save()
    for (const subGenreName of subGenresName) {
      const subGenre = new Subgenre({ name: subGenreName, genre: genre._id });
      await subGenre.save();
      await genre.updateOne({ $push: { subgenres: subGenre._id } })
    }
  }
}

db.once('open', function () {
  createGenres()
})

mongoose.connect(process.env.MONGODB_URL);