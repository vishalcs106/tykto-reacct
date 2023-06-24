import { useSmartAccountContext } from "../contexts/SmartAccountContext"
import { useWeb3AuthContext } from "../contexts/SocialLoginContext"
import Button from "../components/Button"

export default function Home(props){


    const {address, provider} = useWeb3AuthContext()
      const {
        selectedAccount,
        loading: scwLoading,
        setSelectedAccount
      } = useSmartAccountContext()
      console.log("Provider "+JSON.stringify(provider, null, 2))
      console.log("selectedAccount", selectedAccount)
      console.log("address", address)
    


    console.log(props)


    const containerStyles = {
        backgroundColor: '#454545',
        borderRadius: '10px',
        width: '80%',
        padding: '80px',
        marginTop: '80px',
        marginLeft: '60px',
    }

    return (
        <div style={containerStyles}>
        <h1>Discover Events</h1>  
        {/* <Button onClickFunc={() => connect()} title="Get User Info" /> */}
        </div>
    )
}