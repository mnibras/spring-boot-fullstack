import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Spinner, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import CustomerService from "./services/CustomerService.js";
import CardWithImage from "./components/Card.jsx";
import CreateCustomerDrawer from "./components/CreateCustomerDrawer.jsx";
import {errorNotification} from "./services/Notification.js";

function App() {

    const [customers, setCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [error, setError] = useState("");

    const fetchCustomers = () => {
        setLoadingCustomers(true);
        CustomerService.getCustomers()
            .then(res => {
                setCustomers(res.data)
            })
            .catch(err => {
                setError(err.response.data.message);
                errorNotification(err.code, err.response.data.message);
            })
            .finally(() => {
                setLoadingCustomers(false);
            })
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    if (loadingCustomers) {
        return (
            <SidebarWithHeader>
                <Spinner thickness='4px'
                         speed='0.65s'
                         emptyColor='gray.200'
                         color='blue.500'
                         size='xl'/>
            </SidebarWithHeader>
        )
    }

    if (error) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer fetchCustomer={fetchCustomers}/>
                <Text mt={5}>Oops there was an error</Text>
            </SidebarWithHeader>
        )
    }

    if (customers && customers.length === 0) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer fetchCustomer={fetchCustomers}/>
                <Text mt={5}>No customers available</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <CreateCustomerDrawer fetchCustomer={fetchCustomers}/>
            <Wrap justify={"center"} spacing={"30px"}>
                {customers.map((customer, index) => (
                    <WrapItem key={index}>
                        <CardWithImage {...customer} fetchCustomers={fetchCustomers}/>
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default App
