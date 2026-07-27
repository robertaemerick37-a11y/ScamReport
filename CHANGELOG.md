# Changelog

All notable changes to the Caldermont platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Performance optimization for media assets.
- Analytics integration.

### Fixed
- Adjusted mobile padding on the contact form section.
---

## [1.1.0] - 2026-07-27

### Added
- Created `vercel.json` to enforce strict HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Implemented script defense guards for EmailJS against ad-blocker or CDN failure scenarios.
- Integrated string input trimming on form submission to prevent blank field processing.

### Security
- Verified Namecheap registrar lock and DNS settings.
- Standardized EmailJS client-side honeypot protection and rate-limiting configurations.

---

## [1.0.0] - 2026-07-20

### Added
- Initial deployment on Vercel with custom domain configuration (`caldermont.org`).
- Responsive multi-page layout with custom CSS and dynamic UI elements.
- Interactive FAQ accordion functionality in vanilla JavaScript.
- Dynamic counter animations for site metrics.
- Automated testimonial slider carousel with autoplay and navigation controls.
- Contact form integration powered by EmailJS.