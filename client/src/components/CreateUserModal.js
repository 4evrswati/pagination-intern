import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const CreateUserModal = ({user, children, fetchAgain, setFetchAgain}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")


    const toast = useToast()

    const handleSubmit = async() => {
        try {
            const config = {
                headers: {
                    Authorization: `${user.token}`,
                    "Content-type": "application/json",
                }
            }

            const {data} = await axios.post('/api/user/create-user',{firstName, lastName, age, gender, email, phone}, config)
            
            if(data) {
              setFetchAgain(!fetchAgain)
            }
            toast({
                title: 'User Created Successfully..!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            })

        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
              })
        }


        onClose()
    }

    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
                fontSize='35px'
                fontFamily='Work sans'
                display='flex'
                justifyContent='center'
            >
                Create New User
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
              <FormControl>
                <Input
                    placeholder='First Name' 
                    mb={3} 
                    onChange={(e) => setFirstName(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Last Name' 
                    mb={3} 
                    onChange={(e) => setLastName(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Age' 
                    mb={3} 
                    onChange={(e) => setAge(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Gender' 
                    mb={3} 
                    onChange={(e) => setGender(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Email' 
                    mb={3} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Phone Number' 
                    mb={3} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleSubmit}>
                Create User
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </>
    )
}

export default CreateUserModal