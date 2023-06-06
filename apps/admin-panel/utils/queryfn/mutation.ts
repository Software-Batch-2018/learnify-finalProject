import axios, { AxiosError } from "axios";
import { API } from "../api";



type Methods = "POST" | "PUT" | "DELETE" | "PATCH";
const createMutation =
(route: string, method: Methods = "POST") =>
        (body: any, headers = {}) =>
            axios(`${API}/${route}`, {
                data: body, method, headers: {
                    ...headers,
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.data).catch((e: AxiosError) => {
                if (e.response!.status < 400) {
                    if ((e.response as any)?.data?.message) {
                        return (e.response);
                    }
                }
                if ((e.response as any)?.data?.message) {
                    return e.response
                }
                throw e;
            });


export const createLevelMutation = createMutation("courses/level", "POST");
