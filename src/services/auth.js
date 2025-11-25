const USERS_KEY = "users_db";
const SESSION_KEY = "currentUser";

export const auth = {
    getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    },

    saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },

    register(username, password) {
        const users = this.getUsers();

        if (users.find((u) => u.username === username)) {
            return { error: "Username already exists" };
        }

        users.push({ username, password });
        this.saveUsers(users);

        return { success: true };
    },

    login(username, password) {
        const users = this.getUsers();
        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) return null;

        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        return user;
    },

    logout() {
        localStorage.removeItem(SESSION_KEY);
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    }
};
