"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/components/dashboard/quick-stats.tsx":
/*!**************************************************!*\
  !*** ./src/components/dashboard/quick-stats.tsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QuickStats: function() { return /* binding */ QuickStats; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./src/components/ui/card.tsx\");\n/* harmony import */ var _barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=Share2,Target,TrendingUp,Trophy!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/target.js\");\n/* harmony import */ var _barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Share2,Target,TrendingUp,Trophy!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/trophy.js\");\n/* harmony import */ var _barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Share2,Target,TrendingUp,Trophy!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/trending-up.js\");\n/* harmony import */ var _barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Share2,Target,TrendingUp,Trophy!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/share-2.js\");\n/* __next_internal_client_entry_do_not_use__ QuickStats auto */ \n\n\nconst calculateStats = (personalResolutions, sharedResolutions)=>{\n    const allResolutions = [\n        ...personalResolutions,\n        ...sharedResolutions\n    ];\n    return {\n        totalResolutions: allResolutions.length,\n        completedResolutions: allResolutions.filter((r)=>r.status === \"completed\").length,\n        inProgressResolutions: allResolutions.filter((r)=>r.status === \"in_progress\").length,\n        averageProgress: Math.round(allResolutions.reduce((acc, r)=>{\n            var _r_progress;\n            return acc + ((_r_progress = r.progress) !== null && _r_progress !== void 0 ? _r_progress : 0);\n        }, 0) / (allResolutions.length || 1))\n    };\n};\nfunction QuickStats(param) {\n    let { personalResolutions, sharedResolutions } = param;\n    const { totalResolutions, completedResolutions, inProgressResolutions, averageProgress } = calculateStats(personalResolutions, sharedResolutions);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"grid gap-4 md:grid-cols-2 lg:grid-cols-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.Card, {\n                className: \"bg-white/50 dark:bg-zinc-800/50\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {\n                        className: \"flex flex-row items-center justify-between space-y-0 pb-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardTitle, {\n                                className: \"text-sm font-medium text-zinc-900 dark:text-zinc-100\",\n                                children: \"Total Resolutions\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                className: \"h-4 w-4 text-blue-400\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 38,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardContent, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-2xl font-bold text-zinc-900 dark:text-zinc-100\",\n                                children: totalResolutions\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 41,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-xs text-zinc-500 dark:text-zinc-400\",\n                                children: \"Active goals you're working on\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 42,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.Card, {\n                className: \"bg-white/50 dark:bg-zinc-800/50\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {\n                        className: \"flex flex-row items-center justify-between space-y-0 pb-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardTitle, {\n                                className: \"text-sm font-medium text-zinc-900 dark:text-zinc-100\",\n                                children: \"Completed\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                className: \"h-4 w-4 text-green-400\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 49,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardContent, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-2xl font-bold text-zinc-900 dark:text-zinc-100\",\n                                children: completedResolutions\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-xs text-zinc-500 dark:text-zinc-400\",\n                                children: \"Achieved resolutions\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 53,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.Card, {\n                className: \"bg-white/50 dark:bg-zinc-800/50\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {\n                        className: \"flex flex-row items-center justify-between space-y-0 pb-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardTitle, {\n                                className: \"text-sm font-medium text-zinc-900 dark:text-zinc-100\",\n                                children: \"In Progress\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 59,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                className: \"h-4 w-4 text-yellow-400\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 58,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardContent, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-2xl font-bold text-zinc-900 dark:text-zinc-100\",\n                                children: inProgressResolutions\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-xs text-zinc-500 dark:text-zinc-400\",\n                                children: \"Resolutions being worked on\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 64,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.Card, {\n                className: \"bg-white/50 dark:bg-zinc-800/50\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {\n                        className: \"flex flex-row items-center justify-between space-y-0 pb-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardTitle, {\n                                className: \"text-sm font-medium text-zinc-900 dark:text-zinc-100\",\n                                children: \"Shared\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 70,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Share2_Target_TrendingUp_Trophy_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                className: \"h-4 w-4 text-purple-400\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 71,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 69,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_1__.CardContent, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-2xl font-bold text-zinc-900 dark:text-zinc-100\",\n                                children: sharedResolutions.length\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-xs text-zinc-500 dark:text-zinc-400\",\n                                children: \"Collaborating with others\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n                lineNumber: 68,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\dashboard\\\\quick-stats.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, this);\n}\n_c = QuickStats;\nvar _c;\n$RefreshReg$(_c, \"QuickStats\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC9xdWljay1zdGF0cy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFK0U7QUFDZDtBQVFqRSxNQUFNUSxpQkFBaUIsQ0FBQ0MscUJBQW1DQztJQUN6RCxNQUFNQyxpQkFBaUI7V0FBSUY7V0FBd0JDO0tBQWtCO0lBQ3JFLE9BQU87UUFDTEUsa0JBQWtCRCxlQUFlRSxNQUFNO1FBQ3ZDQyxzQkFBc0JILGVBQWVJLE1BQU0sQ0FBQ0MsQ0FBQUEsSUFBS0EsRUFBRUMsTUFBTSxLQUFLLGFBQWFKLE1BQU07UUFDakZLLHVCQUF1QlAsZUFBZUksTUFBTSxDQUFDQyxDQUFBQSxJQUFLQSxFQUFFQyxNQUFNLEtBQUssZUFBZUosTUFBTTtRQUNwRk0saUJBQWlCQyxLQUFLQyxLQUFLLENBQ3pCVixlQUFlVyxNQUFNLENBQUMsQ0FBQ0MsS0FBS1A7Z0JBQWFBO21CQUFQTyxNQUFPUCxDQUFBQSxDQUFBQSxjQUFBQSxFQUFFUSxRQUFRLGNBQVZSLHlCQUFBQSxjQUFjO1FBQUMsR0FBRyxLQUMxREwsQ0FBQUEsZUFBZUUsTUFBTSxJQUFJO0lBRTlCO0FBQ0Y7QUFFTyxTQUFTWSxXQUFXLEtBQTJEO1FBQTNELEVBQUVoQixtQkFBbUIsRUFBRUMsaUJBQWlCLEVBQW1CLEdBQTNEO0lBQ3pCLE1BQU0sRUFDSkUsZ0JBQWdCLEVBQ2hCRSxvQkFBb0IsRUFDcEJJLHFCQUFxQixFQUNyQkMsZUFBZSxFQUNoQixHQUFHWCxlQUFlQyxxQkFBcUJDO0lBRXhDLHFCQUNFLDhEQUFDZ0I7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUMzQixxREFBSUE7Z0JBQUMyQixXQUFVOztrQ0FDZCw4REFBQ3pCLDJEQUFVQTt3QkFBQ3lCLFdBQVU7OzBDQUNwQiw4REFBQ3hCLDBEQUFTQTtnQ0FBQ3dCLFdBQVU7MENBQXVEOzs7Ozs7MENBQzVFLDhEQUFDdEIsMkdBQU1BO2dDQUFDc0IsV0FBVTs7Ozs7Ozs7Ozs7O2tDQUVwQiw4REFBQzFCLDREQUFXQTs7MENBQ1YsOERBQUN5QjtnQ0FBSUMsV0FBVTswQ0FBdURmOzs7Ozs7MENBQ3RFLDhEQUFDZ0I7Z0NBQUVELFdBQVU7MENBQTJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSTVELDhEQUFDM0IscURBQUlBO2dCQUFDMkIsV0FBVTs7a0NBQ2QsOERBQUN6QiwyREFBVUE7d0JBQUN5QixXQUFVOzswQ0FDcEIsOERBQUN4QiwwREFBU0E7Z0NBQUN3QixXQUFVOzBDQUF1RDs7Ozs7OzBDQUM1RSw4REFBQ3ZCLDJHQUFNQTtnQ0FBQ3VCLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FFcEIsOERBQUMxQiw0REFBV0E7OzBDQUNWLDhEQUFDeUI7Z0NBQUlDLFdBQVU7MENBQXVEYjs7Ozs7OzBDQUN0RSw4REFBQ2M7Z0NBQUVELFdBQVU7MENBQTJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSTVELDhEQUFDM0IscURBQUlBO2dCQUFDMkIsV0FBVTs7a0NBQ2QsOERBQUN6QiwyREFBVUE7d0JBQUN5QixXQUFVOzswQ0FDcEIsOERBQUN4QiwwREFBU0E7Z0NBQUN3QixXQUFVOzBDQUF1RDs7Ozs7OzBDQUM1RSw4REFBQ3BCLDJHQUFVQTtnQ0FBQ29CLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FFeEIsOERBQUMxQiw0REFBV0E7OzBDQUNWLDhEQUFDeUI7Z0NBQUlDLFdBQVU7MENBQXVEVDs7Ozs7OzBDQUN0RSw4REFBQ1U7Z0NBQUVELFdBQVU7MENBQTJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSTVELDhEQUFDM0IscURBQUlBO2dCQUFDMkIsV0FBVTs7a0NBQ2QsOERBQUN6QiwyREFBVUE7d0JBQUN5QixXQUFVOzswQ0FDcEIsOERBQUN4QiwwREFBU0E7Z0NBQUN3QixXQUFVOzBDQUF1RDs7Ozs7OzBDQUM1RSw4REFBQ3JCLDJHQUFNQTtnQ0FBQ3FCLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FFcEIsOERBQUMxQiw0REFBV0E7OzBDQUNWLDhEQUFDeUI7Z0NBQUlDLFdBQVU7MENBQXVEakIsa0JBQWtCRyxNQUFNOzs7Ozs7MENBQzlGLDhEQUFDZTtnQ0FBRUQsV0FBVTswQ0FBMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtsRTtLQXZEZ0JGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC9xdWljay1zdGF0cy50c3g/MDcwNCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0IHsgQ2FyZCwgQ2FyZENvbnRlbnQsIENhcmRIZWFkZXIsIENhcmRUaXRsZSB9IGZyb20gJ0AvY29tcG9uZW50cy91aS9jYXJkJ1xuaW1wb3J0IHsgVHJvcGh5LCBUYXJnZXQsIFNoYXJlMiwgVHJlbmRpbmdVcCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCdcbmltcG9ydCB0eXBlIHsgUmVzb2x1dGlvbiB9IGZyb20gJ0AvdHlwZXMvZGF0YWJhc2UudHlwZXMnXG5cbmludGVyZmFjZSBRdWlja1N0YXRzUHJvcHMge1xuICBwZXJzb25hbFJlc29sdXRpb25zOiBSZXNvbHV0aW9uW11cbiAgc2hhcmVkUmVzb2x1dGlvbnM6IFJlc29sdXRpb25bXVxufVxuXG5jb25zdCBjYWxjdWxhdGVTdGF0cyA9IChwZXJzb25hbFJlc29sdXRpb25zOiBSZXNvbHV0aW9uW10sIHNoYXJlZFJlc29sdXRpb25zOiBSZXNvbHV0aW9uW10pID0+IHtcbiAgY29uc3QgYWxsUmVzb2x1dGlvbnMgPSBbLi4ucGVyc29uYWxSZXNvbHV0aW9ucywgLi4uc2hhcmVkUmVzb2x1dGlvbnNdXG4gIHJldHVybiB7XG4gICAgdG90YWxSZXNvbHV0aW9uczogYWxsUmVzb2x1dGlvbnMubGVuZ3RoLFxuICAgIGNvbXBsZXRlZFJlc29sdXRpb25zOiBhbGxSZXNvbHV0aW9ucy5maWx0ZXIociA9PiByLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcpLmxlbmd0aCxcbiAgICBpblByb2dyZXNzUmVzb2x1dGlvbnM6IGFsbFJlc29sdXRpb25zLmZpbHRlcihyID0+IHIuc3RhdHVzID09PSAnaW5fcHJvZ3Jlc3MnKS5sZW5ndGgsXG4gICAgYXZlcmFnZVByb2dyZXNzOiBNYXRoLnJvdW5kKFxuICAgICAgYWxsUmVzb2x1dGlvbnMucmVkdWNlKChhY2MsIHIpID0+IGFjYyArIChyLnByb2dyZXNzID8/IDApLCAwKSAvIFxuICAgICAgKGFsbFJlc29sdXRpb25zLmxlbmd0aCB8fCAxKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUXVpY2tTdGF0cyh7IHBlcnNvbmFsUmVzb2x1dGlvbnMsIHNoYXJlZFJlc29sdXRpb25zIH06IFF1aWNrU3RhdHNQcm9wcykge1xuICBjb25zdCB7XG4gICAgdG90YWxSZXNvbHV0aW9ucyxcbiAgICBjb21wbGV0ZWRSZXNvbHV0aW9ucyxcbiAgICBpblByb2dyZXNzUmVzb2x1dGlvbnMsXG4gICAgYXZlcmFnZVByb2dyZXNzXG4gIH0gPSBjYWxjdWxhdGVTdGF0cyhwZXJzb25hbFJlc29sdXRpb25zLCBzaGFyZWRSZXNvbHV0aW9ucylcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtNCBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNFwiPlxuICAgICAgPENhcmQgY2xhc3NOYW1lPVwiYmctd2hpdGUvNTAgZGFyazpiZy16aW5jLTgwMC81MFwiPlxuICAgICAgICA8Q2FyZEhlYWRlciBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0wIHBiLTJcIj5cbiAgICAgICAgICA8Q2FyZFRpdGxlIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC16aW5jLTkwMCBkYXJrOnRleHQtemluYy0xMDBcIj5Ub3RhbCBSZXNvbHV0aW9uczwvQ2FyZFRpdGxlPlxuICAgICAgICAgIDxUYXJnZXQgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWJsdWUtNDAwXCIgLz5cbiAgICAgICAgPC9DYXJkSGVhZGVyPlxuICAgICAgICA8Q2FyZENvbnRlbnQ+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC16aW5jLTkwMCBkYXJrOnRleHQtemluYy0xMDBcIj57dG90YWxSZXNvbHV0aW9uc308L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtemluYy01MDAgZGFyazp0ZXh0LXppbmMtNDAwXCI+QWN0aXZlIGdvYWxzIHlvdSdyZSB3b3JraW5nIG9uPC9wPlxuICAgICAgICA8L0NhcmRDb250ZW50PlxuICAgICAgPC9DYXJkPlxuXG4gICAgICA8Q2FyZCBjbGFzc05hbWU9XCJiZy13aGl0ZS81MCBkYXJrOmJnLXppbmMtODAwLzUwXCI+XG4gICAgICAgIDxDYXJkSGVhZGVyIGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTAgcGItMlwiPlxuICAgICAgICAgIDxDYXJkVGl0bGUgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXppbmMtOTAwIGRhcms6dGV4dC16aW5jLTEwMFwiPkNvbXBsZXRlZDwvQ2FyZFRpdGxlPlxuICAgICAgICAgIDxUcm9waHkgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWdyZWVuLTQwMFwiIC8+XG4gICAgICAgIDwvQ2FyZEhlYWRlcj5cbiAgICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtemluYy05MDAgZGFyazp0ZXh0LXppbmMtMTAwXCI+e2NvbXBsZXRlZFJlc29sdXRpb25zfTwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTUwMCBkYXJrOnRleHQtemluYy00MDBcIj5BY2hpZXZlZCByZXNvbHV0aW9uczwvcD5cbiAgICAgICAgPC9DYXJkQ29udGVudD5cbiAgICAgIDwvQ2FyZD5cblxuICAgICAgPENhcmQgY2xhc3NOYW1lPVwiYmctd2hpdGUvNTAgZGFyazpiZy16aW5jLTgwMC81MFwiPlxuICAgICAgICA8Q2FyZEhlYWRlciBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0wIHBiLTJcIj5cbiAgICAgICAgICA8Q2FyZFRpdGxlIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC16aW5jLTkwMCBkYXJrOnRleHQtemluYy0xMDBcIj5JbiBQcm9ncmVzczwvQ2FyZFRpdGxlPlxuICAgICAgICAgIDxUcmVuZGluZ1VwIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC15ZWxsb3ctNDAwXCIgLz5cbiAgICAgICAgPC9DYXJkSGVhZGVyPlxuICAgICAgICA8Q2FyZENvbnRlbnQ+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC16aW5jLTkwMCBkYXJrOnRleHQtemluYy0xMDBcIj57aW5Qcm9ncmVzc1Jlc29sdXRpb25zfTwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTUwMCBkYXJrOnRleHQtemluYy00MDBcIj5SZXNvbHV0aW9ucyBiZWluZyB3b3JrZWQgb248L3A+XG4gICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIDxDYXJkIGNsYXNzTmFtZT1cImJnLXdoaXRlLzUwIGRhcms6YmctemluYy04MDAvNTBcIj5cbiAgICAgICAgPENhcmRIZWFkZXIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktMCBwYi0yXCI+XG4gICAgICAgICAgPENhcmRUaXRsZSBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtemluYy05MDAgZGFyazp0ZXh0LXppbmMtMTAwXCI+U2hhcmVkPC9DYXJkVGl0bGU+XG4gICAgICAgICAgPFNoYXJlMiBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgIDwvQ2FyZEhlYWRlcj5cbiAgICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtemluYy05MDAgZGFyazp0ZXh0LXppbmMtMTAwXCI+e3NoYXJlZFJlc29sdXRpb25zLmxlbmd0aH08L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtemluYy01MDAgZGFyazp0ZXh0LXppbmMtNDAwXCI+Q29sbGFib3JhdGluZyB3aXRoIG90aGVyczwvcD5cbiAgICAgICAgPC9DYXJkQ29udGVudD5cbiAgICAgIDwvQ2FyZD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbIkNhcmQiLCJDYXJkQ29udGVudCIsIkNhcmRIZWFkZXIiLCJDYXJkVGl0bGUiLCJUcm9waHkiLCJUYXJnZXQiLCJTaGFyZTIiLCJUcmVuZGluZ1VwIiwiY2FsY3VsYXRlU3RhdHMiLCJwZXJzb25hbFJlc29sdXRpb25zIiwic2hhcmVkUmVzb2x1dGlvbnMiLCJhbGxSZXNvbHV0aW9ucyIsInRvdGFsUmVzb2x1dGlvbnMiLCJsZW5ndGgiLCJjb21wbGV0ZWRSZXNvbHV0aW9ucyIsImZpbHRlciIsInIiLCJzdGF0dXMiLCJpblByb2dyZXNzUmVzb2x1dGlvbnMiLCJhdmVyYWdlUHJvZ3Jlc3MiLCJNYXRoIiwicm91bmQiLCJyZWR1Y2UiLCJhY2MiLCJwcm9ncmVzcyIsIlF1aWNrU3RhdHMiLCJkaXYiLCJjbGFzc05hbWUiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/dashboard/quick-stats.tsx\n"));

/***/ })

});