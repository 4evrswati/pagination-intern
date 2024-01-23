import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { AuthState } from '../context/AuthProvider'

const UpdateUser = ({u, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [firstName, setFirstName] = useState(u.firstName)
    const [lastName, setLastName] = useState(u.lastName)
    const [age, setAge] = useState(u.age)
    const [gender, setGender] = useState(u.gender)
    const [email, setEmail] = useState(u.email)
    const [phone, setPhone] = useState(u.phone)

    const toast = useToast()

    const {user, fetchAgain, setFetchAgain} = AuthState()    

    const handleUpdate = async() => {
        try {
            const config = {
                headers: {
                    Authorization: `${user.token}`,
                    "Content-type": "application/json",
                }
            }

            const {data} = await axios.put(`/api/user/update-user/${u._id}`,{firstName, lastName, age, gender, email, phone}, config)

            if(data) {
              setFetchAgain(!fetchAgain)
            }

            toast({
                title: 'User Updated Successfully..!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            })

        } catch (error) {
            toast({
                title: "Error Occured",
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
              Update Task
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Last Name' 
                    mb={3} 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Age' 
                    mb={3} 
                    value={age}
                    onChange={(e) => setAge(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Gender' 
                    mb={3} 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Email' 
                    mb={3} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <Input
                    placeholder='Phone Number' 
                    mb={3} 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleUpdate}>
                Update User
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </>
    )
}

export default UpdateUser