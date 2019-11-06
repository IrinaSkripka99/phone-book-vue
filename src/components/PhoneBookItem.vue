<template>
<div>
  <b-row class="col">
    <b-col class="col-1" v-text="index+1"></b-col>
    <b-col class="col-md-4" v-text="item.fullName"></b-col>
    <b-col class="col-4" v-text="item.phoneNumber"></b-col>
    <b-col class="col-sm-2" style="">
      <b-button pill title="Удалить" class="deleteContact" variant="danger" @click="remove">x</b-button>
    </b-col>
  </b-row>
  <hr style="width: 85%;float: left">
</div>

</template>

<script>
  export default {
    name: "PhoneBookItem",
    props: ["item", "index", "selectAll"],
    data() {
      return {
        selected: false
      }
    },
    methods: {
      remove() {
        this.$emit("remove-item", this.item);
      }
    },
    watch: {
      selectAll: function (newValue) {
        this.selected = newValue;
      },
      selected: function (newValue) {
        this.$emit("selection-changed", this.item, newValue);
      }
    }
  }
</script>
<style>
  .col{
    max-width: 94%;
    padding-top: 0.7em;
  }
</style>
