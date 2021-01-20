import axios from '@/api/axios'

export const show_data = () => {
    return axios.request({
        url: `${axios.baseUrl}/show_data/`,
        method: 'get'
    })
}