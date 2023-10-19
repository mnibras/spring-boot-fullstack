import axios from "axios";

class CustomerService {

    getCustomers = async () => {
        try {
            return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`);
        } catch (e) {
            throw e;
        }
    }

    saveCustomer = async (customer) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`, customer);
        } catch (e) {
            throw e;
        }
    }

    deleteCustomer = async (id) => {
        try {
            return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`);
        } catch (e) {
            throw e;
        }
    }

}

export default new CustomerService();