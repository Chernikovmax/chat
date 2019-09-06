export function setCookie(name, value) {
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  document.cookie = updatedCookie;
}

// Usage example:
// setCookie("user", "John", { secure: true, "max-age": 3600 });

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1
  });
}
