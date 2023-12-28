// PaymentsPage component
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import AddPayment from "src/sections/payments/add-payments";
import { PaymentSearch } from "src/sections/payments/payments-search";
import { PaymentTable } from "src/sections/payments/payments-table";
import axios from "axios";

const usePayments = (page, rowsPerPage) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const storedToken = localStorage.getItem("token").toString();
        const response = await axios.post(
          "http://159.203.141.75:81/api/v1/school/procurement/school-payment/",
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

const usePaymentIds = (payments) => {
  return useMemo(() => {
    return payments.map((payment) => payment.id);
  }, [payments]);
};

const PaymentsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: payments, total, isLoading } = usePayments(page, rowsPerPage);
  const paymentIds = usePaymentIds(payments);
  const paymentsSelection = useSelection(paymentIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Payments | Devias Kit</title>
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
                <Typography variant="h4">Payments</Typography>
              </Stack>
              <div>
                <AddPayment />
              </div>
            </Stack>
            <PaymentSearch />
            <PaymentTable
              count={total}
              items={applyPagination(payments, page, rowsPerPage)}
              onDeselectAll={paymentsSelection.handleDeselectAll}
              onDeselectOne={paymentsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={paymentsSelection.handleSelectAll}
              onSelectOne={paymentsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={paymentsSelection.selected}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

PaymentsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentsPage;
