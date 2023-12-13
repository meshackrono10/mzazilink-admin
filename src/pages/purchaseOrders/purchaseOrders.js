import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { PurchaseOrdersSearch } from "src/sections/purchaseOrders/purchaseOrders-search";
import { PurchaseOrdersTable } from "src/sections/purchaseOrders/purchaseOrders-table";
import AddPurchaseOrders from "src/sections/purchaseOrders/add-purchaseOrders";
import axios from "axios";

const usePurchaseOrders = (page, rowsPerPage) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token").toString();
        const fetchedData = await axios.post(
          "http://159.203.141.75:81/api/v1/school/procurement/purchase-orders/",
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

        setData(fetchedData.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return data;
};

const usePurchaseOrderIds = (purchaseOrders) => {
  return useMemo(() => {
    return purchaseOrders.map((order) => order.id);
  }, [purchaseOrders]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const purchaseOrders = usePurchaseOrders(page, rowsPerPage);
  const purchaseOrderIds = usePurchaseOrderIds(purchaseOrders);
  const purchaseOrdersSelection = useSelection(purchaseOrderIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Purchase Orders | Devias Kit</title>
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
                <Typography variant="h4">Purchase Orders </Typography>
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
                <AddPurchaseOrders />
              </div>
            </Stack>
            <PurchaseOrdersSearch />
            <PurchaseOrdersTable
              count={purchaseOrders.length}
              items={applyPagination(purchaseOrders, page, rowsPerPage)}
              onDeselectAll={purchaseOrdersSelection.handleDeselectAll}
              onDeselectOne={purchaseOrdersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={purchaseOrdersSelection.handleSelectAll}
              onSelectOne={purchaseOrdersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={purchaseOrdersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
