<template>
  <div class="container">
    <div class="popover-header">
      <div class="nameHeader"><h2>Контакты</h2></div>
      <SearchForm class="searchForm" @search-items="setSearchString"></SearchForm>
    </div>
    <div class="add">
      <AddItemForm v-model="newContact" @add-item="addItem"></AddItemForm>
    </div>
    <b-container class="bv-example-row" v-if="list.length !== 0">
      <b-row class="main">
        <b-col class="col-1"><b>№</b></b-col>
        <b-col class="col-md-4"><b>Имя и фамилия</b></b-col>
        <b-col class="col-4"><b>Номер телефона</b></b-col>
        <b-col class="col-sm-2"><b>Delete</b></b-col>
      </b-row>
    </b-container>
    <transition-group name="fade">
      <PhoneBookItem v-for="(item, index) in filteredList"
                     :item="item"
                     :index="index"
                     :key="item.id"
                     @remove-item="removeItem"></PhoneBookItem>
    </transition-group>
    <div class="row top-space" v-if="list.length === 0">
      Пока нет ни одного контакта.
    </div>
  </div>
</template>

<script>
    import PhoneBookItem from './PhoneBookItem.vue';
    import AddItemForm from "./AddItemForm.vue";
    import SearchForm from "./SearchForm";

    export default {
        name: "PhoneBook",
        components: {AddItemForm, PhoneBookItem, SearchForm},
        props: ["item"],
        data() {
            return {
                newContact: {},

                list: [

                ],

                /* для поиска */
                searchString: ""
            };
        },

        computed: {
            filteredList: function () {
                const str = this.searchString.toLowerCase();
                return this.list.filter(function (item) {
                    return (str.length === 0 ||
                        item.firstName.toLowerCase().indexOf(str) >= 0 ||
                        item.lastName.toLowerCase().indexOf(str) >= 0 ||
                        item.phoneNumber.toLowerCase().indexOf(str) >= 0);
                });
            }
        },

        methods: {
            addItem(item) {
                const isFound = this.list.some(function (contact) {
                    return contact.phoneNumber === item.phoneNumber;
                });

                if (isFound) {
                    this.$bvModal.msgBoxOk('Контакт с таким номером телефона уже есть!', {
                        size: 'md',
                        buttonSize: 'sm',
                        okVariant: 'primary',
                        hideHeader: true,
                        hideHeaderClose: true,
                        footerClass: 'p-2',
                        centered: false
                    });
                } else {
                    this.list.push(item);
                }
            },
            removeItem(item) {
                const confirmMessage =
                    `Вы действительно хотите удалить ${item.fullName}?`;

                this.$bvModal.msgBoxConfirm(confirmMessage, {
                    size: 'md',
                    buttonSize: 'sm',
                    okVariant: 'primary',
                    okTitle: 'Удалить',
                    cancelTitle: 'Отмена',
                    footerClass: 'p-2',
                    hideHeader: true,
                    hideHeaderClose: true,
                    centered: false
                }).then(value => {
                    if (value) {
                        const toDelete = [item];

                        this.list = this.list.filter(function (e) {
                            return !toDelete.includes(e);
                        });

                        this.selectedList = [];
                        this.selectAll = false;
                    }
                });
            },
            setSearchString(searchString) {
                this.searchString = searchString;
            }
        }

    }
</script>
<style scoped>
  .nameHeader {
    float: left;
  }

  .searchForm {
    float: right;
    padding-top: 0.7em;
  }

  .container {
    flex-direction: row;
  }

  .popover-header {
    min-height: 4em;
  }

  .add {
    padding-top: 1em;
  }
  .top-space{
    justify-content: center;
    padding-top: 2em;
  }
</style>
