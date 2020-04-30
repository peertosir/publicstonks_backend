const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title length is 100 symbols max'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description length is 1000 symbols max'],
  },
  gitRepoUrl: {
    type: String,
    trim: true,
    required: false,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
      'URL is not valid',
    ],
  },
  boardUrl: {
    type: String,
    trim: true,
    required: false,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
      'URL is not valid',
    ],
  },
  docsUrl: {
    type: String,
    trim: true,
    required: false,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
      'URL is not valid',
    ],
  },
  chatUrl: {
    type: String,
    trim: true,
    required: false,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
      'URL is not valid',
    ],
  },
  peopleNeeded: {
    type: [String],
    required: false,
    enum: ['Developer', 'Designer', 'QA'],
  },
  rating: {
    type: Number,
    min: [1, 'Minimum rating is 1'],
    max: [10, 'Maximum rating is 10'],
  },
  status: {
    type: String,
    required: true,
    default: 'NEW',
    enum: ['NEW', 'ACTIVE', 'NOT ORGANIZED', 'BANNED', 'CLOSED'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create slug from title
ProjectSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
