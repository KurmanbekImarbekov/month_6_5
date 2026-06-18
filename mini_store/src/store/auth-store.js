import { useMutation } from "@tanstack/react-query"
import { $mainApi } from "../api/axios"
import { useNavigate } from "react-router-dom"

export const useLoginMutation = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (payload) => {
           const response = await $mainApi.post('/auth/sign-in', payload)
           return response.data
        },
        onSuccess: (responseData) => {
            localStorage.setItem('accessToken', responseData.accessToken)
            navigate("/")
        }
        //доработать onError
    })
}

export const useRegisterMutation = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (payload) => {
           const response = await $mainApi.post('/auth/sign-up', payload)
           return response.data
        },
        onSuccess: (responseData) => {
            localStorage.setItem('accessToken', responseData.accessToken)
            navigate("/")
        }
        //доработать onError
    })
}