import { useRouter } from "next/router";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import SingleSupplier from "src/sections/suppliers/single-supplier";

const Supplier = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Supplier {id} | Devias Kit</title>
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
                <Typography variant="h4">Supplier Details</Typography>
              </Stack>
            </Stack>
            <SingleSupplier />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Supplier.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Supplier;
