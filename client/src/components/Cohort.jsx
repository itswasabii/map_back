// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Heading,
//   Text,
//   Input,
//   Button,
//   List,
//   ListItem,
//   Flex,
//   Avatar,
//   Stack,
//   Divider,
//   Spacer,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from '@chakra-ui/react';

// function App() {
//   const [cohorts, setCohorts] = useState([]);
//   const [newCohortName, setNewCohortName] = useState('');
//   const [newCohortType, setNewCohortType] = useState('');
//   const [newCohortYear, setNewCohortYear] = useState('');
//   const [newCohortCourseId, setNewCohortCourseId] = useState('');
//   const [selectedCohort, setSelectedCohort] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [cohortMessages, setCohortMessages] = useState({});

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   useEffect(() => {
//     // Simulating fetching data from API
//     const fetchData = async () => {
//       try {
//         // Replace with actual API call
//         const response = await axios.get('/api/cohorts');
//         setCohorts(response.data);
//       } catch (error) {
//         console.error('Error fetching cohorts:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const createCohort = async () => {
//     try {
//       // Simulating creating cohort
//       const newCohort = {
//         cohort_id: cohorts.length + 1,
//         cohort_name: newCohortName,
//         cohort_type: newCohortType,
//         members: 0,
//       };

//       // Simulating updating state with new cohort
//       setCohorts([...cohorts, newCohort]);

//       // Clearing input fields after creation
//       setNewCohortName('');
//       setNewCohortType('');
//       setNewCohortYear('');
//       setNewCohortCourseId('');
//     } catch (error) {
//       console.error('Error creating cohort:', error);
//     }
//   };

//   const toggleChatVisibility = (cohort) => {
//     setSelectedCohort(selectedCohort === cohort ? null : cohort);
//     if (selectedCohort === cohort) {
//       onClose(); // Close the modal if cohort is deselected
//     } else {
//       onOpen(); // Open the modal if cohort is selected
//     }
//   };

//   const handleSendMessage = (cohortId, message) => {
//     const updatedMessages = {
//       ...cohortMessages,
//       [cohortId]: [...(cohortMessages[cohortId] || []), message],
//     };
//     setCohortMessages(updatedMessages);
//     setMessageInput(''); // Clear message input after sending
//   };

//   const handleChangeMessageInput = (e) => {
//     setMessageInput(e.target.value);
//   };

//   return (
//     <Box p={8} bg="gray.100">
//       <Flex direction="column" align="center">
//         <Box bg="white" p={8} borderRadius="md" boxShadow="md" w="full" maxW="lg">
//           <Heading size="xl" mb={4}>
//             Create New Cohort
//           </Heading>
//           <Stack spacing={4}>
//             <Input
//               placeholder="Cohort Name"
//               value={newCohortName}
//               onChange={(e) => setNewCohortName(e.target.value)}
//             />
//             <Input
//               placeholder="Cohort Type (public or private)"
//               value={newCohortType}
//               onChange={(e) => setNewCohortType(e.target.value)}
//             />
//             <Input
//               placeholder="Year of Enrollment"
//               value={newCohortYear}
//               onChange={(e) => setNewCohortYear(e.target.value)}
//             />
//             <Input
//               placeholder="Course ID"
//               value={newCohortCourseId}
//               onChange={(e) => setNewCohortCourseId(e.target.value)}
//             />
//             <Button colorScheme="blue" onClick={createCohort}>
//               Create Cohort
//             </Button>
//           </Stack>
//         </Box>
//       </Flex>

//       <Box mt={8}>
//         <Heading size="xl" mb={4}>
//           Cohorts
//         </Heading>
//         <List spacing={4}>
//           {cohorts.map((cohort) => (
//             <ListItem key={cohort.cohort_id} bg="white" p={4} borderRadius="md" boxShadow="md">
//               <Flex align="center">
//                 <Avatar size="sm" mr={4} />
//                 <Text fontWeight="bold">{cohort.cohort_name}</Text>
//                 <Spacer />
//                 <Text>
//                   ({cohort.cohort_type}) - {cohort.members} members
//                 </Text>
//                 <Button ml={4} colorScheme="blue" onClick={() => toggleChatVisibility(cohort)}>
//                   {selectedCohort === cohort ? 'Hide' : 'View'} Group Chat
//                 </Button>
//               </Flex>
//               {selectedCohort === cohort && (
//                 <>
//                   <Divider mt={2} mb={2} />
//                   <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
//                     <Flex mt={2}>
//                       <Input
//                         placeholder="Type your message..."
//                         value={messageInput}
//                         onChange={handleChangeMessageInput}
//                       />
//                       <Button
//                         ml={2}
//                         colorScheme="blue"
//                         onClick={() => handleSendMessage(cohort.cohort_id, messageInput)}
//                       >
//                         Send
//                       </Button>
//                     </Flex>
//                     <Box mt={4}>
//                       {cohortMessages[cohort.cohort_id]?.map((message, index) => (
//                         <Box key={index} p={2} bg="white" boxShadow="sm" borderRadius="md" mb={2}>
//                           <Text>{message}</Text>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 </>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Modal for displaying group chat */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Group Chat</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {selectedCohort && (
//               <>
//                 {cohortMessages[selectedCohort.cohort_id]?.map((message, index) => (
//                   <Box key={index} p={2} bg="white" boxShadow="sm" borderRadius="md" mb={2}>
//                     <Text>{message}</Text>
//                   </Box>
//                 ))}
//                 <Flex mt={2}>
//                   <Input
//                     placeholder="Type your message..."
//                     value={messageInput}
//                     onChange={handleChangeMessageInput}
//                   />
//                   <Button
//                     ml={2}
//                     colorScheme="blue"
//                     onClick={() => handleSendMessage(selectedCohort.cohort_id, messageInput)}
//                   >
//                     Send
//                   </Button>
//                 </Flex>
//               </>
//             )}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  List,
  ListItem,
  Flex,
  Avatar,
  Stack,
  Divider,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react';

function App() {
  const [cohorts, setCohorts] = useState([]);
  const [newCohortName, setNewCohortName] = useState('');
  const [newCohortType, setNewCohortType] = useState('');
  const [newCohortYear, setNewCohortYear] = useState('');
  const [newCohortCourseId, setNewCohortCourseId] = useState('');
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [cohortMessages, setCohortMessages] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/cohorts');
        setCohorts(response.data);
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchData();
  }, []);

  const createCohort = async () => {
    try {
      const newCohort = {
        cohort_id: cohorts.length + 1,
        cohort_name: newCohortName,
        cohort_type: newCohortType,
        members: 0,
        year: newCohortYear,
        course_id: newCohortCourseId,
      };

      setCohorts([...cohorts, newCohort]);
      setNewCohortName('');
      setNewCohortType('');
      setNewCohortYear('');
      setNewCohortCourseId('');
    } catch (error) {
      console.error('Error creating cohort:', error);
    }
  };

  const toggleChatVisibility = (cohort) => {
    setSelectedCohort(selectedCohort === cohort ? null : cohort);
    if (selectedCohort === cohort) {
      onClose(); // Close the modal if cohort is deselected
    } else {
      onOpen(); // Open the modal if cohort is selected
    }
  };

  const handleSendMessage = (cohortId, message) => {
    const updatedMessages = {
      ...cohortMessages,
      [cohortId]: [...(cohortMessages[cohortId] || []), message],
    };
    setCohortMessages(updatedMessages);
    setMessageInput(''); // Clear message input after sending
  };

  const handleChangeMessageInput = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <Box p={8} bg="gray.100">
      <Flex direction="column" align="center">
        <Box bg="white" p={8} borderRadius="md" boxShadow="md" w="full" maxW="lg">
          <Heading size="xl" mb={4}>
            Create New Cohort
          </Heading>
          <Stack spacing={4}>
            <Input
              placeholder="Cohort Name"
              value={newCohortName}
              onChange={(e) => setNewCohortName(e.target.value)}
            />
            <Input
              placeholder="Cohort Type (public or private)"
              value={newCohortType}
              onChange={(e) => setNewCohortType(e.target.value)}
            />
            <Input
              placeholder="Year of Enrollment"
              value={newCohortYear}
              onChange={(e) => setNewCohortYear(e.target.value)}
            />
            <Input
              placeholder="Course ID"
              value={newCohortCourseId}
              onChange={(e) => setNewCohortCourseId(e.target.value)}
            />
            <Button colorScheme="blue" onClick={createCohort}>
              Create Cohort
            </Button>
          </Stack>
        </Box>
      </Flex>

      <Box mt={8}>
        <Heading size="xl" mb={4}>
          Cohorts
        </Heading>
        <List spacing={4}>
          {cohorts.map((cohort) => (
            <ListItem key={cohort.cohort_id} bg="white" p={4} borderRadius="md" boxShadow="md">
              <Flex align="center">
                <Avatar size="sm" mr={4} />
                <Box flex="1">
                  <HStack justifyContent="space-between">
                    <Text fontWeight="bold">{cohort.cohort_name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {cohort.members} members
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    {cohort.cohort_type} - {cohort.year}
                  </Text>
                </Box>
                <Button ml={4} colorScheme="blue" onClick={() => toggleChatVisibility(cohort)}>
                  {selectedCohort === cohort ? 'Hide' : 'View'} Chat
                </Button>
              </Flex>
              {selectedCohort === cohort && (
                <>
                  <Divider mt={2} mb={2} />
                  <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                    <Flex mt={2}>
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={handleChangeMessageInput}
                      />
                      <Button
                        ml={2}
                        colorScheme="blue"
                        onClick={() => handleSendMessage(cohort.cohort_id, messageInput)}
                      >
                        Send
                      </Button>
                    </Flex>
                    <Box mt={4}>
                      {cohortMessages[cohort.cohort_id]?.map((message, index) => (
                        <Box key={index} p={2} bg="white" boxShadow="sm" borderRadius="md" mb={2}>
                          <Text>{message}</Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCohort && (
              <>
                <Heading size="md" mb={2}>
                  Group Chat for "{selectedCohort.cohort_name}"
                </Heading>
                <Box>
                  {cohortMessages[selectedCohort.cohort_id]?.map((message, index) => (
                    <Box key={index} p={2} bg="white" boxShadow="sm" borderRadius="md" mb={2}>
                      <Text>{message}</Text>
                    </Box>
                  ))}
                </Box>
                <Flex mt={2}>
                  <Input
                    placeholder={`Type your message for "${selectedCohort.cohort_name}"...`}
                    value={messageInput}
                    onChange={handleChangeMessageInput}
                  />
                  <Button
                    ml={2}
                    colorScheme="blue"
                    onClick={() => handleSendMessage(selectedCohort.cohort_id, messageInput)}
                  >
                    Send
                  </Button>
                </Flex>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
