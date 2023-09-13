import ErrorMessage from "../../../components/layout/ErrorMessage";
import BackButton from "../../../components/layout/BackButton";

export default function Unauthorized() {
    const message = "Autorisation nécessaire";

    return (
        <div>
            <ErrorMessage message={message} />
            <BackButton />
        </div>
    );
}
