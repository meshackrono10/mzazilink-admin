// Page component
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
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const storedToken = localStorage.getItem("token").toString();
        const response = await axios.post(
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

const usePurchaseOrderIds = (purchaseOrders) => {
  return useMemo(() => {
    return purchaseOrders.map((order) => order.id);
  }, [purchaseOrders]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: purchaseOrders, total, isLoading } = usePurchaseOrders(page, rowsPerPage);
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
              </Stack>
              <div>
                <AddPurchaseOrders />
              </div>
            </Stack>
            <PurchaseOrdersSearch />
            <PurchaseOrdersTable
              count={total}
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
