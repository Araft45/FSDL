const pool = require('../config/db');

// CREATE a new user
async function createUser(name, email) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    
    try {
        const res = await pool.query(query, values);
        return res.rows[0]; // Return the newly created user
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

// READ all users
async function getUsers() {
    const query = 'SELECT * FROM users';
    
    try {
        const res = await pool.query(query);
        return res.rows; // Return all users
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}

// READ a user by ID
async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    
    try {
        const res = await pool.query(query, values);
        return res.rows[0]; // Return the user if found
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err;
    }
}

// UPDATE a user by ID
async function updateUser(id, name, email) {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [name, email, id];
    
    try {
        const res = await pool.query(query, values);
        return res.rows[0]; // Return the updated user
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

// DELETE a user by ID
async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    
    try {
        await pool.query(query, values);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
