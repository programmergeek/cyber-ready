import { createContext, useState } from "react";
import { User, UserContext } from "~/types";

export const userContext = () => {
    const [user, updateUser] = useState<User>()
    return createContext<UserContext>({
        user: user,
        updateUser: updateUser 
    })
}
