import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken4,
        secondary: colors.red.darken3,
        accent: colors.indigo.base,
      },
      dark: true,
    },
  },
});
