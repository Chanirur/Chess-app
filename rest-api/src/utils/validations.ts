export const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isValidUsername = (username: string): boolean => usernameRegex.test(username);
export const isValidEmail = (email: string): boolean => emailRegex.test(email);