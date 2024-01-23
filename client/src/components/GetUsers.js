import React, { useEffect, useState } from 'react'
import { AuthState } from '../context/AuthProvider'
import axios from 'axios'
import { Button, Center, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import ShowEachUser from './UpdateUser'
import UpdateUser from './UpdateUser'

const GetUsers = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const [users, setUsers] = useState([])

    const {user, fetchAgain, setFetchAgain} = AuthState()

    //get all users
    useEffect(() => {
        const getUsers = async() => {
            const config = {
                headers: {
                    Authorization: `${user?.token}`
                }
            }

            const {data} = await axios.get('/api/user/get-users', config)

            setUsers(data)
        }

        getUsers()
        
    }, [fetchAgain])


    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 10;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;

    const records = users.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(users.length / usersPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)

    const nextPage = () => {
        if(currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prePage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    } 

    const changeCurrPage = (id) => {
        setCurrentPage(id)
    }

    //deleting - users
    const handleDelete = async(id) => {
        try {
          const config = {
              headers: {
                  Authorization: `${user?.token}`
              }
          }
  
          const {data} = await axios.delete(`/api/user/delete-user/${id}`, config)
  
          if(data) {
              setFetchAgain(!fetchAgain)
          }
  
          toast({
              title: 'User Deleted Successfully..!',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: "top"
          })
  
        } catch (error) {
          toast({
              title: "Error in deleting user",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top"
          })
        }
    }

  return (
    <>
        <TableContainer m={5} p={5} bg='white'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Age</Th>
                        <Th>Gender</Th>
                        <Th>Phone</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        records.map((d) => (
                            <Tr key={d._id}>
                                <Td>{d.firstName}  {d.lastName}</Td>
                                <Td>{d.email}</Td>
                                <Td>{d.age}</Td>
                                <Td>{d.gender}</Td>
                                <Td>{d.phone}</Td>
                                <Td>
                                    <UpdateUser u={d}>
                                        <Tooltip label='Update User'>
                                            <EditIcon
                                                color='purple'
                                                fontSize='2xl'
                                                mx='2'
                                                cursor='pointer'
                                            />
                                        </Tooltip>
                                    </UpdateUser>
                                    <Tooltip label='Delete User'>
                                        <DeleteIcon
                                            fontSize='2xl'
                                            onClick={() => handleDelete(d._id)} 
                                            mx='2'
                                            cursor='pointer'
                                        />
                                    </Tooltip>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>

        <Center>
            <HStack centerContent>
                <Button color='teal'>
                    <a href='#' className='page-link' onClick={prePage}>Prev</a>
                </Button>
                {
                    numbers.map((n, i) => (
                        <Button className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href='#' className='page-link' onClick={() => changeCurrPage(n)}>
                                {n}
                            </a>
                        </Button>
                    ))
                }
                <Button color='teal'>
                    <a href='#' className='page-link' onClick={nextPage}>Next</a>
                </Button>
            </HStack>
        </Center>
    </>
  )
}

export default GetUsers