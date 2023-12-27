// ExpensesPage component
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import AddExpenses from "src/sections/expenses/add-expenses";
import { ExpensesSearch } from "src/sections/expenses/expenses-search";
import { ExpensesTable } from "src/sections/expenses/expenses-table";
import axios from "axios";

const useExpenses = (page, rowsPerPage) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const storedToken = localStorage.getItem("token").toString();
        const response = await axios.post(
          "http://159.203.141.75:81/api/v1/school/procurement/school-expenses/",
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

const useExpenseIds = (expenses) => {
  return useMemo(() => {
    return expenses.map((expense) => expense.id);
  }, [expenses]);
};

const ExpensesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: expenses, total, isLoading } = useExpenses(page, rowsPerPage);
  const expenseIds = useExpenseIds(expenses);
  const expensesSelection = useSelection(expenseIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Expenses | Devias Kit</title>
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
                <Typography variant="h4">Expenses</Typography>
              </Stack>
              <div>
                <AddExpenses />
              </div>
            </Stack>
            <ExpensesSearch />
            <ExpensesTable
              count={total}
              items={applyPagination(expenses, page, rowsPerPage)}
              onDeselectAll={expensesSelection.handleDeselectAll}
              onDeselectOne={expensesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={expensesSelection.handleSelectAll}
              onSelectOne={expensesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={expensesSelection.selected}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ExpensesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ExpensesPage;
