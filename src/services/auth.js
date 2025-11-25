export const AUTH_KEY = "hotel_app_auth_v1";

export const auth = {
    getUsers() {
        try {
            const raw = localStorage.getItem(AUTH_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            return parsed?.users || [];
        } catch (e) {
            console.error("auth.getUsers error", e);
            return [];
        }
    },
    // AHRA-11: Implemented user registration with localStorage persistence

    saveUsers(users) {
        const data = {
            users,
            currentUser: this.getCurrentUser()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    },

    getCurrentUser() {
        try {
            const raw = localStorage.getItem(AUTH_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            return parsed?.currentUser || null;
        } catch {
            return null;
        }
    },

    login(username, password) {
        const users = this.getUsers();
        const hash = btoa(password); // simple local hashing (not secure for production)
        const user = users.find(u => u.username === username && u.passwordHash === hash);
        if (!user) return null;

        localStorage.setItem(AUTH_KEY, JSON.stringify({
            users,
            currentUser: user
        }));

        return user;
    },

    register(username, password) {
        const users = this.getUsers();
        if (users.find(u => u.username === username)) {
            return { error: "Username already exists" };
        }

        const newUser = {
            id: "u_" + Date.now(),
            username,
            passwordHash: btoa(password)
        };

        users.push(newUser);
        this.saveUsers(users);

        return newUser;
    },

    logout() {
        const users = this.getUsers();
        localStorage.setItem(AUTH_KEY, JSON.stringify({
            users,
            currentUser: null
        }));
    }
};
