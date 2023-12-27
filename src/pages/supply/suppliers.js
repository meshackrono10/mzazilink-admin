// Page component
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { SuppliersTable } from "src/sections/suppliers/suppliers-table";
import { SuppliersSearch } from "src/sections/suppliers/suppliers-search";
import { applyPagination } from "src/utils/apply-pagination";
import AddSupplier from "src/sections/suppliers/add-suppliers";
import axios from "axios";

const useSuppliers = (page, rowsPerPage) => {
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

        setData(response.data.data);
        setTotal(response.data.message);
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

const useSupplierIds = (suppliers) => {
  return useMemo(() => {
    return suppliers.map((supplier) => supplier.id);
  }, [suppliers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: suppliers, total, isLoading } = useSuppliers(page, rowsPerPage);
  const supplierIds = useSupplierIds(suppliers);
  const suppliersSelection = useSelection(supplierIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

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
              </Stack>
              <div>
                <AddSupplier />
              </div>
            </Stack>
            <SuppliersSearch />
            <SuppliersTable
              count={total}
              items={applyPagination(suppliers, page, rowsPerPage)}
              onDeselectAll={suppliersSelection.handleDeselectAll}
              onDeselectOne={suppliersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={suppliersSelection.handleSelectAll}
              onSelectOne={suppliersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={suppliersSelection.selected}
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
