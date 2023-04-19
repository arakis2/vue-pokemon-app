import { format } from "date-fns";

const formatDate = (date: Date = new Date()): string => {
    if (typeof(date) === "string"){ // Pfff... Merci javascript !
        date = new Date(date);
    }
    return format(date, 'dd/MM/yyyy');
}

export default formatDate;