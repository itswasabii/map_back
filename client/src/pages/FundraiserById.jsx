import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { Box, Flex, Heading, Input, Text, Button } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FundraiserById() {
  const { id } = useParams();
  const [fundraiserById, setFundraiserById] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    amount: ""
  });

  useEffect(() => {
    const getFundraiserById = async () => {
      try {
        const response = await fetch(`/api/fundraisers/${id}`);
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
        const data = await response.json();
        setFundraiserById(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getFundraiserById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5555/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fundraiser_id: id,
          user_id: 1,  // Replace with the actual user ID
          amount: parseFloat(formData.amount)
        })
      });

      if (response.ok) {
        toast.success('Donation submitted successfully', {
          position: 'top-right',
          autoClose: 3000
        });
        setFormData({
          username: "",
          email: "",
          amount: ""
        });
        // Refresh the fundraiser data to reflect the new donation
        const updatedFundraiser = await fetch(`/api/fundraisers/${id}`);
        const updatedData = await updatedFundraiser.json();
        setFundraiserById(updatedData);
      } else {
        throw new Error('Failed to submit donation');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('An error occurred. Please try again later.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <TopNav />
      <Sidebar />
      <div className="relative w-full h-[calc(100vh-70px)] xl:w-[calc(100vw-250px)] ml-[0px] xl:ml-[250px] overflow-y-scroll mt-[70px]">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Flex flexDir={{ base: "column", lg: "row" }} align={'stretch'}>
            <Box px={"30px"} py={"10px"} w={{base:'100%',lg:'50%'}}>
              <Heading pb={"10px"}>{fundraiserById.title}</Heading>
              <Text maxW={"650px"}>{fundraiserById.description}</Text>
              <Flex
                flexWrap={"wrap"}
                align={"center"}
                justify={{ base: "space-between", md: "start" }}
                pt={8}
                px={4}
                gap={{ base: 0, md: "100px" }}
              >
                <Box maxW={"300px"}>
                  <Text>Goal amount</Text>
                  <Text
                    fontSize={{ base: "1.6rem", md: "2.6rem" }}
                    fontWeight="bold"
                  >
                    {fundraiserById.goal_amount}
                  </Text>
                  <Text>
                    Start Date:
                    {new Date(fundraiserById.start_date).toDateString()}
                  </Text>
                </Box>
                <Box>
                  <Text>Current amount</Text>
                  <Text
                    fontSize={{ base: "1.6rem", md: "2.6rem" }}
                    fontWeight="bold"
                  >
                    {fundraiserById.current_amount}
                  </Text>
                  <Text>
                    End Date:
                    {new Date(fundraiserById.end_date).toDateString()}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box w={{base:'100%',lg:'50%'}} px={5}>
              <form onSubmit={handleSubmit}>
                <Heading pt={'40px'}>Make a Donation</Heading>
                <Input
                  my={2}
                  placeholder="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant={'filled'}
                />
                <Input
                  my={2}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant={'filled'}
                />
                <Input
                  my={2}
                  placeholder="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  variant={'filled'}
                />
                <Button colorScheme="teal" my={2} type="submit">
                  Submit
                </Button>
              </form>
            </Box>
          </Flex>
        )}
      </div>
    </>
  );
}

export default FundraiserById;
