import { IVidio } from "@/models/Vidio"
export type VideoFormData = Omit<IVidio, "_id">

import { POST } from "@/app/api/routes"
import { METHODS } from "http"

type FetchOptions = {
    method?: "GET"|"POST"|"PUT"|"DELETE"
    body?:any
    headers?:Record<string, string>

}

class ApiClient{
    private async fetch<T>(
        endPoints:string,
         options: FetchOptions = {}
    ):Promise<T>{
        const {method= "GET", body, headers = {}} =options

        const defaultHeaders = {
            "Content-Type": "aplication/json",
            ...headers,
        }
        
     const response = await fetch(`/api${endPoints}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
    async getVidios(){
        return this.fetch("/vidios")
    }

    async createVidio(vidioData:IVidio) {
        return this.fetch("/vidios"),{
            METHODS:POST,
            body:vidioData
        }

    }
}

export const apiClient = new ApiClient
