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

/***/ "(app-pages-browser)/./src/components/user-menu.tsx":
/*!**************************************!*\
  !*** ./src/components/user-menu.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserMenu: function() { return /* binding */ UserMenu; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_LogOut_User_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=LogOut,User!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/user.js\");\n/* harmony import */ var _barrel_optimize_names_LogOut_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=LogOut,User!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/log-out.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/avatar */ \"(app-pages-browser)/./src/components/ui/avatar.tsx\");\n/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/dropdown-menu */ \"(app-pages-browser)/./src/components/ui/dropdown-menu.tsx\");\n/* harmony import */ var _lib_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/auth-service */ \"(app-pages-browser)/./src/lib/auth-service.ts\");\n/* __next_internal_client_entry_do_not_use__ UserMenu auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction UserMenu() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const handleLogout = async ()=>{\n        await (0,_lib_auth_service__WEBPACK_IMPORTED_MODULE_4__.signOut)();\n        router.push(\"/\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__.DropdownMenu, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__.DropdownMenuTrigger, {\n                className: \"focus:outline-none\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_avatar__WEBPACK_IMPORTED_MODULE_2__.Avatar, {\n                    className: \"h-8 w-8\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_avatar__WEBPACK_IMPORTED_MODULE_2__.AvatarFallback, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LogOut_User_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                            className: \"h-4 w-4\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                            lineNumber: 27,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__.DropdownMenuContent, {\n                align: \"end\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__.DropdownMenuItem, {\n                    className: \"cursor-pointer\",\n                    onClick: handleLogout,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LogOut_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                            className: \"mr-2 h-4 w-4\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            children: \"Log out\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                            lineNumber: 34,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\krish\\\\CascadeProjects\\\\resolution-achiever\\\\src\\\\components\\\\user-menu.tsx\",\n        lineNumber: 23,\n        columnNumber: 5\n    }, this);\n}\n_s(UserMenu, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = UserMenu;\nvar _c;\n$RefreshReg$(_c, \"UserMenu\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3VzZXItbWVudS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFMkM7QUFDQTtBQUNvQjtBQU16QjtBQUNNO0FBRXJDLFNBQVNVOztJQUNkLE1BQU1DLFNBQVNULDBEQUFTQTtJQUV4QixNQUFNVSxlQUFlO1FBQ25CLE1BQU1ILDBEQUFPQTtRQUNiRSxPQUFPRSxJQUFJLENBQUM7SUFDZDtJQUVBLHFCQUNFLDhEQUFDUixzRUFBWUE7OzBCQUNYLDhEQUFDRyw2RUFBbUJBO2dCQUFDTSxXQUFVOzBCQUM3Qiw0RUFBQ1gseURBQU1BO29CQUFDVyxXQUFVOzhCQUNoQiw0RUFBQ1YsaUVBQWNBO2tDQUNiLDRFQUFDSCx1RkFBSUE7NEJBQUNhLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFJdEIsOERBQUNSLDZFQUFtQkE7Z0JBQUNTLE9BQU07MEJBQ3pCLDRFQUFDUiwwRUFBZ0JBO29CQUFDTyxXQUFVO29CQUFpQkUsU0FBU0o7O3NDQUNwRCw4REFBQ1osdUZBQU1BOzRCQUFDYyxXQUFVOzs7Ozs7c0NBQ2xCLDhEQUFDRztzQ0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLaEI7R0F6QmdCUDs7UUFDQ1Isc0RBQVNBOzs7S0FEVlEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvdXNlci1tZW51LnRzeD9lOWIzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5cbmltcG9ydCB7IExvZ091dCwgVXNlciB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIlxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiXG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhckZhbGxiYWNrIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9hdmF0YXJcIlxuaW1wb3J0IHtcbiAgRHJvcGRvd25NZW51LFxuICBEcm9wZG93bk1lbnVDb250ZW50LFxuICBEcm9wZG93bk1lbnVJdGVtLFxuICBEcm9wZG93bk1lbnVUcmlnZ2VyLFxufSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2Ryb3Bkb3duLW1lbnVcIlxuaW1wb3J0IHsgc2lnbk91dCB9IGZyb20gXCJAL2xpYi9hdXRoLXNlcnZpY2VcIlxuXG5leHBvcnQgZnVuY3Rpb24gVXNlck1lbnUoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHNpZ25PdXQoKVxuICAgIHJvdXRlci5wdXNoKFwiL1wiKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8RHJvcGRvd25NZW51PlxuICAgICAgPERyb3Bkb3duTWVudVRyaWdnZXIgY2xhc3NOYW1lPVwiZm9jdXM6b3V0bGluZS1ub25lXCI+XG4gICAgICAgIDxBdmF0YXIgY2xhc3NOYW1lPVwiaC04IHctOFwiPlxuICAgICAgICAgIDxBdmF0YXJGYWxsYmFjaz5cbiAgICAgICAgICAgIDxVc2VyIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgIDwvQXZhdGFyRmFsbGJhY2s+XG4gICAgICAgIDwvQXZhdGFyPlxuICAgICAgPC9Ecm9wZG93bk1lbnVUcmlnZ2VyPlxuICAgICAgPERyb3Bkb3duTWVudUNvbnRlbnQgYWxpZ249XCJlbmRcIj5cbiAgICAgICAgPERyb3Bkb3duTWVudUl0ZW0gY2xhc3NOYW1lPVwiY3Vyc29yLXBvaW50ZXJcIiBvbkNsaWNrPXtoYW5kbGVMb2dvdXR9PlxuICAgICAgICAgIDxMb2dPdXQgY2xhc3NOYW1lPVwibXItMiBoLTQgdy00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5Mb2cgb3V0PC9zcGFuPlxuICAgICAgICA8L0Ryb3Bkb3duTWVudUl0ZW0+XG4gICAgICA8L0Ryb3Bkb3duTWVudUNvbnRlbnQ+XG4gICAgPC9Ecm9wZG93bk1lbnU+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJMb2dPdXQiLCJVc2VyIiwidXNlUm91dGVyIiwiQXZhdGFyIiwiQXZhdGFyRmFsbGJhY2siLCJEcm9wZG93bk1lbnUiLCJEcm9wZG93bk1lbnVDb250ZW50IiwiRHJvcGRvd25NZW51SXRlbSIsIkRyb3Bkb3duTWVudVRyaWdnZXIiLCJzaWduT3V0IiwiVXNlck1lbnUiLCJyb3V0ZXIiLCJoYW5kbGVMb2dvdXQiLCJwdXNoIiwiY2xhc3NOYW1lIiwiYWxpZ24iLCJvbkNsaWNrIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/user-menu.tsx\n"));

/***/ })

});