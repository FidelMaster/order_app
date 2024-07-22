import { AUTHORIZATION_KEY, API_KEY, BASE_URL, PREFIX_SERVICE } from "../../constants";

interface fetchProps {
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT',
    data?: any,
    token: string | null
}

export const fetchRequest = async ({ endpoint, method, data, token }: fetchProps) => {
    let headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    };

    if (token) {
        headers['Authorization'] = `${AUTHORIZATION_KEY} ${token}`;
    }

    let requestOptions: RequestInit = {
        method: method,
        headers: headers
    };

    if (data) {
        requestOptions.body = data;
    }

    const url = `${BASE_URL}/${PREFIX_SERVICE}/${endpoint}`;

    try {
        const response = await fetch(url, requestOptions);
        console.log('data recibida')
        //console.log(response)
        // Verifica si la respuesta no es exitosa (código HTTP 2xx)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Obtiene la respuesta en formato JSON
        const responseData = await response.json();
         
        return responseData;
    } catch (error) {
        // Maneja errores de red o de respuesta
        console.error('Error en la solicitud fetch:', error);
        console.log(error)
        throw error;
    }
};
