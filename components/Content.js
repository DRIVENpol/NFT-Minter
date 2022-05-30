import React from 'react'


import { 
    Flex, Box, Text,
    Button, Link, Container, Stack, Heading,
    Center, Avatar, Tag, TagLabel, Modal, useDisclosure, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Grid, GridItem,
    Input
    } from '@chakra-ui/react'
import {truncateAddress } from "../Utils/Utils";


const Content = (props) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
   <>
       <Container maxW={'3xl'} mb='50px' mt='50px'>
            <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
>

        {props.accounts ? (<>
            <Center>
          <Tag size='lg' colorScheme='green' borderRadius='full' maxW={'50%'}>
                <Avatar
                    src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    size='xs'
                    name='Segun Adebayo'
                    ml={-1}
                    mr={2}
                />
                <TagLabel>{truncateAddress(props.accounts)}</TagLabel>
            </Tag>
        </Center>
        </>): (<>
            <Center>
          <Tag size='lg' colorScheme='red' borderRadius='full' maxW={'50%'}>
                <Avatar
                    src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    size='xs'
                    name='Segun Adebayo'
                    ml={-1}
                    mr={2}
                />
                <TagLabel>Not Connected</TagLabel>
            </Tag>
        </Center>
        </>)}

          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            👏🏻 Welcome to NFT Minter!<br />
            <Text as={'span'} color={'#184754'}>
             A dapp that allow your holders to mint their own NFT
            </Text>
          </Heading>
          <Text color={'gray.500'}>
           This DAPP was created by <Link href="https://twitter.com/polthedev" isExternal><b>@PolTheDev </b></Link>
            as a DEMO for possible clients. This DAPP contain a web interface (this) and a smart contract. 
            This DAPP can be customized on request.
          </Text>

           <Center>
                          <Button bgColor='#184754' color='white'
                          _hover={{ bg: '#2f6878' }}
                      ><Link href="https://twitter.com/polthedev" isExternal>Join our Discord Server</Link></Button>
                              {props.ow === props.accounts ? (<><Button bgColor='#184754' color='white' ml='10px'
                          _hover={{ bg: '#2f6878' }} onClick={onOpen}
                      >Open Admin Dashboard</Button></>): null}</Center>

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


            <Center><Text>⬇️ Scroll down to MINT⬇️</Text></Center>
        </Stack>
      </Container>
   </>
  )
}

export default Content