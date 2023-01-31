import { pageLoading } from "./variables";

const pageIsLoading = (isLoading) => {
  if (isLoading) {
    pageLoading.style.visibility = 'visible'
    pageLoading.style.opacity = '1'
  }
  else {
    pageLoading.style.visibility = 'hidden'
    pageLoading.style.opacity = '0'
  };
};

export {pageIsLoading}
