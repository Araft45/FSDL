// Function to create a user
async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert("Please fill out both fields!");
        return;
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            alert("User created successfully!");
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            fetchUsers();
        } else {
            alert("Error creating user.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to create user.");
    }
}

// Function to fetch all users and display in a table
async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Clear existing rows

        if (users.length > 0) {
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>`;
                userList.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3">No users found.</td>';
            userList.appendChild(row);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to fetch users.");
    }
}

// Function to update a user
async function updateUser() {
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    const email = document.getElementById('update-email').value;

    if (!id || !name || !email) {
        alert("Please fill out all fields!");
        return;
    }

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            alert("User updated successfully!");
            document.getElementById('update-id').value = '';
            document.getElementById('update-name').value = '';
            document.getElementById('update-email').value = '';
            fetchUsers();
        } else {
            alert("Error updating user.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to update user.");
    }
}

// Function to delete a user
async function deleteUser() {
    const id = document.getElementById('delete-id').value;

    if (!id) {
        alert("Please enter a user ID to delete!");
        return;
    }

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("User deleted successfully!");
            document.getElementById('delete-id').value = '';
            fetchUsers();
        } else {
            alert("Error deleting user.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to delete user.");
    }
}
