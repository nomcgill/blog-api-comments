'use strict';

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const blogSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, default: Date.now}
});

blogSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    title: this.title,
    content: this.content,
    created: this.created
  }
}

const BlogPost = mongoose.model("BlogPost", blogSchema);

module.exports = { BlogPost };