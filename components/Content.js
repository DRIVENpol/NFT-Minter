import React from 'react'


import { 
    Flex, Box, Text,
    Button, Link, Container, Stack, Heading,
    Center, Avatar, Tag, TagLabel
    } from '@chakra-ui/react'

    import {truncateAddress } from "../Utils/Utils";


const Content = (props) => {
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
                              </Center>
            <Center><Text>⬇️ Scroll down to MINT⬇️</Text></Center>
        </Stack>
      </Container>
   </>
  )
}

export default Content