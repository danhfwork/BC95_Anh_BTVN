import { el } from "./core.js";

// Toggle Sidebar
export const initSidebar = () => {
  if (!el.toggleBtn) return;
  el.toggleBtn.addEventListener("click", () => {
    el.sidebar.classList.toggle("w-64");
    el.sidebar.classList.toggle("w-20");
    el.sidebar.classList.toggle("collapsed");
    el.toggleIcon.classList.toggle("rotate-180");
  });
};

// LOGIC POPUP
// Ẩn/Hiện Form thêm nhân viên

export const modalPopup = () => {
  el.popupThemNhanVien.classList.remove("hidden");
  el.addNhanVien.classList.remove("hidden");
  el.capNhat.classList.add("hidden");
};

export const closeModal = () => {
  el.popupThemNhanVien.classList.add("hidden");
  el.formNhanVien.reset();
  el.taiKhoan.readOnly = false;
};

export const bindPopupEvents = () => {
  el.btnThemNhanVien.addEventListener("click", modalPopup);
  el.btnCloseThemNhanVien.addEventListener("click", closeModal);
  el.overlayNV.addEventListener("click", closeModal);
};

// Show Message
export const showMessage = (title, icon = "success", callback = null) => {
  if (callback) {
    Swal.fire({
      title: title,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  }
};
