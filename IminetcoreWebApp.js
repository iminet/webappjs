class AppBase {
    constructor(config = {}) {
        if (new.target === AppBase) {
            throw new Error("AppBase abstract class");
        }

        this.config = config;

        this.appname = config.appname ?? "WebApp";
        this.version = config.version ?? "1.0.2";
        this.location = window.location;
        this.debug = config.debug === true;
        this.Json = "";

        this.token = config.token ?? document.querySelector('meta[name="app-token"]')?.content ?? "";
        this.xsrf = config.xsrf ?? document.querySelector('meta[name="xsrf-token"]')?.content ?? "";
        this.base_url = config.base_url ?? (
            location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/"
        );

        // kompatibilitás a régi App.ui.bindUI() és App.ajax.getJSON() hívásokkal
        this.ui = {
            bindUI: () => this.bindUI()
        };

        this.ajax = {
            getJSON: (url, method = "GET") => this.getJSON(url, method),
            upload: (url, file, fieldName = "file") => this.upload(url, file, fieldName)
        };
    }

    init() {
        //console.log("App initialized");
        //console.log("Base URL: " + this.base_url);
        console.log(`App "${this.appname}" initialized`);
        console.log(`Base URL: ${this.base_url}`);
        this.ui.bindUI();
    }

    debug(...args) {
        if (this.debug !== true) {
            return;
        }

        console.log(`[${this.appname}]`, ...args);
    }

    bindUI() {
        // abstract / override
    }

    async getJSON(url, method = "GET") {
        console.log(`AJAX ${method.toUpperCase()}: ${this.base_url}${url}`);

        try {
            const response = await fetch(this.base_url + url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-App-Token": this.token,
                    "XSRF-TOKEN": this.xsrf,
                    "X-App-Host": this.base_url
                },
                method: method ?? "GET"
            });

            return await response.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async upload(url, file, fieldName = "file") {
        const formData = new FormData();
        formData.append(fieldName, file);

        const response = await fetch(this.base_url + url, {
            method: "POST",
            headers: {
                "XSRF-TOKEN": this.xsrf,
                "X-App-Token": this.token,
                "X-App-Host": this.base_url
            },
            body: formData
        });

        return await response.json();
    }
}