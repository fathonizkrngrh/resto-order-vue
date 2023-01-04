<template>
  <!-- Modal -->
  <div>
    <b-button v-b-modal.modalOrder>Show Modal</b-button>

    <b-modal
      :ok-disabled="true"
      :cancel-disabled="true"
      id="modalOrder"
      centered
      title="Complete your information"
    >
      <b-form>
        <b-form-group id="username" label="Your Name:" label-for="username">
          <b-form-input
            id="input-username"
            v-model="orders.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="tableNumber"
          label="Table Number:"
          label-for="tableNumber"
        >
          <b-form-select
            id="input-tableNumber"
            v-model="orders.tableNumber"
            :options="tableNumber"
            required
          ></b-form-select>
          <template #modal-footer="submit">
            <b-button variant="success" @click="submit()"> Submit </b-button>
          </template>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalOrder",
  data() {
    return {
      orders: {},
      tableNumber: [
        { text: "Select One", value: null },
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ],
    };
  },
  props: ["productCarts"],
};
</script>

<style></style>
