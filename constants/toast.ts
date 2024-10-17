import { toast } from 'react-toastify';
export const notifyError = ({
    message
}: {
    message: string
}) => toast.error(message, {
    position: 'top-right',
    toastId: "error",
    theme: "dark"
})

export const notifySuccess = ({ 
    message
} : {
    message: string
}) => toast.success(message, {
    position: 'top-right',
    toastId: "success",
    theme: "dark"
})

