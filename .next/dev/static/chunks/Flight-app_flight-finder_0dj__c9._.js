(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Flight-app/flight-finder/src/components/Select/Select.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "chevron": "Select-module__eEfiAa__chevron",
  "chevron--open": "Select-module__eEfiAa__chevron--open",
  "dropdown": "Select-module__eEfiAa__dropdown",
  "label": "Select-module__eEfiAa__label",
  "option": "Select-module__eEfiAa__option",
  "option--disabled": "Select-module__eEfiAa__option--disabled",
  "option--selected": "Select-module__eEfiAa__option--selected",
  "root": "Select-module__eEfiAa__root",
  "root--disabled": "Select-module__eEfiAa__root--disabled",
  "trigger": "Select-module__eEfiAa__trigger",
  "trigger--open": "Select-module__eEfiAa__trigger--open",
  "triggerText": "Select-module__eEfiAa__triggerText",
  "triggerText--placeholder": "Select-module__eEfiAa__triggerText--placeholder",
});
}),
"[project]/Flight-app/flight-finder/src/components/Select/Select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/components/Select/Select.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Select = ({ label, value: controlledValue, defaultValue, options, onChange, placeholder = 'Select...', disabled = false, className, id })=>{
    _s();
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const selectId = id ?? generatedId;
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [internalValue, setInternalValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue ?? '');
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((o)=>o.value === currentValue);
    const handleSelect = (option)=>{
        if (option.disabled) return;
        if (!isControlled) setInternalValue(option.value);
        onChange?.(option.value);
        setIsOpen(false);
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Escape') setIsOpen(false);
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev)=>!prev);
        }
    };
    // Close on outside click
    __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Select.useEffect": ()=>{
            const handleClickOutside = {
                "Select.useEffect.handleClickOutside": (e)=>{
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        setIsOpen(false);
                    }
                }
            }["Select.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "Select.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["Select.useEffect"];
        }
    }["Select.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].root} ${disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['root--disabled'] : ''} ${className ?? ''}`,
        ref: containerRef,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: selectId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                children: label
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: selectId,
                role: "combobox",
                "aria-expanded": isOpen,
                "aria-haspopup": "listbox",
                tabIndex: disabled ? -1 : 0,
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trigger} ${isOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['trigger--open'] : ''}`,
                onClick: ()=>!disabled && setIsOpen((prev)=>!prev),
                onKeyDown: handleKeyDown,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].triggerText} ${!selectedOption ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['triggerText--placeholder'] : ''}`,
                        children: selectedOption ? selectedOption.label : placeholder
                    }, void 0, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevron} ${isOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['chevron--open'] : ''}`,
                        width: "11",
                        height: "7",
                        viewBox: "0 0 11 7",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M1 1L5.5 6L10 1",
                            stroke: "#6b7280",
                            strokeWidth: "1",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                role: "listbox",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dropdown,
                "aria-label": label,
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        role: "option",
                        "aria-selected": option.value === currentValue,
                        "aria-disabled": option.disabled,
                        className: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].option,
                            option.value === currentValue ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['option--selected'] : '',
                            option.disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$Select$2f$Select$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['option--disabled'] : ''
                        ].filter(Boolean).join(' '),
                        onClick: ()=>handleSelect(option),
                        children: option.label
                    }, option.value, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Flight-app/flight-finder/src/components/Select/Select.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Select, "2WI1ZWgGrsndzPTg4Grj8Xd9uds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = Select;
const __TURBOPACK__default__export__ = Select;
var _c;
__turbopack_context__.k.register(_c, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cancelBtn": "DatePicker-module__xqpyBa__cancelBtn",
  "dateDisplay": "DatePicker-module__xqpyBa__dateDisplay",
  "dateDisplayInput": "DatePicker-module__xqpyBa__dateDisplayInput",
  "dateDisplayLabel": "DatePicker-module__xqpyBa__dateDisplayLabel",
  "dayCell": "DatePicker-module__xqpyBa__dayCell",
  "dayCell--disabled": "DatePicker-module__xqpyBa__dayCell--disabled",
  "dayCell--selected": "DatePicker-module__xqpyBa__dayCell--selected",
  "dayCell--today": "DatePicker-module__xqpyBa__dayCell--today",
  "dayHeader": "DatePicker-module__xqpyBa__dayHeader",
  "doneBtn": "DatePicker-module__xqpyBa__doneBtn",
  "emptyCell": "DatePicker-module__xqpyBa__emptyCell",
  "footer": "DatePicker-module__xqpyBa__footer",
  "grid": "DatePicker-module__xqpyBa__grid",
  "header": "DatePicker-module__xqpyBa__header",
  "monthLabel": "DatePicker-module__xqpyBa__monthLabel",
  "navBtn": "DatePicker-module__xqpyBa__navBtn",
  "navButtons": "DatePicker-module__xqpyBa__navButtons",
  "root": "DatePicker-module__xqpyBa__root",
  "todayMark": "DatePicker-module__xqpyBa__todayMark",
});
}),
"[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DatePicker",
    ()=>DatePicker,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const DAYS = [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
];
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
const DatePicker = ({ value: controlledValue, defaultValue = null, onConfirm, onCancel, minDate, maxDate, className })=>{
    _s();
    const today = new Date();
    const isControlled = controlledValue !== undefined;
    const [internalDate, setInternalDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue);
    const selectedDate = isControlled ? controlledValue : internalDate;
    // View state — which month/year the calendar is showing
    const [viewYear, setViewYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(selectedDate?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(selectedDate?.getMonth() ?? today.getMonth());
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const handleDayClick = (day)=>{
        const clicked = new Date(viewYear, viewMonth, day);
        if (minDate && clicked < minDate) return;
        if (maxDate && clicked > maxDate) return;
        if (!isControlled) setInternalDate(clicked);
    };
    const prevMonth = ()=>{
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y)=>y - 1);
        } else setViewMonth((m)=>m - 1);
    };
    const nextMonth = ()=>{
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y)=>y + 1);
        } else setViewMonth((m)=>m + 1);
    };
    const isSelected = (day)=>selectedDate?.getFullYear() === viewYear && selectedDate?.getMonth() === viewMonth && selectedDate?.getDate() === day;
    const isToday = (day)=>today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
    const isDisabled = (day)=>{
        const d = new Date(viewYear, viewMonth, day);
        if (minDate && d < minDate) return true;
        if (maxDate && d > maxDate) return true;
        return false;
    };
    // Build calendar grid cells
    const cells = [
        ...Array(firstDay).fill(null),
        ...Array.from({
            length: daysInMonth
        }, (_, i)=>i + 1)
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].root} ${className ?? ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].monthLabel,
                        children: [
                            MONTHS[viewMonth],
                            " ",
                            viewYear
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButtons,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: prevMonth,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navBtn,
                                "aria-label": "Previous month",
                                type: "button",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "6",
                                    height: "11",
                                    viewBox: "0 0 6 11",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 1L1 5.5L5 10",
                                        stroke: "currentColor",
                                        strokeWidth: "1",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: nextMonth,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navBtn,
                                "aria-label": "Next month",
                                type: "button",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "6",
                                    height: "11",
                                    viewBox: "0 0 6 11",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M1 1L5 5.5L1 10",
                                        stroke: "currentColor",
                                        strokeWidth: "1",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                children: [
                    DAYS.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayHeader,
                            children: d
                        }, `header-${i}`, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    cells.map((day, i)=>day === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCell
                        }, `empty-${i}`, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleDayClick(day),
                            disabled: isDisabled(day),
                            "aria-label": `${MONTHS[viewMonth]} ${day}, ${viewYear}`,
                            "aria-pressed": isSelected(day),
                            className: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayCell,
                                isSelected(day) ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dayCell--selected'] : '',
                                isToday(day) && !isSelected(day) ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dayCell--today'] : '',
                                isDisabled(day) ? __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dayCell--disabled'] : ''
                            ].filter(Boolean).join(' '),
                            children: isToday(day) && !isSelected(day) ? /* Today indicator — small cross mark per Figma */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].todayMark,
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "10",
                                    height: "9",
                                    viewBox: "0 0 10 9",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M1 4.5H9M5 0.5V8.5",
                                        stroke: "currentColor",
                                        strokeWidth: "1",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                        lineNumber: 192,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                    lineNumber: 191,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                lineNumber: 190,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : day
                        }, `day-${day}`, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].doneBtn,
                        onClick: ()=>selectedDate && onConfirm?.(selectedDate),
                        children: "DONE"
                    }, void 0, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cancelBtn,
                        onClick: onCancel,
                        children: "CANCEL"
                    }, void 0, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dateDisplay,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dateDisplayLabel,
                        children: "SELECTED DATE"
                    }, void 0, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$components$2f$DatePicker$2f$DatePicker$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dateDisplayInput,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: formatDate(selectedDate)
                            }, void 0, false, {
                                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "10",
                                height: "11",
                                viewBox: "0 0 10 11",
                                fill: "none",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "0.5",
                                        y: "1.5",
                                        width: "9",
                                        height: "9",
                                        rx: "0",
                                        stroke: "currentColor",
                                        strokeWidth: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 0.5V2.5M7 0.5V2.5",
                                        stroke: "currentColor",
                                        strokeWidth: "1",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Flight-app/flight-finder/src/components/DatePicker/DatePicker.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DatePicker, "u3vsuFeucLoXzBNeNb2TmGYPn54=");
_c = DatePicker;
const __TURBOPACK__default__export__ = DatePicker;
var _c;
__turbopack_context__.k.register(_c, "DatePicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Flight-app/flight-finder/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Flight-app_flight-finder_0dj__c9._.js.map