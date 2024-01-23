import { Avatar, Button, Flex, Heading, Tooltip } from '@chakra-ui/react'
import { AuthState } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import CreateUserModal from '../components/CreateUserModal'
import GetUsers from '../components/GetUsers'

const UserPage = () => {

  const {user, fetchAgain, setFetchAgain} = AuthState()

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  // getUsers()

  return (
    <div style={{width: '100%'}}>
      <Flex
        flexDirection='column'
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          padding="1rem"
          bg="teal.500"
          color="white"
          boxShadow='xl'
          >
          <Heading
            as='h1'
            size='lg'
            >
            User Management
          </Heading>
          
          <Flex align="center">
            <Tooltip label={user?.name}>
              <Avatar
                size="sm"
                name={user?.name}
                mr={2}
                />
            </Tooltip>
            <Button colorScheme="red" size='sm'
              onClick={logoutHandler}
              >
              Logout
            </Button>
          </Flex>
        </Flex>

        
        <CreateUserModal user={user} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
          <Button
            m={3}
            rightIcon={<AddIcon />}
            >
            Create New User 
          </Button>
        </CreateUserModal>

        {user && <GetUsers />}
    
      </Flex>
    </div>
  )
}

export default UserPage
