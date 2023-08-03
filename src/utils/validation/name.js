export default function isNameValid(name) {
    const nameRegex =
        /^(?:[\u00C0-\u017Fa-zA-Z])*(?:[-\s][\u00C0-\u017Fa-zA-Z]+)*$/;
    return nameRegex.test(name);
}
