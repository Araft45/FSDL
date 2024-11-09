const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // JSON parser

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Sample data
let blogPosts = [
    { id: 1, title: 'First Post', content: 'This is my first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is my second blog post.' }
];

// CREATE: Add a new blog post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = { id: blogPosts.length + 1, title, content };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// READ: Get all blog posts
app.get('/posts', (req, res) => {
    res.json(blogPosts);
});

// READ: Get a blog post by ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
});

// UPDATE: Update a blog post by ID
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    post.title = title;
    post.content = content;

    res.json(post);
});

// DELETE: Remove a blog post by ID
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    blogPosts.splice(postIndex, 1);
    res.status(204).send(); // 204 No Content, as the post has been deleted
});

// Global error handler for any unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Default route for base URL
app.get('/', (req, res) => {
    res.send('Welcome to the Blog Posts API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
