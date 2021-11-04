import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/lib/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primari: '#FFFFFF',
        secondary: '#008DC0',
        accent: '#008037',
        error: '#FF1616',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang:{
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdiSvg',
  },
});
