# ch-node-utils

set of node utils which can be used across repos/projects.
Available as a normal npm depndency([here on npmjs](https://www.npmjs.com/package/@companieshouse/ch-node-utils))

Areas for the different utilities stored in this repo:

## i18n (Internationalisation)

  Internationalisation has been added to CHS, after already being available (at least for Welsh) on legacy systems (EWF/SCRS/CHD/...)

  The implementation is described in [Confluence](https://companieshouse.atlassian.net/wiki/spaces/OLI/pages/4235231301/Implementing+Internationalisation+on+CH+web+services) for both Java and Node.js services.

  Some common utilities for Node.js are here provided. The chosen Node.js i18n library is [i18next](https://www.i18next.com/), which, at the time of writing, can be considered the standard:

  ![Node.js i18n libs](https://github.com/companieshouse/ch-node-utils/blob/81a066b38086e7040a089882bd5e750a11393c2a/images/Node.js__i18n.libraries.png)

  ![Node.js i18n libs trend](https://github.com/companieshouse/ch-node-utils/blob/81a066b38086e7040a089882bd5e750a11393c2a/images/Node.js__i18n.libraries.trend.png)

   - `i18nCh.ts`: wrapper to [i18next](https://www.i18next.com/)

   - `languageNames.ts`: to manage Language names and their associated ISO codes (iso-639). It mainly provides:
      - a function to get, from an array of submitted iso-codes,  a structured array of iso-codes & native names.

     Ex:
     ```
     [... "en", "cy", ...]   ==> [ ... {"IsoCode": "en", "Name": "English" },  {"IsoCode": "cy", "Name": "Cymraeg" } ...]
     ```
      - a custom function to sort the supported locales (apart from leaving 'en' always at 1st position, it sorts alphabetically)

   - `subDirs.ts`: to manage files and dirs, so that i18n locales' folders can be sourced automatically.
      This allows for example to have an array of iso-codes if the `./locales` dir follows the normal convention.
      Ex, this array of iso-codes `[ "ar", "bn", "cy", "de", "en", "gd", "ja", "uk"]` is retrieved from the following tree:
      ```
         │   ├── locales
         │   │   ├── ar
         │   │   │   ├── errors.json
         │   │   │   ├── global.json
         │   │   │   ├── landing.json
         │   │   │   ├── layout.json
         │   │   │   ├── search-company.json
         │   │   │   ├── view-company-information.json
         │   │   │   └── who-to-tell.json
         │   │   ├── bn
         │   │   │   └── *.json
         │   │   ├── cy
         │   │   │   └── *.json
         │   │   ├── de
         │   │   │   └── *.json
         │   │   ├── en
         │   │   │   └── *.json
         │   │   ├── gd
         │   │   │   └── *.json
         │   │   ├── ja
         │   │   │   └── *.json
         │   │   ├── uk
         │   │   │   └── *.json
      ```

   - `manageLocales.middleware.ts`: middleware that can be reused to manage locales while dealing with http requests.

   - `add-lang-to-url.njk`: to add the `lang=xx` query param to urls:
   ```
   https://.....<self>....../?lang=cy
   ```

   ![Auto add lang=xx](https://github.com/companieshouse/ch-node-utils/blob/81a066b38086e7040a089882bd5e750a11393c2a/images/Node.js__i18n.add.lang.png)

   - `locales-banner.njk`: to add the locales banner

   ![locales banner](https://github.com/companieshouse/ch-node-utils/blob/81a066b38086e7040a089882bd5e750a11393c2a/images/Node.js__i18n.locales.banner.png)

   - `ENV VARS`: the following ENV vars are used:

| ENV VAR | Description |
| ------- | ----------- |
|`CH_NODE_UTILS_DROP_LANG_QUERY_PARAM`| It could be set to [drop the lang="xx" query param](https://github.com/companieshouse/ch-node-utils/blob/f9e5c47a86206f0b12e4e536c4c459db16747631/src/middleware/manageLocales.middleware.ts#L25) from the current URL ([see Example](https://github.com/companieshouse/docker-chs-development/blob/842c61245adcbba02a6316847fc4f9d94c52410d/services/modules/dissolution/dissolution-web.docker-compose.yaml#L50)) |
|`CH_NODE_UTILS_LOG_LVL`| It could be set to ["TRACE" or "DEBUG" (case insensitive)](https://github.com/companieshouse/ch-node-utils/blob/24bc717477d21082439d1b460108cb0d60465f0f/src/utils/log.ts#L2) to dump internal info while inside ch-node-utils ([see Example](https://github.com/companieshouse/docker-chs-development/blob/842c61245adcbba02a6316847fc4f9d94c52410d/services/modules/dissolution/dissolution-web.docker-compose.yaml#L49))|
