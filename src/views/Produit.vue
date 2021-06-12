<template>
  <div class="pa-md-4">
    <div class="pa-md-4">
      <AddProduct />
    </div>
    <ProductsTable />
  </div>
</template>
<script>
import ProductsTable from "../components/Product/ProductsTable.vue";
import AddProduct from "../components/Product/AddProduct.vue";

export default {
  name: "Admin page",

  components: {
    ProductsTable,
    AddProduct,
  },
};
</script>
