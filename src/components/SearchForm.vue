<template>
    <b-button-toolbar>
      <b-button-group size="sm" class="mr-1">
        <b-button variant="danger" @click="search">Поиск</b-button>
        <b-button variant="success" @click="clearFilter">Сброс</b-button>
      </b-button-group>
      <b-input-group size="sm">
        <b-form-input placeholder="Search..." class="text-left" v-model="searchString"></b-form-input>
      </b-input-group>
    </b-button-toolbar>
</template>

<script>
    export default {
        name: "SearchForm",
        data() {
            return {
                searchString: ""
            }
        },
        methods: {
            search() {
                this.$emit("search-items", this.searchString);
            },
            clearFilter() {
                this.searchString = "";
                this.$emit("search-items", "");
            }
        }
    }
</script>
<style scoped>
  .btn-toolbar {
    justify-content: flex-end;
  }
</style>
