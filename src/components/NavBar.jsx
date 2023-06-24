import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Button from "./Button"
import { useSmartAccountContext } from "../contexts/SmartAccountContext"
  import { useWeb3AuthContext } from "../contexts/SocialLoginContext"
  import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";


import { useAccount, useConnect, useEnsName } from 'wagmi'
import {MetaMaskConnector} from "wagmi/connectors/metaMask"



export default function Navbar() {


  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })



    // const {
    //   address,
    //   loading: eoaLoading,
    //   userInfo,
    //   connect,
    //   disconnect,
    //   getUserInfo
    // } = useWeb3AuthContext()
    // const {
    //   selectedAccount,
    //   loading: scwLoading,
    //   setSelectedAccount
    // } = useSmartAccountContext()



     const [loading, setLoading] = useState(false);
  // const { open } = useWeb3Modal();
  // const { isConnected } = useAccount();
  // const { disconnect } = useDisconnect();
   const label = isConnected ? "Disconnect" : "Connect Custom";  

  // async function onOpen() {
  //   setLoading(true);
  //   await open();
  //   setLoading(false);
  // }


  // function onClick() {
  //   if (isConnected) {
  //     disconnect();
  //   } else {
  //     onOpen();
  //   }
  // }

  function connectToWallet(){
    connect()
    setLoading(true)
  }


  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Tykto
      </Link>
      <ul>
        <Link to="/create">Create Events</Link>
        <Link to="/marketplace">Market Place</Link>
        <a href="/mytickets">My Tickets</a>
        <a href="/swap">Swap Tokens</a>
      </ul>

      {isConnected 
        ? <div>Connected to {ensName ?? address}</div>
        :  <button onClick={connectToWallet} disabled={loading}>  {loading ? "Loading..." : label} </button>
      }
    
    </nav>
  )
}

