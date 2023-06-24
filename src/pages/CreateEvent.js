import React, { useState } from "react";
import SmartAccount from "@biconomy/smart-account";
import { ChainId } from "@biconomy/core-types";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import abi from "../abi/erc20.json";
import ticketAbi from "../abi/BaseTicketAbi.json";
import sbtAbi from "../abi/BaseSbtAbi.json";
import eventFactory from "../abi/EventFactoryAbi.json"
import { ethers } from "ethers";
import Button from "../components/Button";
import Web3Modal from "web3modal";
import { Style } from "@material-ui/icons";

const CreateEvent = () => {
  const [ nftContractAddress, setNftContarctAddress ] = useState("");
  const [ sbtContractAddress, setSbtContarctAddress ] = useState("");

  const approve = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    console.log("approve started ");
    const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    const amountIn = ethers.utils.parseUnits("1", "18");
    const tokenContract = new ethers.Contract(
      "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      abi,
      signer
    );

    const transaction = await tokenContract.approve(
      "0xDa7d15fcD79794DCfCAA06A32262c9cb00B165a9",
      amountIn
    );

    console.log("approve started 1");
    await transaction.wait();
  };

  const [formData, setFormData] = useState({
    name: "PestoDemoTicket",
    symbol: "PDT",
    supply: "100",
    mintPrice: "0.1",
    ticketUri:
      "ipfs://bafybeicr7yso646i7f647plboshjn6imu6fxbcqyy5ulperb4mvgxenfdy",
    royaltyFee: "500",
    royaltyFeeAddress: "0x216F3F71Add8F2C3C9e19fA9b463b6031D5A14b9",
    sbtName: "PestoDemoSBT",
    sbtSymbol: "PDSBT",
    sbtTicketUri:
      "ipfs://bafybeia4ofrrumhiws64aod7ufn4fpbx3rplzqbvtsqn2uizt2koa7jqem",
    eventName: "Pesto Demo Day",
    eventDesc: "The big day for Web3 Cohort Batch 1 folks",
    venue: "Zoom",
    startTimeStamp: "1687628460",
    endTimeStamp: "1687639260",
    baseTicketAddress: nftContractAddress,
    baseSbtAddress: sbtContractAddress,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const delpoyNftContract = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const factory = new ethers.ContractFactory(
      ticketAbi.abi,
      ticketAbi.bytecode,
      signer
    );

    const mp = ethers.utils.parseUnits(formData.mintPrice, "18");

    const constructorArgs = [formData.name, formData.symbol, mp, formData.supply, formData.royaltyFee, formData.royaltyFeeAddress, formData.ticketUri];

    const contract = await factory.deploy(...constructorArgs);
    const deployedContarct = await contract.deployed();
    formData.baseTicketAddress = deployedContarct.address
    console.log("Deployed to: " + deployedContarct.address);
    setNftContarctAddress(deployedContarct.address);
  };

  const deploySbtContarct = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const factory = new ethers.ContractFactory(
      sbtAbi.abi,
      sbtAbi.bytecode,
      signer
    );

    const constructorArgs = [formData.sbtName, formData.sbtSymbol, formData.sbtTicketUri];
    const contract = await factory.deploy(...constructorArgs);
    const deployedContarct = await contract.deployed();
    console.log("Deployed to: " + deployedContarct.address);
    formData.baseSbtAddress = deployedContarct.address
    setSbtContarctAddress(deployedContarct.address);

  };

  const createEvent = async() => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const eventFactoryContarct = new ethers.Contract(
      "0x0df722AAc591Cc7ed53A4c8963c9b7c2e926A038",
      eventFactory.abi,
      signer
    );  


    const options = {value: ethers.utils.parseUnits("0.1", "18"), gasLimit: "25000"}

    console.log(JSON.stringify(options))

    const transaction = await eventFactoryContarct.createEvent(formData.eventName, formData.eventDesc, formData.venue, 
      formData.startTimeStamp, formData.endTimeStamp, formData.baseTicketAddress, formData.baseSbtAddress, options);

      
      const response = await transaction.wait();
      //console.log(response)

  };

  return (
    <div style={{ padding: 40 }}>
     
        <br />
        <br />

        <button type="approve" onClick={approve}>
          Approve
        </button>
        <br />
        <br />

        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Symbol:
          <br />
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Supply:
          <br />
          <input
            type="text"
            name="supply"
            value={formData.supply}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Mint Price:
          <br />
          <input
            type="text"
            name="mintPrice"
            value={formData.mintPrice}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Ticket URI:
          <br />
          <input
            type="text"
            name="ticketUri"
            value={formData.ticketUri}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Royalty Fee:
          <br />
          <input
            type="text"
            name="royaltyFee"
            value={formData.royaltyFee}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Royalty Fee Address:
          <br />
          <input
            type="text"
            name="royaltyFeeAddress"
            value={formData.royaltyFeeAddress}
            onChange={handleChange}
          />
        </label>

        <br />

        {nftContractAddress != "" && <p>{nftContractAddress}</p>}

        <button type="submit" onClick={delpoyNftContract}>
          Deploy NFT Contract
        </button>

        <br />
        <br />

        <br />
        <br />

        <label>
          Sbt Name:
          <br />
          <input
            type="text"
            name="sbtName"
            value={formData.sbtName}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Sbt Symbol:
          <br />
          <input
            type="text"
            name="sbtSymbol"
            value={formData.sbtSymbol}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Sbt Ticket URI:
          <br />
          <input
            type="text"
            name="ticketUri"
            value={formData.ticketUri}
            onChange={handleChange}
          />
        </label>
        <br />

        <br />
        {sbtContractAddress != "" && <p>{sbtContractAddress}</p>}

        <button type="submit" onClick={deploySbtContarct}>Deploy SBT Contract</button>

        <br />
        <br />

        <br />
        <br />

        <label>
          Event Name:
          <br />
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Event Description:
          <br />
          <input
            type="text"
            name="eventDesc"
            value={formData.eventDesc}
            onChange={handleChange}
          />
        </label>

        <br />

        <label>
          Venue:
          <br />
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Start Time:
          <br />
          <input
            type="text"
            name="startTime"
            value={formData.startTimeStamp}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          End Time:
          <br />
          <input
            type="text"
            name="endTimestamp"
            value={formData.endTimeStamp}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" onClick={createEvent}>Create Event</button>
 
    </div>
  );
};

export default CreateEvent;
