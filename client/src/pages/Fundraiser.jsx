import {
  Box,
  Flex,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import fundraise_img from "../assets/fund.jpg";
import Donate from "../components/Donate";

function Fundraiser() {
  return (
    <Box marginTop={"30px"}>
      <Box
        h={"40vh"}
        bgPosition={"bottom"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        bgImage={fundraise_img}
      ></Box>

      <Box px={{ base: 5, md: 50 }}>
        <Flex gap={10} flexDir={{ base: "column", md: "row" }}>
          <Box
            w={{ base: "100%", md: "50%" }}
            ml={{ base: "2px", md: "50px", lg: "70px", xl: "100px" }}
          >
            <Heading
              color={"#101F3C"}
              letterSpacing={1}
              pt={8}
              fontSize={"2.5rem"}
              fontWeight={"800"}
              lineHeight={"50px"}
            >
              Building a <br />
              Brighter future
            </Heading>
            <Text maxW={"650px"} py={8} letterSpacing={1}>
              Welcome to our fundraising page! As proud alumni of Moringa
              School, we're coming together to make a meaningful impact on the
              future of our alma mater. Think back to your time at Moringa
              School—the late-night coding sessions, the breakthrough moments,
              and the friendships forged over a shared passion for technology.
              Now, it's our turn to pay it forward and ensure that future
              students have the same opportunities to succeed.
            </Text>
          </Box>
          <Flex
            w={{ base: "100%", md: "50%" }}
            h={"auto"}
            align={"stretch"}
            py={{ base: "5px", md: "50px" }}
          >
            <div className="border-r-2 border-dotted border-[#101f3C] mr-4 rounded-sm relative md:hidden">
              <Box
                w="10px"
                h="10px"
                rounded="full"
                right={-5.5}
                bg="#101f3c"
                position="absolute"
              />
              <Box
                w="10px"
                h="10px"
                rounded="full"
                right={-5.5}
                top={{ base: "180px", md: "110px" }}
                bg="#101f3c"
                position="absolute"
              />
            </div>
            <Box maxW={"650px"}>
              <Text letterSpacing={1}>
                <Text as={"span"} fontSize={"1.2rem"} fontWeight={"bold"}>
                  Our goal
                </Text>
                <br />
                Supporting students by providing mentorship, career support, and
                increasing the number of scholarships available. Every dollar
                raised will go towards creating a supportive environment where
                students can thrive academically and professionally.
              </Text>
              <Text letterSpacing={1}>
                <Text as={"span"} fontWeight={"bold"} fontSize={"1.2rem"}>
                  Impact
                </Text>
                <br />
                By supporting this project, you'll be investing in the future of
                tech in Kenya. Your contribution will empower students to pursue
                their dreams, gain valuable skills, and make a positive impact
                in the tech industry and beyond.
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Donate />
        <Box
          ml={{ base: "2px", md: "50px", lg: "70px", xl: "100px" }}
          p={5}
          width={{ base: "100%", md: "70%", lg: "50%" }}
        >
          <Text fontSize={"1.8rem"} py={5} fontWeight={"800"}>
            FAQs
          </Text>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" fontWeight={'600'} flex="1" textAlign="left">
                    How will my donation be used?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Your donation will support students by providing mentorship,
                career support, and scholarships to attend Moringa School.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" fontWeight={'600'} flex="1" textAlign="left">
                    Is my donation tax-deductible?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yes, all donations are tax-deductible to the extent allowed by
                law. You'll receive a receipt for your contribution.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" fontWeight={'600'} flex="1" textAlign="left">
                    How can I get involved beyond making a donation?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                There are many ways to get involved beyond making a donation.
                You can volunteer your time to mentor students, spread the word
                about Moringa School's mission, or participate in fundraising
                events. Contact us to learn more about volunteer opportunities
                and other ways to support our cause.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" fontWeight={'600'} flex="1" textAlign="left">
                    Can I specify how my donation will be used?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                At this time, donations are used to support various initiatives
                at Moringa School, including student scholarships, mentorship
                programs, and facility upgrades. However, if you have specific
                preferences, please reach out to us, and we'll do our best to
                accommodate your request.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}

export default Fundraiser;
