import SidebarWithHeader from "./shared/SideBar.jsx";
import {Button} from "@chakra-ui/react";

function App() {
    return (
        <SidebarWithHeader>
            <Button colorScheme='teal' size='lg'>Click Me</Button>
        </SidebarWithHeader>
    )
}

export default App
