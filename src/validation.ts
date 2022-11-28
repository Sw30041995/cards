export const  validation = {
    emailCheck<D>(setErrors: (errors: D) => void, errors: D, email: string) {
        if (!email) {
            setErrors({...errors, email: 'Required'})
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setErrors({...errors, email: 'Invalid email address'})
        }
    },
    passwordCheck<D>(setErrors: (errors: D) => void, errors: D, password: string) {
        if (!password) {
            setErrors({...errors, password: 'Required'})
        } else if (password.length < 8) {
            setErrors({...errors, password: 'Must be at least 8 characters'})
        }
    },
    confirmPasswordCheck<D>(setErrors: (errors: D) => void, errors: D, confirmPassword: string) {
        if (!confirmPassword) {
            setErrors({...errors, confirmPassword: 'Required'})
        } else if (confirmPassword.length < 8) {
            setErrors({...errors, confirmPassword: 'Must be at least 8 characters'})
        }
    }
}