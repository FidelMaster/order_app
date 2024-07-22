import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchRequest } from "./fetch-service";
import { SERVICE_MODULE_ENDPOINT, INTERNAL_STORAGE_KEY } from "../../constants";
import { Customer, imageProps, ServiceResponse } from "../../types/interfaces/api.interface";

interface ServiceDataResponse {
    message?: string,
    success: boolean,
    data: Array<Customer> | null
}

export const getCustomers = async (): Promise<ServiceDataResponse> => {
    try {
        //let data = await AsyncStorage.getItem(INTERNAL_STORAGE_KEY.token)

        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.administration}/v1/customers`,
            method: 'GET',
            token: null
        });

        if (!response.data) {
            return {
                message: 'Ha ocurrido un error interno, favor intente nuevamente.',
                success: false,
                data: null
            }
        }

        return {
            message: 'Datos obtenidos',
            success: true,
            data: response.data
        }

    } catch (error) {
        return {
            message: 'Ha ocurrido un error interno, favor intente nuevamente.',
            success: false,
            data: null
        }
    }
}