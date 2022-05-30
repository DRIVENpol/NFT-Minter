import React, {useEffect, useState} from 'react'

import {
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton, useDisclosure,
        Alert,
        AlertIcon,
        AlertTitle,
        AlertDescription, Link,
        NumberInput,
        NumberInputField,
        NumberInputStepper,
        NumberIncrementStepper,
        NumberDecrementStepper, Input, Grid, GridItem,
        Flex, Box, Text,  Container, Stack, Heading, Button, Image
      } from '@chakra-ui/react'
import Banner from '../Images/banner.png'
import { truncateAddress } from '../Utils/Utils'


const MintSection = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toMint, setToMint] = useState();

  useEffect(() => {
      props.func(toMint);
  })


  return (
    <>
    <Image src={Banner.src} />
    <Flex  bg="#184754" alignItems='center'>
        <Container maxW={'100%'} alignItems='center'>
            <Stack
            as={Box}
            textAlign={'center'} alignItems='center'
            spacing={{ base: 8, md: 14 }}
            mt='70px' mb='70px'>
           

           <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                color='white' mb='-30px'>
                🖼 Mint your demo NFT<br />
            </Heading>
            <Text color='white'>Connect your wallet, select the quantity and MINT!</Text>

            <Heading
                fontWeight={600}
                fontSize={'2xl'}
                color='white'>
                 {props.minted} NFTs were minted<br />
            </Heading>

  <NumberInput step={1} defaultValue={0} min={0}
            focusBorderColor = "white"
           textColor={'white'} size='lg' maxWidth={'50%'}
           onChange={(value) => setToMint(value)}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
  </NumberInput>

    {props.accounts ? (<>
        {props.ld === true ? (<>
            <Button colorScheme='gray' textColor={"black"} maxWidth={"50%"} onClick={props.mintF} isLoading>Mint now</Button>
        </>): (<Button colorScheme='gray' textColor={"black"} maxWidth={"50%"} onClick={props.mintF} >Mint now</Button>)}
    </>)
:
    (<><Button colorScheme='gray' textColor={"black"} maxWidth={"50%"} onClick={props.connectFunction}>Connect your wallet</Button></>)
    }

    {props.in == true ? (<><Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='250px' maxWidth={'50%'} borderRadius='10px' mb='10px' opacity={'0.9'}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Transaction Minted!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        <Link href={props.t} isExternal>{props.t}</Link><br />
        <p><b><Button textColor={"black"} maxWidth={"50%"} mt='10px'><Link href="https://testnets.opensea.io/account" isExternal>See on OpenSea!</Link></Button></b></p>
      </AlertDescription>
    </Alert></>): null}

{props.ow === props.accounts ? (<><Button colorScheme='gray' textColor={"black"} maxWidth={"70%"} onClick={onOpen}>Open Admin Dashboard</Button></>): null}
<Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Panel [{truncateAddress(props.accounts)}]</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <br />
           <Text>Using this panel you will be able to manage your smart contract! If you need support,
           don&apos;t hesitate to DM me <Link hre='https://twitter.com/polthedev' isExternal><b>on Twitter!</b></Link></Text>

          <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)',]} gap={6} mt='-15px'>
              <GridItem w='100%'>
           
           <br />
           <Text mt='30px'><b>Airdrop one NFT</b></Text>
           <Input placeholder='To: address' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

           <br />
           <Text mt='30px'><b>Airdrop multiple NFTs to one address</b></Text>
           <Input placeholder='To: address' mt='10px' />
           <Input placeholder='Amount: number' mt='10px'/>
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

            <br />
           <Text mt='30px'><b>SetUri</b></Text>
           <Input placeholder='Uri: string' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

            <br />
           <Text mt='30px'><b>Check balance of</b></Text>
           <Input placeholder='Who: address' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>
              </GridItem>






              <GridItem w='100%'>
              <br />
           <Text mt='30px'><b>Airdrop to multiple addresses</b></Text>
           <Input placeholder='To: addresses; Comma-separated' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

           <br />
           <Text mt='30px'><b>Withdraw minting fees</b></Text>
           <Input placeholder='To: addresses' mt='10px' />
           <Input placeholder='Amount of ETH' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

            <br />
           <Text mt='30px'><b>Transfer Ownership</b></Text>
           <Input placeholder='To: addresses' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

            <br />
           <Text mt='30px'><b>Pause Smart Contract</b></Text>
           <Input placeholder='Bool: true or false' mt='10px' />
           <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} mt='5px'>
              Do Action
            </Button>

              </GridItem>
          </Grid>
          </ModalBody>

          <ModalFooter>
            <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            </Stack>
        </Container>
      </Flex>
    </>
  )
}

export default MintSection