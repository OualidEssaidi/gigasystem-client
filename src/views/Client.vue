<template>
  <div class="container">
    <CustomerTable />
  </div>
</template>

<script>
import CustomerTable from "../components/Customer/CustomerTable.vue";

export default {
  name: "product page",

  components: {
    CustomerTable,
  },
};
</script>

