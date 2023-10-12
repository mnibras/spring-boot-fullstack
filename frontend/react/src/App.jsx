import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Spinner, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import CustomerService from "./services/CustomerService.js";
import CardWithImage from "./components/Card.jsx";

function App() {

    const [customers, setCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);

    useEffect(() => {
        setLoadingCustomers(true);
        CustomerService.getCustomers()
            .then(res => {
                setCustomers(res.data)
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoadingCustomers(false);
            })
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

    if (customers && customers.length === 0) {
        return (
            <SidebarWithHeader>
                <Text>No customers available</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Wrap justify={"center"} spacing={"30px"}>
                {customers.map((customer, index) => (
                    <WrapItem key={index}>
                        <CardWithImage {...customer}/>
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default App
