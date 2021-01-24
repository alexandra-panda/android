<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <v-btn text to="/">Home page</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="!profile">
        Необходимо авторизоваться через
        <a href="/login">Google</a>
      </div>
      <div v-if="profile">
        <v-btn to="/user" text>{{profile.name}}</v-btn>
        <v-btn icon href="/logout">
          <v-icon>{{logoutIcon}}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mdiExitToApp } from '@mdi/js';
import { addHandler } from '@/util/ws';
export default {
  computed: mapState(['profile']),
  methods: mapMutations([
    'addMessageMutation',
    'updateMessageMutation',
    'removeMessageMutation',
    'addCommentMutation'
  ]),
  data() {
    return {
      logoutIcon: mdiExitToApp
    };
  },
  created() {
    addHandler(data => {
      if (data.objectType === 'MESSAGE') {
        switch (data.eventType) {
          case 'CREATE':
            this.addMessageMutation(data.body);
            break;
          case 'UPDATE':
            this.updateMessageMutation(data.body);
            break;
          case 'REMOVE':
            this.removeMessageMutation(data.body);
            break;
          default:
            console.error(
              `Looks like the event type if unknown "${data.eventType}"`
            );
        }
      } else if (data.objectType === 'COMMENT') {
        switch (data.eventType) {
          case 'CREATE':
            this.addCommentMutation(data.body);
            break;
          default:
            console.error(
              `Looks like the event type if unknown "${data.eventType}"`
            );
        }
      } else {
        console.error(`object type is error: ${data.objectType}`);
      }
    });
  }
};
</script>

<style>
</style>