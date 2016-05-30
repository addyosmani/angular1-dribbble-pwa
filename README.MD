# Dribbble PWA

This is an Angular 1 [Dribbble](https://dribbble.com) Progressive Web App, initially based on [this](https://github.com/caioadz/dribbble-app) implementation. [Live Demo](https://cherry-app.appspot.com)

Changes made:

* Added support for Service Worker and app-shell caching using `sw-precache`
* Added runtime caching of Dribbble API assets using `sw-toolbox`
* Added critical-path CSS optimisation (I didn't use `loadCSS` this time as a number of browsers now no longer block body styles)
* Refactored out Bootstrap.css using `uncss` and manual trimming
* Switched to `async` loading the Angular/application bundle
* Added in 'Cherry' theming. [Icon credit](https://www.iconfinder.com/icons/51202/cherry_pink_icon#size=512)
* Some general clean-up of the app

Looking at [WebPageTest](http://www.webpagetest.org/video/compare.php?tests=160530_4X_ZH7,160530_WP_ZHA), on cable the original implementation reached visual completeness in 28s. Compare this to the 8.5s we reach with the above optimisations. Read below for notes on why, whilst this is an improvement, it's nowhere near where we should be hitting on mobile (ideally visually complete in 1s on cable, 3s on 3G).

## Notes from my Google I/O talk

Progressive Web App features can technically be added to a legacy application built using something like Angular 1. By that I mean that you can cache resources and your shell offline using Service Worker and can get some mileague by applying general web performance optimisations. This will make your perceived load time and repeat visit times better than the average Angular 1 app.

Unfortunately, looking at the data ([3G on WebPageTest](http://www.webpagetest.org/result/160530_PP_YXY/)) **the important thing this setup will always lack is reliable performance**, a critical part of what makes PWAs so good. Service Worker will slash your repeat load times for static and dynamic assets, but that's about it. It won't improve your Angular 1 bootup times and how slow your application may otherwise be on a phone.

As the majority of legacy frameworks weren't built with mobile and slower handsets in mind, an Angular 1 PWA is never going to be as fast as something built using a more modern framework (see the direction Angular 2 is taking with Angular Mobile Toolkit) or simply just using server-side rendering and vanilla JavaScript.

For those that can't yet update to a newer framework/stack, I hope some of the ideas here prove useful.

## Setup

Clone the repository then `cd` into the project and:

```
$ npm install
$ npm run build
$ npm run start
```