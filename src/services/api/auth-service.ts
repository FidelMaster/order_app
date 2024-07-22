import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchRequest } from "./fetch-service";
import { SERVICE_MODULE_ENDPOINT, INTERNAL_STORAGE_KEY } from "../../constants";
import { ServiceResponse } from "../../types/interfaces/api.interface";

interface userAuthProps {
    email: string,
    password: string
}

interface ServiceDataResponse {
    message?: string,
    success?: boolean,
    data?: any
    token?: string
    error?: any
}

export const signIn = async ({ email, password }: userAuthProps): Promise<ServiceDataResponse> => {
    try {
        let auth = {
            email: email,
            password: password
        }

        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.auth}/v1/login`,
            method: 'POST',
            data: JSON.stringify(auth)
        });

        if (response.token == undefined) {
            return {
                message: "ha ocurrido un error al validar el usuario",
                success: false,
                data: null
            }
        }

        return {
            message: 'Autenticacion exitosa',
            success: true,
            data: response
        }

    } catch (error) {
        return {
            message: 'Ha ocurrido un error interno.',
            success: false,
            data: null
        }
    }
}

export const getUserData = async (): Promise<ServiceDataResponse> => {
    try {
        let data = await AsyncStorage.getItem(INTERNAL_STORAGE_KEY.token)
 
        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.auth}/information`,
            method: 'GET',
            token: JSON.parse(data).Token
        });

        if (response) {
            return {
                message: response.Message,
                success: false,
                data: response.Data
            }
        }

        return {
            message: 'Datos obtenidos',
            success: true,
            data: response.Data
        }

    } catch (error) {
        return {
            message: 'Ha ocurrido un error interno, favor intente nuevamente.',
            success: false,
            data: null
        }
    }
}