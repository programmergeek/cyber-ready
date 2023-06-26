import { Dispatch, SetStateAction } from "react";

export interface User{
    email?: string,
    name: string,
    userHash?: string,
}

export interface UserContext{
    user?: User,
    updateUser: Dispatch<SetStateAction<User | undefined>>
}