const fetch = async (url, options = {}) => {
  options.method = options.method || "GET";
  options.headers = options.headers || {};
  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
  }
  const res = await window.fetch(url, options);
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    res.data = data;
  }
  if (res.status >= 400) throw res;
  return res;
};

export { fetch };
