import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function FundraiserById() {
  const { id } = useParams();
  const [fundraiserById, setFundraiserById] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFundraiserById = async () => {
      try {
        const response = await fetch(`/api/fundraisers/${id}`);
        if (!response.ok)
          throw new Error(`HTTP Error! status: ${response.status}`);
        const data = await response.json();
        setFundraiserById(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getFundraiserById();
  }, [id]);
  

  return (
    <>
      <TopNav />
      <Sidebar />
      <div className="relative w-full h-[calc(100vh-70px)] xl:w-[calc(100vw-250px)] ml-[0px] xl:ml-[250px] overflow-y-scroll mt-[70px]">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {
              <Box px={'30px'} py={'10px'}>
                <Heading pb={'10px'}>{fundraiserById.title}</Heading>
                <Text maxW={'650px'}>{fundraiserById.description}</Text>
                <Flex  flexWrap={"wrap"} align={'center'} justify={{base:"space-between",md:'start'}} pt={8} px={4} gap={{base:0,md:8}}>
                    <Box>
                    <Text>Goal amount</Text>
                    <Text fontSize={'1.6rem'} fontWeight='bold'>{fundraiserById.goal_amount},000</Text>
                    </Box>
                    <Box>
                    <Text>Current amount</Text>
                    <Text fontSize={'1.6rem'} fontWeight='bold'>{fundraiserById.current_amount},000</Text>
                    </Box>
                </Flex>
              </Box>
            }
          </>
        )}
      </div>
    </>
  );
}

export default FundraiserById;
