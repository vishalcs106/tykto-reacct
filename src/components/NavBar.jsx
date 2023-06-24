import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Button from "./Button"
import { useSmartAccountContext } from "../contexts/SmartAccountContext"
  import { useWeb3AuthContext } from "../contexts/SocialLoginContext"

export default function Navbar() {



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




  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Tykto
      </a>
      <ul>
        <a href="/create">Create Events</a>
        <a href="/marketplace">Market Place</a>
        <a href="/mytickets">My Tickets</a>
        <a href="/swap">Swap Tokens</a>
      </ul>

          <Button
            onClickFunc={
              !address
                ? connect
                : () => {
                    setSelectedAccount(null)
                    disconnect()
                  }
            }
            title={!address ? "Connect Wallet" : "Disconnect Wallet"}
          />

    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}