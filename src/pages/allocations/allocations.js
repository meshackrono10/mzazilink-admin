// Page component
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { AllocationTable } from "src/sections/allocations/allocations-table";
import { AllocationSearch } from "src/sections/allocations/allocations-search";
import AddAllocation from "src/sections/allocations/add-allocations";
import axios from "axios";

const useAllocations = (page, rowsPerPage) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          // Handle the case where the token is not available
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.post(
          "http://159.203.141.75:81/api/v1/school/procurement/allocations/",
          {
            offset: page * rowsPerPage,
            per_page: rowsPerPage,
          },
          {
            headers: {
              token: storedToken,
            },
          }
        );

        setData(response.data.data);
        setTotal(response.data.message);
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return { data, total, isLoading };
};

const useAllocationIds = (allocations) => {
  return useMemo(() => {
    return allocations.map((allocation) => allocation.id);
  }, [allocations]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: allocations, total, isLoading } = useAllocations(page, rowsPerPage);
  const allocationIds = useAllocationIds(allocations);
  const allocationsSelection = useSelection(allocationIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Allocations | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Allocations</Typography>
              </Stack>
              <div>
                <AddAllocation />
              </div>
            </Stack>
            <AllocationSearch />
            <AllocationTable
              count={total}
              items={applyPagination(allocations, page, rowsPerPage)}
              onDeselectAll={allocationsSelection.handleDeselectAll}
              onDeselectOne={allocationsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={allocationsSelection.handleSelectAll}
              onSelectOne={allocationsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={allocationsSelection.selected}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
