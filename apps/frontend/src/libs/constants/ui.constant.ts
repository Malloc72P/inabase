export const UiConstants = {
  delay: {
    globalLoading: 300,
  },
  sessionStorage: {
    generateKey: (key: string, param?: string[]) => {
      const keyArray = ['ina-scroll', key];

      if (param) {
        keyArray.push(...param);
      }

      return keyArray.join('-');
    },
  },
};
