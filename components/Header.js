import React, { useEffect, useState } from "react";

import { 
  Flex, Box,
  Grid, GridItem, 
  Button, Image, Link
  } from '@chakra-ui/react'


  import { networkParams } from "../Utils/Networks";
  import { ethers } from "ethers";
  import Web3Modal from "web3modal";
  import { providerOptions } from "../Utils/providerOptions";

  import Logo from '../Images/logo.png'
  import Content from "./Content";
  import Footer from "./Footer";
  import MintSection from "./MintSection";

  import contractAbi from "./contractNft.json"


export default function Home({}) {

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [isError, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const contractAddress = "0xeC27dC89c7214522466662A91085b51DBd218FC9";
  const abi = contractAbi.abi;

  const [mintedNft, setMintedNft] = useState("");
  const [toMintNft, setToMintNft] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [transaction, setTransaction] = useState("");

  const [isNotif, setIsNotif] = useState(false);

  const pull_data = data => {
    setToMintNft(data);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  const manipulateNotif = async() => {
      setIsNotif(true);
      await sleep(50000);
      setIsNotif(false);
  }


  const getMintedNft = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi2 = ["function getMinted() public view returns(uint256)"]
        const connectedContract = new ethers.Contract(contractAddress, abi2, provider);


        let _mintedNfts = await connectedContract.getMinted();
        setMintedNft(_mintedNfts.toNumber());

        console.log(mintedNfts);


      } catch (error) {
        setError(error);
      }
    }
   
  };

  const mintNft = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi2 = ["function mintMultiple(uint256 _amount) public"]
        const connectedContract = new ethers.Contract(contractAddress, abi2, signer);


        let _mintNfts = await connectedContract.mintMultiple(toMintNft, {gasLimit:600000});
        setIsLoading(true);
        await _mintNfts.wait();
        manipulateNotif();
        getMintedNft();
        setIsLoading(false);

        console.log(_mintNfts);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_mintNfts.hash}`);
        setTransaction(`https://rinkeby.etherscan.io/tx/${_mintNfts.hash}`);


      } catch (error) {
        setError(error);
      }
    }
   
  };



  const connectWallet = async () => {
    if (typeof window !== 'undefined'){
      try {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });

        
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);

        getMintedNft();

      } catch (error) {
        setError(error);
      }
    }
   
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
      
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
   
  };

  const disconnect = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    if (web3Modal.cachedProvider) {
      connectWallet();
     
    }
  }, []);

  useEffect(() => {
      
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    if (window.ethereum){
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
      getMintedNft();
    } else {
      setProvider(providerOptions.walletconnect)
      getMintedNft();
    }
}, []);




  return (
   <>
<Flex>
            <Box bg='#184754' w='100%'  p={6} color='white'>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>

                    <GridItem w='100%' h='10'>
                    <Link href={'/'}><Image src={Logo.src} maxW={['150px','200px','200px','250px','250px']}/></Link>
                    </GridItem>

                    <GridItem w='100%' h='10'/>
                    
                    <GridItem w='100%' h='10' align="center">
                    {account ? (
                      <Button colorScheme='gray' textColor={"black"} 
                     mr={['-5%','-10%','-30%','-50%','-60%']} 
                      onClick={disconnect}>Disconnect</Button>
                        ):
                        (
                          <Button colorScheme='gray' textColor={"black"}
                           mr={['0%','-10%','-30%','-50%','-60%']}
                           size={'sm'}
                      onClick={connectWallet}>Connect your wallet</Button>
                        )}

                    </GridItem>
                </Grid>
            </Box>

</Flex>

<Content accounts={account} connectFunction={connectWallet} />
<MintSection accounts={account} connectFunction={connectWallet} minted={mintedNft} func={pull_data} mintF={mintNft} 
    ld={isLoading} in={isNotif} t={transaction}
/>
<Footer />

   </>
  )
}

