/*
Copyright (c) 2013, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

'use strict';

module.exports = function (brand, module, fn) {
    return function extendExpress(app) {
        // Check if the specified Express `app` already has the `brand`. This
        // prevents the app from being extended by the same Express extension
        // more than once.
        if (!app[brand]) {
            // Call into the Express extension's init function which will
            // augment the Express `app`.
            fn(app);

            // Brand the `app` with the Express extension `module`. The `brand`
            // property is non-configuration, non-writable, and non-enumerable.
            Object.defineProperty(app, brand, {value: module});
        }

        return app;
    };
};
