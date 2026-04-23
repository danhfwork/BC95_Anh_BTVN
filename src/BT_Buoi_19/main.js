// Khai báo cơ bản
import { renderDanhSachNV, handleAdd, bindCURDEvents } from "./js/staff-flow.js";
import { el } from "./js/core.js";
import { bindPopupEvents, initSidebar, modalPopup } from "./js/popup-flow.js";
import { bindFilterEvent } from "./js/filter-flow.js";

// Phần 1: add tất cả những event cho thẻ input, select, button,...
bindFilterEvent();
bindCURDEvents();
initSidebar();
bindPopupEvents();
// Phần 2: gọi hàm hiển thị danh sách nhân viên lưu trong LocalStorage
renderDanhSachNV();
















