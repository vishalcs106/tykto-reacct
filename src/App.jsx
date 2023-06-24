import React from "react"
  import { makeStyles } from "@material-ui/core/styles"
  import { useSmartAccountContext } from "./contexts/SmartAccountContext"
  import { useWeb3AuthContext } from "./contexts/SocialLoginContext"
  import Button from "./components/Button"
  import NavBar from "./components/NavBar"
  import { BrowserRouter } from 'react-router-dom'
  import Home from "./pages/Home"
import Marketplace from "./pages/Marketplace"
import CreateEvent from "./pages/CreateEvent"
import MyTickets from "./pages/MyTickets"
import SwapTokens from "./pages/SwapTokens"
  
  const App = () => {
    const classes = useStyles()
    const {
      address,
      loading: eoaLoading,
      userInfo,
      connect,
      disconnect,
      getUserInfo
    } = useWeb3AuthContext()
    const {
      selectedAccount,
      loading: scwLoading,
      setSelectedAccount
    } = useSmartAccountContext()
    console.log("Rendering")
    console.log("address", address)

    console.log("window.location.pathname", window.location.pathname)

    let component

    switch (window.location.pathname) {
      case "/":
        component = <Home />
        break
  
      case "/marketplace":
        component = <Marketplace />
        break
  
      case "/create":
        component = <CreateEvent />
        break
  
      case "/mytickets":
        component = <MyTickets />
        break
  
      case "/swap":
        component = <SwapTokens />
        break
  
      default:
        break
    }


    console.log(component)

  
    return (
      <BrowserRouter>
      <div className={classes.bgCover}>
      <NavBar/>
  
      <div>{component}</div>
        <main className={classes.container}>
          
          
  
          {eoaLoading && <h2>Loading EOA...</h2>}
  
          {address && (
            <div>
              <h2>EOA Address</h2>
              <p>{address}</p>
            </div>
          )}
  
          {scwLoading && <h2>Loading Smart Account...</h2>}
  
          {selectedAccount && address && (
            <div>
              <h2>Smart Account Address</h2>
              <p>{selectedAccount.smartAccountAddress}</p>
            </div>
          )}
  
          {address && (
            <Button onClickFunc={() => getUserInfo()} title="Get User Info" />
          )}
  
          {userInfo && (
            <div style={{ maxWidth: 800, wordBreak: "break-all" }}>
              <h2>User Info</h2>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(userInfo, null, 2)}
              </pre>
            </div>
          )}
        </main>
      </div>
      </BrowserRouter>
    )
  }
  
  const useStyles = makeStyles(() => ({
    bgCover: {
      backgroundColor: "#1a1e23",
      backgroundSize: "cover",
      width: "100%",
      minHeight: "100vh",
      color: "#fff",
      fontStyle: "italic"
    },
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: "80vh",
      height: "auto",
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      marginBottom: 50,
      fontSize: 60,
      background: "linear-gradient(90deg, #12ECB8 -2.21%, #00B4ED 92.02%)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    },
    animateBlink: {
      animation: "$bottom_up 2s linear infinite",
      "&:hover": {
        transform: "scale(1.2)"
      }
    },
    "@keyframes bottom_up": {
      "0%": {
        transform: "translateY(0px)"
      },
      "25%": {
        transform: "translateY(20px)"
      },
      "50%": {
        transform: "translateY(0px)"
      },
      "75%": {
        transform: "translateY(-20px)"
      },
      "100%": {
        transform: "translateY(0px)"
      }
    }
  }))
  
export default App;
