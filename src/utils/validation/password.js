export default function isPasswordValid(password) {
    const regex = /^.{8,20}$/;
    return regex.test(password);
}
