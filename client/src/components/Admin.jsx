import React from 'react';
import { Box } from '@chakra-ui/react';
import AdminSidebar from './AdminSidebar';
import CreateFundraiser from './CreateFundraiser';
import CreateCohort from './CreateCohort';
import SendMassEmails from './SendMassEmails';
import ViewAllUsers from './ViewAllUsers';

const Admin = () => {
  return (
    <div>      
      <Box p={8} className="">
        <CreateFundraiser />
        <CreateCohort />
        <SendMassEmails/>
        <ViewAllUsers/>
      </Box>
    </div>
  );
};

export default Admin;
