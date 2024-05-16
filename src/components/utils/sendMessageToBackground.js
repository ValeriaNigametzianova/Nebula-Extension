export const sendMessageToBackground = (message, tabURL) => {
  chrome.runtime.sendMessage(
    {
      message: message,
      tabURL: tabURL,
    },
    (response) => {
      console.log(response)
    }
  )
}
