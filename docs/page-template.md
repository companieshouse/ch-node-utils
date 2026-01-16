# Page template layout

Use this template to keep your pages consistent with the rest of Companies House.

This page template combines the boilerplate markup and components needed for a basic Companies House page. It includes:

- the favicon, and other related theme icons
- the Skip link component, Header component and Footer component
- GOV.UK Frontend CSS and JavaScript for all GOV.UK Design System components

![Screenshot of the Page Template Layout](./page-template-screenshot.png)

## Getting started

1. Install the package using npm
```bash
npm install @companieshouse/ch-node-utils
```
2. Register package directory as Nunjucks view
```javascript
app.set("views", [
    "/views",
    "node_modules/govuk-frontend/dist",
    "node_modules/@companieshouse"
]);
```
3. Set the `cdnHost` and `govukFrontendVersion` global variables
```javascript
import { getGOVUKFrontendVersion } from "@companieshouse/ch-node-utils";

njk.addGlobal("cdnHost", "https://example.cloudfront.net");
njk.addGlobal("govukFrontendVersion", getGOVUKFrontendVersion());
njk.addGlobal("govukRebrand", true);
```
4. Extend the template in your top level layout and [set blocks](#setting-blocks) to display content.

```nunjucks
{# Extends the Companies House Page Template: https://github.com/companieshouse/ch-node-utils/blob/main/docs/page-template.md #}
{% extends "ch-node-utils/templates/layouts/template.njk" %}

{% from "govuk/components/service-navigation/macro.njk" import govukServiceNavigation %}
{% from "govuk/components/footer/macro.njk" import govukFooter %}

{% block header %}
  {{ super() }}
  {{ govukServiceNavigation({
    serviceName: "Find and update company information",
    serviceUrl: "#"
  }) }}
{% endblock %}

{% block content %}
  <h1 class="govuk-heading-l">Page template</h1>
{% endblock %}

{% block footer %}
  {{ govukFooter({
    meta: {
      items: [
        {
          href: "#",
          text: "Help"
        },
        {
          href: "#",
          text: "Cookies"
        },
        {
          href: "#",
          text: "Contact"
        },
        {
          href: "#",
          text: "Terms and conditions"
        },
        {
          href: "#",
          text: "Rhestr o Wasanaethau Cymraeg",
          attributes: {
            lang: "cy",
            hreflang: "cy"
          }
        }
      ],
      html: 'Built by <a href="https://www.gov.uk/government/organisations/companies-house" class="govuk-footer__link">Companies House</a>'
    }
  }) }}
{% endblock %}
```

## Options

| Option name | Option type | Description |
| - | - | - |
| cdnHost | Variable | root domain for the [CDN host](https://github.com/companieshouse/cdn.ch.gov.uk) |
| govukFrontendVersion | Variable | version of GOV.UK Frontend to use, recommend to set this with the [`getGOVUKFrontendVersion` helper](#getGOVUKFrontendVersion) |
| govukRebrand | Variable | Enables the new GOV.UK Rebranding, this variable is from the [GOV.UK Frontend Page Template](https://design-system.service.gov.uk/styles/page-template/#options) |
| nonce | Variable | Allows setting a [`nonce` value for use with a Content Security Policy (CSP)](https://content-security-policy.com/examples/allow-inline-script/) |

## Setting blocks

The Companies House page template extends the [GOV.UK Design System page template](https://design-system.service.gov.uk/styles/page-template/#options) so all the [options from that page template can be used.](https://design-system.service.gov.uk/styles/page-template/#options)

Companies House Page Template extends the `head`, `headIcons` and `bodyEnd` blocks.

If you want to extend the `head`, `headIcons` or `bodyEnd` blocks you must call `{{ super() }}` to include the extended block contents, for example:

```handlebars
{% block head %}
   {{ super() }}
   <link rel="stylesheets" href="https://example.cloudfront.net/stylesheets/application.css">
{% endblock %}
```
## Helpers
### getGOVUKFrontendVersion

Returns the version of GOV.UK Frontend installed by the application, if it is not pinned it'll throw an error to ensure consistencey between the package.json and CDN versions.

```javascript
import { getGOVUKFrontendVersion } from "@companieshouse/ch-node-utils";
console.log(getGOVUKFrontendVersion()); // e.g. returns 5.9.0
```
