<template>
  <div>
    <div v-b-modal.modal-1>
      <img src="../assets/addContact.png" class="add-img" alt=""></div>
    <b-modal id="modal-1" title="Добавить контакт">
      <div class="input">
        <div class="input-info">
          <b-input type="text" id="name" :placeholder="firstNameText"
                        v-model="newFirstName"
                                   :class="{'empty-field': (isHighlighted && newFirstName === '')}"></b-input>
        </div>
        <div class="input-info">
          <b-input type="text" :placeholder="lastNameText"
                        v-model="newLastName"
                   :class="{'empty-field': (isHighlighted && newLastName === '')}"></b-input>
        </div>
        <div class="input-info">
          <b-input type="number" :placeholder="phoneNumberText"
                        v-model="newPhoneNumber" min="11"
                   :class="{'empty-field': (isHighlighted && newPhoneNumber === '')}"></b-input>
        </div>
        <transition name="fade">
          <div class="row" v-if="isHighlighted">
            <div class="col centered">
              <b-alert show variant="danger" v-text="errorMessage"></b-alert>
            </div>
          </div>
        </transition>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <div @click="addContact">
          <b-button size="sm" v-if="!isHighlighted" variant="success" @click="">
            OK
          </b-button>
          <b-button size="sm" v-if="isHighlighted" variant="success" @click="ok()">
            OK
          </b-button>
        </div>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>

</template>

<script>
    const ERR_MSG_EMPTY_ITEMS = "Вы не заполнили поля: ";

    export default {
        name: "AddItemForm",

        data() {
            return {
                newContact: {},
                newFirstName: "",
                newLastName: "",
                newPhoneNumber: "",
                firstNameText: "Имя",
                lastNameText: "Фамилия",
                phoneNumberText: "Номер телефона",
                isHighlighted: false,
                errorMessage: ""
            }
        },

        methods: {
            addContact() {
                const notFilled = [];
                if (this.newFirstName === "") {
                    notFilled.push(this.firstNameText);
                }
                if (this.newLastName === "") {
                    notFilled.push(this.lastNameText);
                }
                if (this.newPhoneNumber === "") {
                    notFilled.push(this.phoneNumberText);
                }

                if (notFilled.length > 0) {
                    this.isHighlighted = true;
                    this.errorMessage = ERR_MSG_EMPTY_ITEMS + notFilled.join(", ");
                    return;
                }

                this.newContact = {
                    id: (new Date()).getTime(),
                    firstName: this.newFirstName,
                    lastName: this.newLastName,
                    fullName: this.newFirstName + " " + this.newLastName,
                    phoneNumber: this.newPhoneNumber
                };
                this.newFirstName = "";
                this.newLastName = "";
                this.newPhoneNumber = "";
                this.isHighlighted = false;

                this.$emit("add-item", this.newContact);

            }
        }
    }
</script>

<style>
  .input{
    padding-bottom: 0.3em;
  }
  .input-info{
    padding-bottom: 0.5em;
  }
  .add-img{
    width: 90px;
    height: 70px;
    float: right;
    padding-right: 1em;
  }
</style>
