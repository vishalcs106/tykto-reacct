import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import "@biconomy/web3-auth/dist/src/style.css"
import { Web3AuthProvider } from "./contexts/SocialLoginContext"
import { SmartAccountProvider } from "./contexts/SmartAccountContext"
import { BrowserRouter } from 'react-router-dom'

import {configureChains} from 'wagmi'
import {polygonMumbai} from 'wagmi/chains'
import {publicProvider} from 'wagmi/providers/public' 
import {MetaMaskConnector} from "wagmi/connectors/metaMask"
import {InjectedConnector} from "wagmi/connectors/injected"
import { WagmiConfig, createConfig } from 'wagmi'
import { createPublicClient, http } from 'viem'

const {chains, publicClient, webSocketPublicClient}  = configureChains([polygonMumbai], [publicProvider()])

const config = createConfig({
  autoConnect: true, publicClient, webSocketPublicClient})
  

const element = document.getElementById("root")
const root = createRoot(element)

const Index = () => {
  return (
    <WagmiConfig config={config}>
    <App />
    </WagmiConfig>
  )
}

root.render(<Index />)
