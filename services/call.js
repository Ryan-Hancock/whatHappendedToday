export function getHistoryFromApi() {
    return fetch('https://history.muffinlabs.com/date')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }