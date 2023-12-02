import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { SuppliersTable } from "src/sections/suppliers/suppliers-table"; // Changed from CustomersTable
import { SuppliersSearch } from "src/sections/suppliers/suppliers-search"; // Changed from CustomersSearch
import { applyPagination } from "src/utils/apply-pagination";
import AddSupplier from "src/sections/suppliers/add-suppliers"; // Changed from AddCustomer
import axios from "axios";

const useSuppliers = (page, rowsPerPage, data) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);
};

const useSupplierIds = (suppliers) => {
  return useMemo(() => {
    return suppliers.map((supplier) => supplier.id);
  }, [suppliers]);
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const suppliers = useSuppliers(page, rowsPerPage, data);
  const supplierIds = useSupplierIds(suppliers);
  const suppliersSelection = useSelection(supplierIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token").toString();
        const fetchedData = await axios.post(
          "http://159.203.141.75:81/api/v1/school/procurement/suppliers/",
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

        setData(fetchedData.data.data); // Use fetched data from the API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]); // Include dependencies to rerun the effect when page or rowsPerPage change

  return (
    <>
      <Head>
        <title>Suppliers | Devias Kit</title>
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
                <Typography variant="h4">Suppliers</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <AddSupplier />
              </div>
            </Stack>
            <SuppliersSearch />
            <SuppliersTable
              count={data.length}
              items={suppliers}
              onDeselectAll={suppliersSelection.handleDeselectAll}
              onDeselectOne={suppliersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={suppliersSelection.handleSelectAll}
              onSelectOne={suppliersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={suppliersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
