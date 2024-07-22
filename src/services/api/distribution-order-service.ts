import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchRequest } from "./fetch-service";
import { SERVICE_MODULE_ENDPOINT, INTERNAL_STORAGE_KEY } from "../../constants";
import { ServiceResponse } from "../../types/interfaces/api.interface";

interface ServiceDataResponse {
    message?: string,
    success: boolean,
    data: any
}

interface DistributionDataRequest {
    IdOrderDetail: number,
    TrackingCodes: string[],
    SignatureFileBase64:string
}

export const getAssignedDistributionOrders = async (): Promise<ServiceDataResponse> => {
    try {
        let data = await AsyncStorage.getItem(INTERNAL_STORAGE_KEY.token)
      
        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.distribution_order}/assigned`,
            method: 'GET',
            token: JSON.parse(data).Token
        });

        if (response.StatusCode != 200) {
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

export const getDetailDistributionOrder = async (orderCode: string): Promise<ServiceDataResponse> => {
    try {
        let data = await AsyncStorage.getItem(INTERNAL_STORAGE_KEY.token)
 
        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.distribution_order}/${orderCode}?complete=null`,
            method: 'GET',
            token: JSON.parse(data).Token
        });

        if (response.StatusCode != 200) {
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

export const getPackagesInDistributionOrder = async (idOrderDetail: number): Promise<ServiceDataResponse> => {
    try {
        let data = await AsyncStorage.getItem(INTERNAL_STORAGE_KEY.token)
 
        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.collection_order}/orders/${idOrderDetail}`,
            method: 'GET',
            token: JSON.parse(data).Token
        });

        if (response.StatusCode != 200) {
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

export const sendDistribution = async (requestData: DistributionDataRequest): Promise<ServiceDataResponse> => {
    try {
        let data = await AsyncStorage.getItem(INTERNAL_STORAGE_KEY.token)
  
        const response: ServiceResponse = await fetchRequest({
            endpoint: `${SERVICE_MODULE_ENDPOINT.distribution_order}/check-complete`,
            method: 'POST',
            token: JSON.parse(data).Token,
            data: JSON.stringify(requestData)
        });
        
        if (response.StatusCode != 200) {
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