const timeout = 5000;

const sfetch = (url, { headers, token, ...mOptions }) => {
  if (token !== null) {
    if (!headers) {
      headers = {};
    }
    headers['Authorization'] = `${token}`;
  }
  const options = { ...mOptions, headers };
  return timeoutPromise(
    Number(timeout),
    new Error(`Timeout ${url}`),
    fetch(url, options)
  );
};

function timeoutPromise(timeout, err, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
}

export default sfetch;
