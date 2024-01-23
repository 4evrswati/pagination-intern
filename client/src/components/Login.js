import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthState } from '../context/AuthProvider'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading , setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    const [show, setShow] = React.useState(false)
    const {user, fetchAgain, setFetchAgain} = AuthState()

    const handleClick = () => setShow(!show)

    const submitHandler = async() => {

        setLoading(true)
        if(!email || !password) {
            toast({
                title: 'Please, Fill all the Fields..!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top"
              })
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const {data} = await axios.post('/api/auth/login', {email, password}, config);

            toast({
                title: 'Login Successfully..!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            })

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false)
            // if(data) {
            //     setFetchAgain(!fetchAgain)
            // }
            navigate('/users')
            window.location.reload();
        } catch (error) {
            toast({
                title: 'Error Occured..!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top"
              })
            setLoading(false);
        }
    }

  return (
    <VStack spacing='5px'>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button
            colorScheme='blue'
            w="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Log In
        </Button>

        <Button
            colorScheme='red'
            w="100%"
            style={{marginTop: 15}}
            onClick={() => {
                setEmail("guest@example.com")
                setPassword("guest@12345")
            }}
        >
            Get Guest User Credentials
        </Button>

    </VStack>
  )
}

export default Login
