<template>
    <v-dialog
        v-model="datePopup"
        persistent
        max-width="290px"
        min-width="290px"
        >
        <template v-slot:activator="{ on }">
            <v-text-field
            readonly
            v-model="date"
            label="Date"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="date">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="cancelPopup">Cancel</v-btn>
            <v-btn text color="primary" @click="confirmPopup">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
export default {
    props: ["initialDate"],
    data() {
        return {
            date: this.initialDate,
            tempDate: '',
            datePopup: false,
        }
    },
    methods: {
        cancelPopup() {
            this.date = this.tempDate;
            this.datePopup = false;
        },
        confirmPopup() {
            this.$emit("date-saved", this.date);
            this.datePopup = false;
        }
    },
    watch: {
        // store the last saved date upon opening the dialog for if the user makes a change and wants to cancel it
        datePopup: function(datePopup) {
            if(datePopup) {
                this.tempDate = this.date;
            }
        }
    }
}
</script>