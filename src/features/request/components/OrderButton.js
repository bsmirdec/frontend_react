import { useNavigate } from "react-router-dom";
import { useCart } from "../../products/context/CartContext";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useCreateOrderMutation from "../hooks/useCreateOrderMutation";
import { Button } from "@mui/material";

const OrderButton = ({ worksite, dateTime }) => {
    const { businessData } = useBusiness();
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const createOrderMutation = useCreateOrderMutation();

    const handleOrder = async () => {
        const order = {
            worksite: worksite.worksite_id,
            date_time: dateTime,
        };
        const order_lines = JSON.stringify(cart);
        try {
            const response = await createOrderMutation.mutateAsync({
                order: order,
                order_lines: order_lines,
                employee_id: businessData.employeeId,
            });
            console.log(response);
            setCart([]);
            navigate("/request/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleOrder}>
            Passer commande
        </Button>
    );
};

export default OrderButton;
