import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  name: 'analysis',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: 'monitor',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  name: 'workplace',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              name: 'form',
              icon: 'form',
              path: '/form',
              routes: [
                {
                  name: 'step',
                  path: '/form/step/form',
                  component: './form/step/form',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  routes: [
                    {
                      name: 'articles',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                    },
                    {
                      name: 'projects',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'applications',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                    },
                  ],
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              routes: [
                {
                  name: 'basic',
                  path: '/profile/basic',
                  component: './profile/basic',
                },
                {
                  name: 'advanced',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              name: 'result',
              icon: 'check-circle-o',
              path: '/result',
              routes: [
                {
                  name: 'success',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'fail',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  name: '403',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  name: 'settings',
                  path: '/account/settings',
                  component: './account/settings',
                },
                {
                  name: 'center',
                  path: '/account/center',
                  component: './account/center',
                },
              ],
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  name: 'flow',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'koni',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
                {
                  name: 'mind',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
              ],
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register',
              path: '/user/register',
              component: './user/register',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
