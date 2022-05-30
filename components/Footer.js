import React from 'react'

import { 
    Flex, Box,
   Center, Link, Text
    } from '@chakra-ui/react'

const Footer = () => {
  return (
   <>
            <Flex align='bottom'>
    <Box bg='#1f1f1f' w='100%' p={4} color='white'>
      <Center>
      <Text>DAPP created by <Link href="https://twitter.com/polthedev" isExternal><b>@PolTheDev</b></Link></Text>
      </Center>
    </Box>
    </Flex>
   </>
  )
}

export default Footer