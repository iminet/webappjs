# Iminet Core WebApp

A lightweight JavaScript foundation for building reusable web
applications.

The framework provides a common application base with:

-   Configurable application bootstrap
-   Abstract base class for inheritance
-   Built-in HTTP/AJAX helper
-   Centralized configuration
-   Simple initialization lifecycle
-   Designed for reuse across multiple projects

> **Note** This project is under active development and the API may
> evolve over time.

------------------------------------------------------------------------

# Quick Start

## 1. Load the framework

``` html
<head>

<script>
window.__APP_CONFIG__ = {
    version: "1.0.0",
    base_url: "/",
    debug: true
};
</script>

<script defer src="https://github.com/iminet/webappjs/releases/latest/download/IminetcoreWebApp.js"></script>
<script defer src="/js/MyWebApp.js"></script>

</head>
```

------------------------------------------------------------------------

## 2. Create your application

``` javascript
class MyWebApp extends AppBase {

    constructor(config) {
        super(config);
    }

    bindUI() {
        console.log("Binding UI...");
    }
}

window.App = new MyWebApp(window.__APP_CONFIG__ ?? {});

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
```

------------------------------------------------------------------------

## Configuration

The framework accepts a configuration object during initialization.

Example:

``` javascript
window.__APP_CONFIG__ = {
    version: "1.0.0",
    base_url: "/",
    debug: true,
    token: "your-app-token",
    xsrf: "your-xsrf-token"
};
```

------------------------------------------------------------------------

## Goals

-   Keep project-specific code separated from the framework
-   Reuse the same core across multiple web applications
-   Provide a simple inheritance model
-   Make common functionality available from a single place

------------------------------------------------------------------------

## License

Choose the license that best fits your project (MIT is recommended for
open-source projects).
