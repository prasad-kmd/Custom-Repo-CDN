if (typeof Lazy !== "function") {
    /*! Lazy Function | uses HTML5 localStorage */
    (function(e) {
      var t = [];
  
      function n(e) { "function" == typeof e && (n.lazied || t.executed ? e.call(window, { type: "LOCAL_STORAGE" }) : t.push(e)) }
  
      function o() { 0 == document.documentElement.scrollTop && 0 == document.body.scrollTop || (t.execute({ type: "SCROLL" }), window.removeEventListener("scroll", o)) }
  
      function c() { t.execute({ type: "CLICK" }), document.body.removeEventListener("click", c) }
  
      function d() { n.lazied || t.executed || (document.body.addEventListener("click", c), window.addEventListener("scroll", o), o()), document.removeEventListener("DOMContentLoaded", d) } t.executed = !1, n.lazied = localStorage.getItem(e.key) === e.value, t.execute = function() { if (!1 === this.executed) { this.executed = !0, n.lazied = !0, localStorage.getItem(e.key) !== e.value && localStorage.setItem(e.key, e.value); for (let e = 0; e < this.length; e++) "function" == typeof this[e] && this[e].apply(window, arguments), this.splice(e, 1), e-- } }, "complete" === document.readyState || "loading" !== document.readyState || null !== document.body ? d() : document.addEventListener("DOMContentLoaded", d), this[e.name] = n
    }).call(typeof globalThis !== "undefined" ? globalThis : window, { name: "Lazy", key: "LOCAL_LAZY", value: "true" });
  }
  
  (function(app) {
    /**
     * Return from function
     * if serviceWorker is not available 
     */
    if (!("serviceWorker" in navigator)) {
      return;
    }
  
    /**
     * Helper function to group logs
     */
    const groupLog = (title, logs) => {
      if (app.consoleLogs === true) {
        console.groupCollapsed.apply(console, Array.isArray(title) ? title : [title]);
        logs.forEach(log => console.log.apply(console, Array.isArray(log) ? log : [log]));
        console.groupEnd();
      }
    }
  
    /**
     * Register Workbox Service Worker
     */
    navigator.serviceWorker
      .register("https://raw.githubusercontent.com/prasad-kmd/Custom-Repo-CDN/main/tmp/sw.js", {
        scope: "/",
      })
      .then((registration) => {
        const logs = [];
        if (registration.scope) {
          logs.push(["Scope: " + registration.scope]);
        }
        if (registration.active && registration.active.scriptURL) {
          logs.push(["Script: " + registration.active.scriptURL]);
        }
        logs.push(
          ["Build by: Universal Blogs"],
          ["Developer site: https://the-universal-store.blogspot.com/"]
        );
  
        groupLog(
          [
            "%cService Worker: Registered Successfully",
            "color: green"
          ],
          logs
        );
      })
      .catch((error) => {
        groupLog(
          [
            "%cService Worker: Registeration Failed",
            "color: red"
          ],
          ["Error:", error]
        );
      })
    });