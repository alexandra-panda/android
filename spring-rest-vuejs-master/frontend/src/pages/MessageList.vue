<template>
  <div>
    <message-form :messageAttr="message" />
    <message-row
      v-for="(message, index) in sortedMessages"
      :key="`message.id-${index}`"
      :message="message"
      :editMessage="editMessage"
    />
    
    <lazy-loader></lazy-loader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MessageRow from '@/components/messages/MessageRow.vue';
import MessageForm from '@/components/messages/MessageForm.vue';
import messagesApi from '@/api/messages'
import LazyLoader from '@/components/LazyLoader.vue'

export default {
  components: {
    MessageRow,
    MessageForm,
    LazyLoader
  },
  data() {
    return {
      message: null
    };
  },
  computed: mapGetters(['sortedMessages']),
  methods: {
    editMessage(message) {
      this.message = message;
    },
    deleteMessage(message) {
    }
  }
};
</script>

<style>
</style>