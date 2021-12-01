// export const dataAction=(data)=>{
//     console.log(`DATA UI`,data)
//     return{
//         type:"DATA_TERAMBIL",
//         payload:data
//     }
// }
// export const getProductsAction = (data) => {
//     return {
//         type: "GET_DATA_PRODUCTS",
//         payload: data
//     }
// }
import axios from "axios"
import { API_URL } from "../../helper"

// cara 1
// export const getProductsAction = (search) => {
//     return (dispatch) => {
//         axios.get(`${API_URL}/products`)
//             .then((response) => {
//                 dispatch({
//                     type: "GET_DATA_PRODUCTS",
//                     payload: response.data
//                 })
//             }).catch((error)=> {
//                 console.log(error)
//             })
//     }
// }


//cara 2
export const getProductsAction = (search, minimum, maximum) => {
    return async (dispatch) => {
        try {
            let res;
            //cara 1
            if (search) {
                res = await axios.get(`${API_URL}/products?nama=${search}`)
            } else if (minimum, maximum) {
                res = await axios.get(`${API_URL}/products?harga_gte=${minimum}&harga_lte=${maximum}`)
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
            if (search) {
                if (search.hargaAsc == "harga-asc") {
                    console.log("tesHarga==> asc", search.hargaAsc)
                    res = await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)
                }
                if (search.hargaDesc) {
                    res = await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)
                }
                if (search.azAsc) {
                    res = await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
                }
                if (search.azDesc) {
                    res = await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)
                }
            }
            //cara 2 pake ternary 
            // let res = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ""}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}