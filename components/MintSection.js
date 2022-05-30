import React, {useEffect, useState} from 'react'
import { 
    Flex, Box, Text,  Container, Stack, Heading, Button, Image
    } from '@chakra-ui/react'
import {
        NumberInput,
        NumberInputField,
        NumberInputStepper,
        NumberIncrementStepper,
        NumberDecrementStepper,
      } from '@chakra-ui/react'
import {
        Alert,
        AlertIcon,
        AlertTitle,
        AlertDescription, Link
      } from '@chakra-ui/react'
import Banner from '../Images/banner.png'



const MintSection = (props) => {
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
<NumberInput step={1} defaultValue={1} min={0}
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

            </Stack>
        </Container>
      </Flex>
    </>
  )
}

export default MintSection